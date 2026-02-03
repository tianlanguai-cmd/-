import React, { useEffect, useState } from 'react';
import { Descriptions, Tag, Button, Image, Space, Divider, Typography, Card, Empty, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { StyleData, CategoryType } from '../types/style';
import { storageService } from '../services/storage';

const { Title, Paragraph, Text } = Typography;

const StyleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<StyleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const result = storageService.getById(id);
      setData(result || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <Spin style={{ margin: '50px auto', display: 'block' }} />;
  if (!data) return <Empty description="未找到风格数据" style={{ marginTop: 100 }} />;

  const getCategoryColor = (type: CategoryType) => {
    const colors = {
      'Architecture': 'blue',
      'Interior': 'green',
      'General': 'orange'
    };
    return colors[type] || 'default';
  };

  const getCategoryLabel = (type: CategoryType) => {
    const labels = {
      'Architecture': '建筑专属',
      'Interior': '室内专属',
      'General': '建筑+室内通用'
    };
    return labels[type] || type;
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space align="center">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/styles')}>
            返回列表
          </Button>
          <Title level={2} style={{ margin: 0 }}>{data.nameCn}</Title>
          {data.nameEn && <Text type="secondary" style={{ fontSize: '18px' }}>({data.nameEn})</Text>}
        </Space>
        <Button 
          type="primary" 
          icon={<EditOutlined />} 
          onClick={() => navigate(`/styles/${data.id}/edit`)}
        >
          编辑风格
        </Button>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* 1. 基础概览 */}
        <Card title="基础概览" bordered={false}>
          <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label="风格分类">
              <Tag color={getCategoryColor(data.categoryType)}>
                {getCategoryLabel(data.categoryType)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="二级分类">{data.categoryStyle || '-'}</Descriptions.Item>
            <Descriptions.Item label="核心定义" span={2}>
              <Paragraph style={{ marginBottom: 0 }}>{data.definition}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="标签" span={2}>
              {data.tags && data.tags.length > 0 ? (
                data.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
              ) : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 2. 历史溯源 */}
        <Card title="历史溯源" bordered={false}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="起源时间">{data.originTime || '-'}</Descriptions.Item>
            <Descriptions.Item label="起源地区/国家">{data.originRegion || '-'}</Descriptions.Item>
            <Descriptions.Item label="核心奠基人/流派" span={2}>{data.founders || '-'}</Descriptions.Item>
            <Descriptions.Item label="历史背景/诞生原因" span={2}>
              {data.historyContext || '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 3. 设计核心 */}
        <Card title="设计核心体系" bordered={false}>
          <Descriptions bordered column={1} labelStyle={{ width: '180px' }}>
            <Descriptions.Item label="核心设计理念">
              <Paragraph>{data.philosophy || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="核心特征">
              <Paragraph>{data.features || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="色彩体系">
              <Paragraph>{data.colors || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="材质运用">
              <Paragraph>{data.materials || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="核心装饰元素/纹样">
              <Paragraph>{data.elements || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="灯光设计原则">
              <Paragraph>{data.lighting || '-'}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="设计禁忌" contentStyle={{ color: '#cf1322' }}>
              {data.designTaboos || '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 4. 应用与关联 */}
        <Card title="应用与关联" bordered={false}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="应用方向" span={2}>{data.application || '-'}</Descriptions.Item>
            <Descriptions.Item label="衍生风格">{data.derivatives || '-'}</Descriptions.Item>
            <Descriptions.Item label="相似风格区分">{data.similarDiff || '-'}</Descriptions.Item>
            <Descriptions.Item label="适配混搭风格" span={2}>{data.mixMatch || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 5. 参考案例 */}
        <Card title="参考案例与资料" bordered={false}>
            {data.images && data.images.length > 0 ? (
                <Image.PreviewGroup>
                    <Space size="middle" wrap>
                        {data.images.map((img, index) => (
                            <Image
                                key={index}
                                width={200}
                                height={150}
                                src={img}
                                fallback="https://via.placeholder.com/200x150?text=Image+Error"
                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                            />
                        ))}
                    </Space>
                </Image.PreviewGroup>
            ) : (
                <Text type="secondary">暂无参考图片</Text>
            )}
            <Divider dashed />
            <Descriptions title="补充说明" layout="vertical">
                 <Descriptions.Item>
                    {data.notes || '无'}
                 </Descriptions.Item>
            </Descriptions>
        </Card>

      </Space>
    </div>
  );
};

export default StyleDetail;
