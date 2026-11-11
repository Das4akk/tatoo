export interface PortfolioItem {
  id: string;
  title: string;
  style: 'fine-line' | 'botanical' | 'minimalism' | 'blackwork' | 'ornamental' | 'japanese' | 'abstract';
  styleName: string;
  artistId: string;
  artistName: string;
  placement: string;
  duration: string;
  imageUrl: string;
  description: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  bio: string;
  avatarUrl: string;
  styles: string[];
  signatureNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  approxDuration: string;
  includedFeatures: string[];
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Веточка дикой оливы',
    style: 'botanical',
    styleName: 'Ботаника',
    artistId: 'agnia',
    artistName: 'Агния Ветрова',
    placement: 'Внутренняя сторона предплечья',
    duration: '2.5 часа',
    imageUrl: '/images/tattoo_olive_forearm.jpg',
    description: 'Тончайшая анатомическая ботаника с микроштриховкой. Плавные изгибы повторяют движение мышц руки.',
  },
  {
    id: 'work-2',
    title: 'Архитектурный контур',
    style: 'fine-line',
    styleName: 'Fine Line',
    artistId: 'maya',
    artistName: 'Майя Смирнова',
    placement: 'Ключица',
    duration: '1.5 часа',
    imageUrl: '/images/tattoo_collarbone_line.jpg',
    description: 'Единая непрерывная линия толщиной 0.25 мм. Минимализм, вдохновленный скандинавской архитектурой.',
  },
  {
    id: 'work-3',
    title: 'Сакральная геометрия',
    style: 'ornamental',
    styleName: 'Орнаментал',
    artistId: 'mark',
    artistName: 'Марк Левин',
    placement: 'Плечо и дельта',
    duration: '4.5 часа',
    imageUrl: '/images/tattoo_mandala_shoulder.jpg',
    description: 'Точный точечный дотворк с переходом плотности. Безупречная симметрия и гармония с телом.',
  },
  {
    id: 'work-4',
    title: 'Лист гинкго билоба',
    style: 'botanical',
    styleName: 'Ботаника',
    artistId: 'agnia',
    artistName: 'Агния Ветрова',
    placement: 'Запястье',
    duration: '2 часа',
    imageUrl: '/images/tattoo_ginkgo_wrist.jpg',
    description: 'Символ стойкости и спокойствия. Мягкая воздушная растушевка серого пигмента.',
  },
  {
    id: 'work-5',
    title: 'Шелковая волна',
    style: 'japanese',
    styleName: 'Японские мотивы',
    artistId: 'daniel',
    artistName: 'Даниэль Ким',
    placement: 'Ребра',
    duration: '4 часа',
    imageUrl: '/images/tattoo_japanese_ribs.jpg',
    description: 'Современная интерпретация классической гравюры. Бархатный градиент и динамичные линии.',
  },
  {
    id: 'work-6',
    title: 'Микро-созвездие',
    style: 'minimalism',
    styleName: 'Минимализм',
    artistId: 'maya',
    artistName: 'Майя Смирнова',
    placement: 'Пальцы и кисть руки',
    duration: '1 час',
    imageUrl: '/images/tattoo_constellation_fingers.jpg',
    description: 'Невесомые микроточки и тончайшие контуры. Заживает как природная россыпь веснушек.',
  },
  {
    id: 'work-7',
    title: 'Гравюрный папоротник',
    style: 'botanical',
    styleName: 'Ботаника & Графика',
    artistId: 'agnia',
    artistName: 'Агния Ветрова',
    placement: 'Плечо и предплечье',
    duration: '3.5 часа',
    imageUrl: '/images/tattoo_fern_botanical.jpg',
    description: 'Глубокий графитовый тон, шелковистый штрих и четкие контуры природной флоры севера.',
  },
  {
    id: 'work-8',
    title: 'Каллиграфический жест',
    style: 'abstract',
    styleName: 'Абстракция',
    artistId: 'daniel',
    artistName: 'Даниэль Ким',
    placement: 'Линия позвоночника',
    duration: '3 часа',
    imageUrl: '/images/tattoo_calligraphy_spine.jpg',
    description: 'Свободное движение кисти суми-э, зафиксированное на коже с сохранением текстуры живого мазка.',
  },
];

