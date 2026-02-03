export type CategoryType = 'Architecture' | 'Interior' | 'General';

export interface StyleData {
  id: string;
  // --- 1. 基础信息 (Basic Info) ---
  nameCn: string; // 风格名称（中文）
  nameEn: string; // 风格名称（英文/原文）
  categoryType: CategoryType; // 风格分类：建筑专属 / 室内专属 / 通用
  categoryStyle: string; // 二级分类（例：复古系 / 极简系 / 自然系）
  definition: string; // 核心定义（一句话）
  tags: string[]; // 标签
  coverImage?: string; // 封面图 (Supplemented: Good for list view)

  // --- 2. 历史溯源 (Historical Context) ---
  originTime: string; // 起源时间
  originRegion: string; // 起源地区/国家
  historyContext: string; // 历史背景 / 诞生原因
  founders: string; // 核心奠基人 / 代表流派

  // --- 3. 设计核心 (Design Core) ---
  philosophy: string; // 核心设计理念
  features: string; // 核心特征
  designTaboos: string; // 风格设计禁忌

  // --- 4. 视觉与技术体系 (Visual & Technical) ---
  colors: string; // 色彩体系 (Could be JSON string or text description)
  materials: string; // 材质运用
  elements: string; // 核心装饰元素 / 纹样
  lighting: string; // 灯光设计原则

  // --- 5. 应用与扩展 (Application & Relations) ---
  application: string; // 应用方向
  derivatives: string; // 衍生风格
  similarDiff: string; // 相似风格区分
  mixMatch: string; // 适配混搭风格

  // --- 6. 资料与备注 (Resources & Meta) ---
  images: string[]; // 参考案例（图片 URL 列表）
  notes: string; // 补充说明
  
  // --- System Fields ---
  createdAt: number;
  updatedAt: number;
}

// Helper for Excel Import mapping
export const ExcelHeaderMapping: Record<string, keyof StyleData> = {
  '风格名称(中文)': 'nameCn',
  '风格名称(英文)': 'nameEn',
  '风格分类': 'categoryType',
  '二级分类': 'categoryStyle',
  '核心定义': 'definition',
  '起源时间': 'originTime',
  '起源地区': 'originRegion',
  '历史背景': 'historyContext',
  '核心奠基人': 'founders',
  '核心设计理念': 'philosophy',
  '核心特征': 'features',
  '色彩体系': 'colors',
  '材质运用': 'materials',
  '装饰元素': 'elements',
  '灯光设计': 'lighting',
  '应用方向': 'application',
  '衍生风格': 'derivatives',
  '相似风格': 'similarDiff',
  '混搭风格': 'mixMatch',
  '设计禁忌': 'designTaboos',
  '备注': 'notes',
  '标签': 'tags' // Needs special handling (comma separated)
};
