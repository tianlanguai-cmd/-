import { StyleData } from '../types/style';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'style_knowledge_base_data';

const sampleData: Omit<StyleData, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        nameCn: "现代简约",
        nameEn: "Modern Minimalism",
        categoryType: "General",
        categoryStyle: "极简系",
        definition: "Less is More，以少胜多，通过减少不必要的元素，展现空间本质。",
        tags: ["简约", "功能主义", "几何线条", "黑白灰"],
        coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        originTime: "20世纪初期",
        originRegion: "德国 (包豪斯)",
        historyContext: "工业革命后，反对过度装饰，强调功能和理性。",
        founders: "密斯·凡·德·罗 (Mies van der Rohe)",
        philosophy: "形式追随功能。",
        features: "去除多余装饰，强调空间感，线条利落，大面积留白。",
        designTaboos: "忌过度堆砌，忌色彩杂乱。",
        colors: "黑、白、灰、原木色，偶有高饱和度点缀。",
        materials: "玻璃、金属、混凝土、原木。",
        elements: "几何形体，直线。",
        lighting: "无主灯设计，隐藏式灯带，自然光引入。",
        application: "住宅，办公，展厅。",
        derivatives: "极简主义",
        similarDiff: "与北欧风相比，更冷峻、更强调工业材料。",
        mixMatch: "工业风，轻奢风。",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        notes: "适合现代都市生活，易于打理。"
    },
    {
        nameCn: "北欧风格",
        nameEn: "Scandinavian Style",
        categoryType: "Interior",
        categoryStyle: "自然系",
        definition: "注重功能、人性化和自然材料，营造温馨舒适的居住氛围。",
        tags: ["自然", "温馨", "原木", "Hygge"],
        coverImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        originTime: "20世纪30-50年代",
        originRegion: "北欧五国 (瑞典、丹麦、挪威、芬兰、冰岛)",
        historyContext: "高纬度地区冬季漫长，需要明亮温暖的室内环境。",
        founders: "阿尔瓦·阿尔托 (Alvar Aalto), 阿恩·雅各布森 (Arne Jacobsen)",
        philosophy: "以人为本，大众化的设计。",
        features: "明亮的色调，大量运用木材，注重采光，绿植点缀。",
        designTaboos: "忌厚重繁复的窗帘，忌暗沉色调。",
        colors: "大面积白色，浅灰色，淡木色，莫兰迪色系点缀。",
        materials: "原木 (桦木、松木)，棉麻，羊毛，陶瓷。",
        elements: "绿植，几何地毯，装饰画。",
        lighting: "暖色温灯光，多层次照明，设计感吊灯。",
        application: "住宅，咖啡馆。",
        derivatives: "日式北欧 (Japandi)",
        similarDiff: "比日式风格色彩更丰富，比现代简约更温馨。",
        mixMatch: "日式，现代简约。",
        images: [
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        notes: "IKEA 是北欧风格的典型代表。"
    },
    {
        nameCn: "工业风格",
        nameEn: "Industrial Style",
        categoryType: "General",
        categoryStyle: "复古系",
        definition: "裸露建筑结构和材料，展现粗犷、不加修饰的原始美感。",
        tags: ["粗犷", "复古", "砖墙", "水泥"],
        coverImage: "https://images.unsplash.com/photo-1505691723518-36a5ac385356?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        originTime: "20世纪90年代",
        originRegion: "美国纽约 (SOHO区)",
        historyContext: "艺术家将废弃工厂改造为居住和工作空间 (Loft)。",
        founders: "-",
        philosophy: "保留建筑的历史痕迹，通过新旧对比产生张力。",
        features: "裸露的管线，红砖墙，水泥地面，挑高空间，大开窗。",
        designTaboos: "忌过度精致，忌甜美风格。",
        colors: "黑、白、灰、红砖色、铁锈色。",
        materials: "金属，砖，混凝土，做旧木材，皮革。",
        elements: "齿轮，铁艺家具，复古灯具。",
        lighting: "爱迪生灯泡，工矿灯，轨道灯。",
        application: "办公室，餐厅，酒吧，Loft住宅。",
        derivatives: "蒸汽朋克",
        similarDiff: "比现代简约更粗犷，更有历史感。",
        mixMatch: "复古美式，现代简约。",
        images: [
            "https://images.unsplash.com/photo-1505691723518-36a5ac385356?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        notes: "适合个性化强烈的空间。"
    },
    {
        nameCn: "新中式",
        nameEn: "New Chinese Style",
        categoryType: "Interior",
        categoryStyle: "复古系",
        definition: "将中国传统元素与现代设计手法结合，体现东方美学精神。",
        tags: ["东方", "禅意", "雅致", "对称"],
        coverImage: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        originTime: "20世纪末21世纪初",
        originRegion: "中国",
        historyContext: "随着国力增强，对传统文化的自信回归，寻求符合现代生活的中式表达。",
        founders: "贝聿铭 (建筑领域影响)",
        philosophy: "天人合一，移步换景，留白意境。",
        features: "对称布局，格栅屏风，圈椅，泼墨山水，简化传统线条。",
        designTaboos: "忌堆砌传统符号，忌红木家具过度沉重。",
        colors: "黑、白、灰、原木色，中国红/靛蓝点缀。",
        materials: "木材 (胡桃木、榆木)，石材，丝绸，棉麻。",
        elements: "回纹，窗棂，盆景，水墨画。",
        lighting: "暖光，灯笼造型改良灯具，隐藏式照明。",
        application: "住宅，茶室，酒店，会所。",
        derivatives: "禅意中式",
        similarDiff: "比传统中式更轻盈、更符合人体工学。",
        mixMatch: "现代简约。",
        images: [
            "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1599690940375-843187c2c3bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        notes: "关键在于意境的营造，而非形式的模仿。"
    },
    {
        nameCn: "包豪斯",
        nameEn: "Bauhaus",
        categoryType: "Architecture",
        categoryStyle: "极简系",
        definition: "艺术与技术的统一，设计的目的是人而不是产品。",
        tags: ["理性", "几何", "工业化", "经典"],
        coverImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        originTime: "1919-1933",
        originRegion: "德国 (魏玛/德绍)",
        historyContext: "一战后重建，试图解决工业化生产与艺术设计的矛盾。",
        founders: "沃尔特·格罗皮乌斯 (Walter Gropius)",
        philosophy: "功能决定形式，忠实于材料。",
        features: "平屋顶，玻璃幕墙，非对称布局，钢管家具。",
        designTaboos: "忌无意义的装饰。",
        colors: "红、黄、蓝三原色，黑、白、灰。",
        materials: "钢筋混凝土，玻璃，钢管，皮革。",
        elements: "基本的几何形状 (圆、方、三角)。",
        lighting: "功能性照明，工业灯具。",
        application: "建筑，家具设计，平面设计。",
        derivatives: "国际主义风格",
        similarDiff: "现代主义的源头。",
        mixMatch: "现代简约。",
        images: [
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512352825655-5853dc202865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        notes: "对现代设计影响深远。"
    }
];

export const storageService = {
  getAll: (): StyleData[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        // Initialize with sample data if empty
        const initializedData = sampleData.map(item => ({
            ...item,
            id: uuidv4(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })) as StyleData[];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initializedData));
        return initializedData;
    }
    return JSON.parse(data);
  },

  getById: (id: string): StyleData | undefined => {
    const all = storageService.getAll();
    return all.find(item => item.id === id);
  },

  create: (data: Omit<StyleData, 'id' | 'createdAt' | 'updatedAt'>): StyleData => {
    const all = storageService.getAll();
    const newItem: StyleData = {
      ...data,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    all.unshift(newItem); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return newItem;
  },

  update: (id: string, data: Partial<StyleData>): StyleData | null => {
    const all = storageService.getAll();
    const index = all.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...all[index],
      ...data,
      updatedAt: Date.now(),
    };
    all[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return updatedItem;
  },

  delete: (id: string): void => {
    const all = storageService.getAll();
    const filtered = all.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  importBatch: (items: any[]): number => {
    const all = storageService.getAll();
    
    // Simple deduplication logic could be added here, but for now just append
    const newItems = items.map(item => ({
        ...item,
        id: uuidv4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(/[,，]/) : []),
        images: Array.isArray(item.images) ? item.images : [],
    } as StyleData));

    const merged = [...newItems, ...all];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return newItems.length;
  }
};
