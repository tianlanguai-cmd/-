import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Upload, message, Tag, Tooltip } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { StyleData, ExcelHeaderMapping, CategoryType } from '../types/style';
import { storageService } from '../services/storage';

const StyleList: React.FC = () => {
  const [data, setData] = useState<StyleData[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allData = storageService.getAll();
    setData(allData);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条风格数据吗？此操作不可恢复。',
      onOk: () => {
        storageService.delete(id);
        message.success('删除成功');
        loadData();
      },
    });
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const bstr = e.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws);

        // Map Excel columns to our data structure
        const mappedData = jsonData.map((row: any) => {
          const newRow: any = {};
          // Reverse mapping: Header Name -> Key
          Object.entries(ExcelHeaderMapping).forEach(([header, key]) => {
             if (row[header] !== undefined) {
                 newRow[key] = row[header];
             }
          });
          // Also check for direct key matches if user used English headers
          Object.keys(row).forEach(key => {
              if (!Object.values(ExcelHeaderMapping).includes(key as any) && !Object.keys(ExcelHeaderMapping).includes(key)) {
                  // If it matches a key in StyleData directly, keep it
                  newRow[key] = row[key];
              }
          });
          
          return newRow;
        });

        const count = storageService.importBatch(mappedData);
        message.success(`成功导入 ${count} 条数据`);
        loadData();
      } catch (error) {
        console.error(error);
        message.error('导入失败，请检查文件格式');
      }
    };
    reader.readAsBinaryString(file);
    return false; // Prevent upload
  };

  const filteredData = data.filter(item => 
    item.nameCn.includes(searchText) || 
    item.nameEn.toLowerCase().includes(searchText.toLowerCase()) ||
    item.categoryStyle.includes(searchText)
  );

  const columns: ColumnsType<StyleData> = [
    {
      title: '封面',
      key: 'coverImage',
      width: 80,
      render: (_, record) => (
         record.coverImage ? 
         <img src={record.coverImage} alt={record.nameCn} style={{ width: 50, height: 38, objectFit: 'cover', borderRadius: 4 }} /> 
         : <div style={{ width: 50, height: 38, background: '#f0f0f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#999' }}>无图</div>
      ),
    },
    {
      title: '风格名称',
      key: 'name',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.nameCn}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.nameEn}</div>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'categoryType',
      key: 'categoryType',
      width: 120,
      filters: [
        { text: '建筑专属', value: 'Architecture' },
        { text: '室内专属', value: 'Interior' },
        { text: '通用', value: 'General' },
      ],
      onFilter: (value, record) => record.categoryType === value,
      render: (type: CategoryType) => {
        const colors = {
          'Architecture': 'blue',
          'Interior': 'green',
          'General': 'orange'
        };
        const labels = {
          'Architecture': '建筑',
          'Interior': '室内',
          'General': '通用'
        };
        return <Tag color={colors[type]}>{labels[type] || type}</Tag>;
      }
    },
    {
      title: '二级分类',
      dataIndex: 'categoryStyle',
      key: 'categoryStyle',
      width: 120,
    },
    {
      title: '核心定义',
      dataIndex: 'definition',
      key: 'definition',
      ellipsis: {
        showTitle: false,
      },
      render: (definition) => (
        <Tooltip placement="topLeft" title={definition}>
          {definition}
        </Tooltip>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {Array.isArray(tags) && tags.slice(0, 3).map(tag => (
            <Tag key={tag} bordered={false}>{tag}</Tag>
          ))}
          {Array.isArray(tags) && tags.length > 3 && <span style={{ fontSize: 12 }}>+{tags.length - 3}</span>}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => navigate(`/styles/${record.id}`)}
          >
            查看
          </Button>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/styles/${record.id}/edit`)}
          >
            编辑
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/styles/new')}>
            新建风格
          </Button>
          <Upload 
            beforeUpload={handleImport} 
            showUploadList={false} 
            accept=".xlsx, .xls"
          >
            <Button icon={<UploadOutlined />}>Excel 导入</Button>
          </Upload>
        </Space>
        <Input 
          placeholder="搜索风格名称/分类..." 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default StyleList;