export const ARTISTS: Artist[] = [
  {
    id: 'agnia',
    name: 'Агния Ветрова',
    role: 'Ведущий художник & Основательница',
    specialization: 'Fine Line & Авторская ботаника',
    experience: '8 лет практики',
    bio: 'Выпускница Академии Художеств. Специализируется на флористических мотивах, микролиниях и нежных анатомических композициях.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    styles: ['Fine Line', 'Ботаника', 'Микрореализм'],
    signatureNote: 'Татуировка должна дышать вместе с телом, а не доминировать над ним.',
  },
  {
    id: 'mark',
    name: 'Марк Левин',
    role: 'Резидент студии',
    specialization: 'Геометрия, Орнаментал & Дотворк',
    experience: '6 лет практики',
    bio: 'Архитектор по первому образованию. Проектирует орнаменты с учетом биомеханики суставов и естественных изгибов тела.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    styles: ['Орнаментал', 'Дотворк', 'Геометрия'],
    signatureNote: 'Математическая гармония и безупречная плотность каждой точки.',
  },
  {
    id: 'maya',
    name: 'Майя Смирнова',
    role: 'Резидент студии',
    specialization: 'Минимализм, Контуры & Типографика',
    experience: '5 лет практики',
    bio: 'Мастер лаконичных форм. Создает микротату, авторские шрифты и минималистичные символы с ювелирной точностью.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    styles: ['Минимализм', 'Каллиграфия', 'Микротату'],
    signatureNote: 'Сила простоты — в отсутствии лишнего и точности каждого миллиметра.',
  },
  {
    id: 'daniel',
    name: 'Даниэль Ким',
    role: 'Приглашенный мастер',
    specialization: 'Neo-Asian, Графика & Soft Blackwork',
    experience: '9 лет практики',
    bio: 'Смешивает традиции восточной гравюры и европейского книжного эстампа. Работает с мягким черным и шелковыми тенями.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    styles: ['Японские мотивы', 'Графика', 'Блэкворк'],
    signatureNote: 'Каждая линия — это продолжение дыхания мастера и ритма кожи.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fine-line',
    title: 'Миниатюра & Fine Line',
    description: 'Изящные микротатуировки, аккуратные символы, надписи и растительные элементы размером до 7 см.',
    startingPrice: 'от 8 000 ₽',
    approxDuration: '1.5 – 2.5 часа',
    includedFeatures: [
      'Персональная консультация',
      'Примерка нескольких размеров на коже',
      'Одноразовые иглы 0.20-0.25 мм',
      'Заживляющая пленка Dermalize Pro',
    ],
  },
  {
    id: 'botanical-art',
    title: 'Ботаническая иллюстрация',
    description: 'Цветы, травы, ветви деревьев и природные формы с прорисовкой тонких прожилок и воздушных теней.',
    startingPrice: 'от 14 000 ₽',
    approxDuration: '2.5 – 4.5 часа',
    includedFeatures: [
      'Индивидуальный эскиз по вашим референсам',
      'Анатомическая подгонка под изгиб тела',
      'Пигменты премиум-класса (США / Германия)',
      'Набор премиального ухода в подарок',
    ],
  },
  {
    id: 'custom-sketch',
    title: 'Авторский эскиз с нуля',
    description: 'Создание уникального художественного проекта под вашу концепцию. Никаких шаблонных картинок из сети.',
    startingPrice: 'от 6 000 ₽ (бесплатно при сеансе)',
    approxDuration: '3 – 5 дней работы',
    includedFeatures: [
      'Совместная арт-сессия с мастером',
      '3 концептуальных наброска на выбор',
      'До двух раундов правок до идеала',
      '3D-визуализация на фото вашей кожи',
    ],
  },
  {
    id: 'large-project',
    title: 'Крупные художественные проекты',
    description: 'Масштабные композиции на предплечье, бедро, ребра или спину. Работа по сеансам с пошаговым ведением.',
    startingPrice: 'от 28 000 ₽ / сеанс',
    approxDuration: 'от 2 сеансов (по 5-6 ч)',
    includedFeatures: [
      'Генеральный проект масштабного эскиза',
      'Индивидуальный график восстановления',
      'Чайная церемония и отдых в приватной зоне',
      'Полное послесеансовое сопровождение',
    ],
  },
  {
    id: 'consultation',
    title: 'Личная очная консультация',
    description: 'Знакомство со студией, оценка кожи, примерка эскизов на трансферной бумаге и ответы на все вопросы.',
    startingPrice: 'Бесплатно',
    approxDuration: '30 минут',
    includedFeatures: [
      'Оценка анатомических зон и родинок',
      'Тест на чувствительность кожи при необходимости',
      'Точный расчет стоимости и тайминга',
      'Без обязательства записи на сеанс',
    ],
  },
];

