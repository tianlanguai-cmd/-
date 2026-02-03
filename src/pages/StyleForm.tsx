import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space, message, Collapse, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { storageService } from '../services/storage';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const StyleForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const data = storageService.getById(id);
      if (data) {
        // Transform images array to string for TextArea
        const formData = {
            ...data,
            images: Array.isArray(data.images) ? data.images.join('\n') : data.images
        };
        form.setFieldsValue(formData);
      } else {
        message.error('未找到数据');
        navigate('/styles');
      }
    }
  }, [id, form, navigate]);

  const onFinish = (values: any) => {
    setLoading(true);
    try {
      // Process images string back to array
      const imagesList = values.images ? values.images.split('\n').filter((url: string) => url.trim() !== '') : [];
      
      const processedValues = {
        ...values,
        images: imagesList,
      };

      if (id) {
        storageService.update(id, processedValues);
        message.success('更新成功');
      } else {
        storageService.create(processedValues);
        message.success('创建成功');
      }
      navigate('/styles');
    } catch (error) {
      console.error(error);
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
        <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/styles')} 
            style={{ marginRight: 16 }}
        >
            返回
        </Button>
        <h2 style={{ margin: 0 }}>{id ? '编辑风格' : '新建风格'}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ categoryType: 'General' }}
      >
        <Collapse defaultActiveKey={['1', '2', '3']} size="small">
          <Panel header="1. 基础信息 (Basic Info)" key="1">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="nameCn" label="风格名称（中文）" rules={[{ required: true }]}>
                  <Input placeholder="例如：现代简约" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="nameEn" label="风格名称（英文/原文）">
                  <Input placeholder="e.g. Modern Simplicity" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="categoryType" label="风格分类" rules={[{ required: true }]}>
                  <Select>
                    <Option value="Architecture">建筑专属</Option>
                    <Option value="Interior">室内专属</Option>
                    <Option value="General">建筑+室内通用</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="categoryStyle" label="二级分类">
                  <Input placeholder="例：复古系 / 极简系 / 自然系" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="coverImage" label="封面图 (图片链接)">
                  <Input placeholder="输入封面图片 URL，用于列表展示" />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name="tags" label="标签">
                  <Select mode="tags" placeholder="输入标签后回车" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="definition" label="核心定义（一句话）" rules={[{ required: true }]}>
                  <TextArea rows={2} showCount maxLength={200} />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="2. 历史溯源 (Historical Context)" key="2">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="originTime" label="起源时间">
                  <Input placeholder="例：19世纪末" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="originRegion" label="起源地区/国家">
                  <Input placeholder="例：德国" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="founders" label="核心奠基人 / 代表流派">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="historyContext" label="历史背景 / 诞生原因">
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="3. 设计核心 (Design Core)" key="3">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="philosophy" label="核心设计理念">
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="features" label="核心特征">
                  <TextArea rows={3} placeholder="列出主要特征..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="colors" label="色彩体系">
                  <TextArea rows={3} placeholder="描述常用配色..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="materials" label="材质运用">
                  <TextArea rows={3} placeholder="常用材质..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="elements" label="核心装饰元素 / 纹样">
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lighting" label="灯光设计原则">
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="designTaboos" label="风格设计禁忌">
                  <TextArea rows={2} style={{ borderColor: '#ffccc7' }} />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="4. 应用与关联 (Application & Relations)" key="4">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="application" label="应用方向">
                  <Input placeholder="例：住宅、博物馆、办公空间" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="derivatives" label="衍生风格">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="similarDiff" label="相似风格区分">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="mixMatch" label="适配混搭风格">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="5. 资料与备注 (Resources)" key="5">
             <Form.Item name="notes" label="补充说明">
               <TextArea rows={3} />
             </Form.Item>
             
             {/* Simple URL list for now, as we don't have a backend upload server */}
             <Form.Item name="images" label="图片链接 (每行一个)">
                <TextArea rows={4} placeholder="http://example.com/image1.jpg&#10;http://example.com/image2.jpg" />
             </Form.Item>
             <div style={{ color: '#999', fontSize: '12px', marginBottom: 16 }}>
                注：由于没有后端服务器，请直接粘贴外部图片链接。如需上传，需要配置云存储服务。
             </div>
          </Panel>
        </Collapse>

        <Form.Item style={{ marginTop: 24, textAlign: 'center' }}>
          <Space size="large">
            <Button onClick={() => navigate('/styles')}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              提交保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StyleForm;