export interface AnatomyZone {
  id: string;
  name: string;
  latinName: string;
  painScore: number; // 1 to 5
  painLabel: 'Минимальная' | 'Умеренная' | 'Ощутимая' | 'Высокая' | 'Интенсивная';
  healingDays: string;
  bestStyles: string[];
  needleGauge: string;
  sunSensitivity: 'Низкая' | 'Средняя' | 'Высокая';
  advice: string;
  workPreviewId: string;
}

export const ANATOMY_ZONES: AnatomyZone[] = [
  {
    id: 'forearm',
    name: 'Внутреннее предплечье',
    latinName: 'Antebrachium Anterius',
    painScore: 2,
    painLabel: 'Умеренная',
    healingDays: '5–8 дней',
    bestStyles: ['Ботаника', 'Fine Line', 'Шрифты'],
    needleGauge: '0.20 – 0.25 мм',
    sunSensitivity: 'Средняя',
    advice: 'Идеальная стартовая зона: гладкая кожа, минимальная деформация при движении и комфортный сеанс.',
    workPreviewId: 'work-1',
  },
  {
    id: 'collarbone',
    name: 'Ключица и декольте',
    latinName: 'Regio Clavicularis',
    painScore: 3,
    painLabel: 'Ощутимая',
    healingDays: '6–9 дней',
    bestStyles: ['Архитектурный контур', 'Минимализм', 'Каллиграфия'],
    needleGauge: '0.25 мм (1RL Single Needle)',
    sunSensitivity: 'Высокая',
    advice: 'Вибрация ощущается на кости сильнее, однако благодаря тонким иглам сеанс проходит быстро и аккуратно.',
    workPreviewId: 'work-2',
  },
  {
    id: 'wrist',
    name: 'Запястье',
    latinName: 'Carpus & Articulatio',
    painScore: 3,
    painLabel: 'Ощутимая',
    healingDays: '7–10 дней',
    bestStyles: ['Ботаника', 'Миниатюра', 'Символика'],
    needleGauge: '0.20 мм (Bugpin Micro)',
    sunSensitivity: 'Средняя',
    advice: 'Зона сгиба требует аккуратного ухода в первые 72 часа, чтобы контур зажил тонкой нитью без утолщений.',
    workPreviewId: 'work-4',
  },
  {
    id: 'shoulder',
    name: 'Плечо и дельта',
    latinName: 'Regio Deltoidea',
    painScore: 1,
    painLabel: 'Минимальная',
    healingDays: '5–7 дней',
    bestStyles: ['Орнаментал', 'Сакральная геометрия', 'Дотворк'],
    needleGauge: '0.25 – 0.30 мм',
    sunSensitivity: 'Средняя',
    advice: 'Самая комфортная зона тела для первого опыта. Позволяет делать многочасовые детализированные проекты.',
    workPreviewId: 'work-3',
  },
  {
    id: 'ribs',
    name: 'Ребра и бок',
    latinName: 'Regio Costalis',
    painScore: 4,
    painLabel: 'Высокая',
    healingDays: '8–12 дней',
    bestStyles: ['Японские мотивы', 'Плавные волны', 'Ботаника'],
    needleGauge: '0.25 мм (Tight Liner)',
    sunSensitivity: 'Низкая',
    advice: 'Требует синхронного дыхания с мастером. В студии мы применяем мягкие охлаждающие компрессы и делаем перерывы.',
    workPreviewId: 'work-5',
  },
  {
    id: 'spine',
    name: 'Позвоночник',
    latinName: 'Columna Vertebralis',
    painScore: 4,
    painLabel: 'Высокая',
    healingDays: '7–11 дней',
    bestStyles: ['Вертикальная каллиграфия', 'Абстрактный жест', 'Орнамент'],
    needleGauge: '0.25 – 0.35 мм (Shading)',
    sunSensitivity: 'Низкая',
    advice: 'Создает невероятный кинематографичный силуэт спины. Мастер работает деликатно короткими тактами.',
    workPreviewId: 'work-8',
  },
];

