import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, Zap, ChevronRight, ChevronLeft, ChevronDown, Phone, 
  Mail, MapPin, Printer, Menu, X, ArrowUpRight,
  Cpu, Layers, HardHat, ExternalLink, Plus, Check, Bus, Train, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: number;
  client: string;
  title: string;
  category: string;
  categoryName: string;
  scope: string;
  location: string;
  area: string;
  image: string;
}

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  content: string;
  isNotice: boolean; // 메인화면 공지사항 등록 여부
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true); // 프로젝트 4초 자동 전환
  
  // 소식 작성 모달 및 신규 글 상태
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);
  const [newNewsPost, setNewNewsPost] = useState({
    title: '',
    category: '수주 소식',
    content: '',
    isNotice: true // 기본값: 공지사항 체크
  });

  // 스크롤 감지 및 현재 활성 섹션 트래킹
  useEffect(() => {
    const sectionIds = ['home', 'industrial', 'architecture', 'technology', 'news', 'location'];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const scrollPos = window.scrollY + window.innerHeight / 2.5;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 산업플랜트 프로젝트 데이터 (전체, GMP, HACCP, R&D, BIO MEDICAL)
  const industrialProjects: Project[] = [
    {
      id: 1,
      client: "(주)삼양바이오팜",
      title: "유전자치료제 생산공장 신축공사",
      category: "gmp",
      categoryName: "GMP 무균제조시설",
      scope: "주사제(Isolator type) 무균 제조시설",
      location: "대전 대덕연구특구",
      area: "연면적 6,850㎡",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 2,
      client: "(주)유영제약",
      title: "진천 GMP공장 증축 및 리모델링",
      category: "gmp",
      categoryName: "GMP 생산시설",
      scope: "원료의약품 및 완제 생산동",
      location: "충북 진천군",
      area: "연면적 9,420㎡",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 3,
      client: "(주)동원F&B",
      title: "HACCP 규격 위생 제조시설 구축",
      category: "haccp",
      categoryName: "HACCP 식품설비",
      scope: "교차오염 방지 위생 동선 및 에어샤워실",
      location: "충남 아산시",
      area: "연면적 5,800㎡",
      image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 4,
      client: "(주)바이넥스",
      title: "오송공장 5K LINE 확장공사",
      category: "bio",
      categoryName: "BIO MEDICAL",
      scope: "바이오의약품 배양 및 정제시설",
      location: "충북 오송",
      area: "연면적 5,160㎡",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 5,
      client: "(주)옵투스제약",
      title: "오송2공장 신축 토목·건축공사",
      category: "gmp",
      categoryName: "GMP 특화공장",
      scope: "무균 점안제 전용 생산라인",
      location: "충북 청주시 오송읍",
      area: "연면적 11,200㎡",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 6,
      client: "(사)한국동물약품협회",
      title: "기업연구원 구축공사",
      category: "rnd",
      categoryName: "R&D 연구소",
      scope: "정밀 시험분석실 및 LAB 인프라",
      location: "충북 오송생명과학단지",
      area: "연면적 4,200㎡",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1400&q=80"
    }
  ];

  // 건축 프로젝트 데이터 (전체, 업무시설, 판매/문화집회시설, 기타 건축물)
  const architectureProjects: Project[] = [
    {
      id: 101,
      client: "(주)유진글로벌",
      title: "하남미사 프리미엄 사옥 신축공사",
      category: "office",
      categoryName: "업무시설",
      scope: "프리미엄 업무 및 근린생활시설",
      location: "경기도 하남미사",
      area: "연면적 7,950㎡",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 102,
      client: "판교 알파돔시티",
      title: "테크노밸리 복합업무동 시공",
      category: "office",
      categoryName: "업무시설",
      scope: "스마트 오피스 및 지하 커뮤니티",
      location: "경기도 성남시 판교",
      area: "연면적 14,200㎡",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 103,
      client: "송도컨벤시아 개발",
      title: "판매 및 문화집회시설 신축",
      category: "culture",
      categoryName: "판매/문화집회시설",
      scope: "대형 컨벤션 홀 및 상업 문화공간",
      location: "인천 연수구 송도동",
      area: "연면적 18,500㎡",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 104,
      client: "기흥 상업복합개발",
      title: "프리미엄 쇼핑 및 문화시설",
      category: "culture",
      categoryName: "판매/문화집회시설",
      scope: "근린생활 및 문화복합 상업시설",
      location: "경기도 용인시 기흥구",
      area: "연면적 12,100㎡",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 105,
      client: "여주 물류인프라개발",
      title: "첨단 하이브리드 물류센터",
      category: "etc",
      categoryName: "기타 건축물",
      scope: "자동화 물류 보관 및 하역동",
      location: "경기도 여주시",
      area: "연면적 22,000㎡",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
    }
  ];

  const [activeIndustrialTab, setActiveIndustrialTab] = useState('all');
  const [activeArchTab, setActiveArchTab] = useState('all');
  const [activeProjectTab, setActiveProjectTab] = useState<'industrial' | 'architecture'>('industrial');

  const filteredIndustrial = activeIndustrialTab === 'all'
    ? industrialProjects
    : industrialProjects.filter(p => p.category === activeIndustrialTab);

  const filteredArch = activeArchTab === 'all'
    ? architectureProjects
    : architectureProjects.filter(p => p.category === activeArchTab);

  // 회사 소식 데이터 (state 관리)
  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: 1,
      category: "수주 소식",
      title: "(주)삼양바이오팜 유전자치료제 신축공사 프로젝트 수주",
      date: "2026.05.18",
      content: "아이솔레이터(Isolator) 방식의 첨단 유전자치료제 주사제 생산라인 구축 공사의 시공사로 티엔이엔씨가 선정되었습니다. 최고의 기술력으로 적기 준공하겠습니다.",
      isNotice: true
    },
    {
      id: 2,
      category: "기업 신용",
      title: "나이스 기업신용평가 BBB0 등급 및 무차입 경영 유지",
      date: "2026.03.10",
      content: "차입금 의존도 0%의 탄탄한 재무구조와 100% 현금결제 원칙을 통해 기업신용평가 BBB0 등급을 달성하였습니다.",
      isNotice: true
    },
    {
      id: 3,
      category: "안전 경영",
      title: "건설안전보건평가 SA2 등급 획득 및 중대재해 Zero",
      date: "2026.01.20",
      content: "건설업계 상위 2.4% 수준의 안전보건평가 SA2 등급을 공인받았으며, 설립 이래 무사고 현장을 이어가고 있습니다.",
      isNotice: true
    },
    {
      id: 4,
      category: "기술 동향",
      title: "스마트 건설 3D BIM 시공 간섭 분석 가이드북 사내 배포",
      date: "2025.12.10",
      content: "플랜트 현장의 무결점 시공을 위한 3D BIM 간섭 검토 실무 가이드북을 발간하여 전 현장에 적용 중입니다.",
      isNotice: false
    }
  ]);

  // 메인화면에는 공지사항(isNotice === true)으로 체크된 글만 위에서부터 아래로 노출
  const displayedNews = showAllNews 
    ? newsList 
    : newsList.filter(item => item.isNotice);

  // 게시글 작성 처리 (위에서부터 아래로 배치: 최신글을 배열 맨 앞 index 0에 추가)
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsPost.title.trim() || !newNewsPost.content.trim()) {
      return;
    }

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newArticle: NewsItem = {
      id: Date.now(),
      category: newNewsPost.category,
      title: newNewsPost.title.trim(),
      date: dateStr,
      content: newNewsPost.content.trim(),
      isNotice: newNewsPost.isNotice
    };

    // 최신 업로드 글을 맨 위(index 0)에 배치하여 위에서부터 아래로 나열
    setNewsList([newArticle, ...newsList]);
    setNewNewsPost({
      title: '',
      category: '수주 소식',
      content: '',
      isNotice: true
    });
    setWriteModalOpen(false);
  };

  // 섹션 정보 목록 (우측 고정 내비게이션용)
  const sectionIds = ['home', 'project', 'technology', 'news', 'location'];
  const sectionNav = [
    { id: 'home', label: 'HOME', num: '01' },
    { id: 'project', label: 'PROJECT', num: '02' },
    { id: 'technology', label: 'TECH', num: '03' },
    { id: 'news', label: 'NEWS', num: '04' },
    { id: 'location', label: 'LOCATION', num: '05' },
  ];

  return (
    <div className="bg-[#1f242d] text-slate-100 font-sans selection:bg-[#e30613] selection:text-white relative">
      
      {/* ================================================================
          1. HEADER (품격 있고 편안한 다크 슬레이트 글래스모피즘 헤더)
      ================================================================ */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1f242d]/95 backdrop-blur-md py-3.5 border-b border-white/15 shadow-lg shadow-black/20' 
          : 'bg-[#1f242d]/80 backdrop-blur-sm py-4 border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo (다크 슬레이트 배경에서 가장 선명하게 돋보이는 TN E&C 공식 화이트텍스트 로고) */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center group">
            <div className="h-[25px] sm:h-[29px] w-[100px] sm:w-[118px] overflow-hidden flex items-start">
              <img 
                src="/assets/aistudio/________AI___text_ddfc456b.png" 
                alt="티엔이엔씨(주) TN E&C" 
                className="w-full h-auto object-cover object-top transition-opacity duration-300"
              />
            </div>
          </a>

          {/* Menu Items */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: 'home', label: 'HOME' },
              { id: 'project', label: 'PROJECT' },
              { id: 'technology', label: 'TECHNOLOGY' },
              { id: 'news', label: 'NEWS' },
              { id: 'location', label: 'LOCATION' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-semibold tracking-wider transition-colors relative py-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#e30613] font-bold' 
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGnb"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e30613]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setInquiryOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-red-950/30"
            >
              문의하기
            </button>
          </div>

          {/* Mobile Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 transition-colors text-slate-200 hover:text-white"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2a303c] border-b border-white/15 px-6 py-6 flex flex-col gap-3 shadow-2xl">
            {[
              { id: 'home', label: 'HOME' },
              { id: 'project', label: 'PROJECT' },
              { id: 'technology', label: 'TECHNOLOGY' },
              { id: 'news', label: 'NEWS' },
              { id: 'location', label: 'LOCATION' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection(item.id);
                  }} 
                  className={`text-left text-sm font-semibold py-1.5 transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#e30613] font-bold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />}
                </button>
              );
            })}
            <button 
              onClick={() => { setMobileMenuOpen(false); setInquiryOpen(true); }}
              className="mt-3 py-2.5 rounded-lg bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold text-center transition-colors"
            >
              프로젝트 문의하기
            </button>
          </div>
        )}
      </header>

      {/* ================================================================
          우측 고정 플로팅 섹션 인디케이터 (01 ~ 05)
      ================================================================ */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5 items-end">
        {sectionNav.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="group flex items-center gap-3 py-1 cursor-pointer"
            >
              <span className={`text-[10px] font-mono tracking-wider transition-all ${
                isActive ? 'text-white opacity-100 font-bold' : 'text-slate-400 opacity-0 group-hover:opacity-100'
              }`}>
                {s.num} {s.label}
              </span>
              <div className={`transition-all duration-300 rounded-full ${
                isActive 
                  ? 'w-7 h-2 bg-[#e30613] rounded-full' 
                  : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-400'
              }`} />
            </button>
          );
        })}
      </div>

      {/* ================================================================
          1. MAIN / HERO (눈이 편안하고 웅장한 다크 슬레이트 톤)
      ================================================================ */}
      <section 
        id="home" 
        className="snap-section flex flex-col justify-center items-center relative overflow-hidden pt-20 pb-16 bg-[#212630]"
      >
        {/* 현대적 건축/건물 배경 이미지 및 편안한 다크 슬레이트 오버레이 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-100 transition-all duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212630]/90 via-[#212630]/75 to-[#212630]/95 z-10" />

        {/* 올라오는 액션 느낌이 부각된 컨텐츠 래퍼 */}
        <motion.div 
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col justify-center items-center"
        >
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-slate-200 mb-6 font-mono tracking-wider shadow-sm">
            GENERAL CONTRACTOR & PLANT ENGINEERING
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] mb-6">
            기술과 신뢰로 세우는<br />
            무결점 플랜트 <span className="text-[#e30613]">TN E&C</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
            티엔이엔씨(주)는 cGMP / EU-GMP 규격의 무균 제조시설부터 R&D 연구소, 
            3D BIM 가상 시공까지 완벽한 기술력과 무차입 안전경영으로 최적의 가치를 짓습니다.
          </p>

          <div className="flex justify-center gap-3">
            <button 
              onClick={() => scrollToSection('project')}
              className="px-6 py-3 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/40"
            >
              주요 프로젝트 보기 <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('technology')}
              className="px-6 py-3 rounded-lg bg-white/15 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider transition-colors cursor-pointer"
            >
              특화 기술 안내
            </button>
          </div>

          {/* 깔끔한 4대 핵심 지표 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/15 text-center w-full max-w-3xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">BBB0</div>
              <div className="text-xs text-slate-300 font-medium mt-1">나이스 기업신용평가</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">0%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">차입금 의존도 (무차입)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#ff4d58] font-mono">SA2</div>
              <div className="text-xs text-slate-300 font-medium mt-1">건설안전보건평가 최우수</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">ZERO</div>
              <div className="text-xs text-slate-300 font-medium mt-1">설립 이래 중대사고 0건</div>
            </div>
          </div>
        </motion.div>

        {/* 다음 섹션 이동 스크롤 버튼 */}
        <button
          onClick={() => scrollToSection('project')}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-75 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown className="w-4 h-4 text-[#e30613]" />
          </motion.div>
        </button>
      </section>

      {/* ================================================================
          2. PROJECT (산업플랜트 & 건축 갤러리 통합 섹션)
      ================================================================ */}
      <section 
        id="project" 
        className="snap-section flex flex-col justify-center relative overflow-hidden bg-[#181d26] border-t border-white/15 py-24 px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto w-full"
        >
          {/* Top Header & Main Sub-Page Switcher (산업플랜트 / 건축) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-white/15 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-[#e30613] tracking-widest uppercase">
                  PORTFOLIO 02
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-mono text-slate-300">주요 시공실적</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                프로젝트 갤러리
              </h2>
            </div>

            {/* Main Sub-Page Switcher: 산업플랜트 vs 건축 */}
            <div className="flex items-center gap-2 bg-[#212630] p-1.5 rounded-xl border border-white/15">
              <button
                onClick={() => setActiveProjectTab('industrial')}
                className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeProjectTab === 'industrial' 
                    ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                산업플랜트 갤러리
              </button>
              <button
                onClick={() => setActiveProjectTab('architecture')}
                className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeProjectTab === 'architecture' 
                    ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                건축 갤러리
              </button>
            </div>
          </div>

          {/* Sub-Category Filter Tabs & Grid based on activeProjectTab */}
          {activeProjectTab === 'industrial' ? (
            <div>
              {/* Industrial Plant Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#212630]/60 p-2 rounded-xl border border-white/10">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'gmp', label: 'GMP' },
                  { id: 'haccp', label: 'HACCP' },
                  { id: 'rnd', label: 'R&D' },
                  { id: 'bio', label: 'BIO MEDICAL' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveIndustrialTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeIndustrialTab === tab.id 
                        ? 'bg-white text-slate-950 shadow-md' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Industrial Plant Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIndustrial.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="group bg-[#212630] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#e30613]/50 transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 bg-[#e30613] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {p.categoryName}
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-slate-300 font-medium">
                        {p.client}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#ff4d58] transition-colors mb-2">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                          {p.scope}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#e30613]" /> {p.location}
                        </span>
                        <span className="font-mono text-slate-300 font-semibold">{p.area}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Architecture Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#212630]/60 p-2 rounded-xl border border-white/10">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'office', label: '업무시설' },
                  { id: 'culture', label: '판매/문화집회시설' },
                  { id: 'etc', label: '기타 건축물' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveArchTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeArchTab === tab.id 
                        ? 'bg-white text-slate-950 shadow-md' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Architecture Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArch.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="group bg-[#212630] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#e30613]/50 transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 bg-[#e30613] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {p.categoryName}
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-slate-300 font-medium">
                        {p.client}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#ff4d58] transition-colors mb-2">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                          {p.scope}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#e30613]" /> {p.location}
                        </span>
                        <span className="font-mono text-slate-300 font-semibold">{p.area}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ================================================================
          3. TECHNOLOGY (세로 5분할 화면 꽉 채움 + 올라오는 모션)
      ================================================================ */}
      <section 
        id="technology" 
        className="snap-section flex flex-col justify-center relative overflow-hidden bg-[#202530] border-t border-white/10"
      >
        {/* 건축 엔지니어링 배경 텍스처 이미지 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 grayscale pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80')` }}
        />

        {/* 올라오는 액션 느낌이 부각된 컨텐츠 래퍼 */}
        <motion.div 
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex flex-col justify-center relative z-10"
        >
          {/* 전체 섹션을 세로·가로로 빈틈없이 꽉 채우는 5분할 아코디언 (마우스 호버 시 확장/축소) */}
          <div 
            className="w-full h-full min-h-[600px] lg:h-screen flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 transition-all duration-500 overflow-hidden"
            onMouseLeave={() => setHoveredTech(null)}
          >
            {[
              {
                id: 'gmp',
                title: 'GMP',
                sub: '무균 제조시설 및 공조 차압 제어',
                detail: 'Class 100~10,000 청정도 실현 및 차압 밸런싱 모니터링',
                icon: ShieldCheck,
                image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
                tag: 'GMP 무균 클린룸',
              },
              {
                id: 'haccp',
                title: 'HACCP',
                sub: '교차오염 방지 위생 동선 설계',
                detail: '위생 전실 및 에어샤워 분리 동선 · 위해요소 사전 차단',
                icon: Layers,
                image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80',
                tag: 'HACCP 식품위생설비',
              },
              {
                id: 'bio',
                title: 'BIO',
                sub: '세포·유전자치료제 클린룸',
                detail: '아이솔레이터 무균 충전 라인 · BSL-2/3 생물안전밀폐시설',
                icon: Zap,
                image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
                tag: 'BIO 생물안전밀폐',
              },
              {
                id: 'rnd',
                title: 'R&D',
                sub: '정밀 시험분석 및 안전 국소배기',
                detail: '항온항습 챔버 인프라 구축 · 유해가스 안전 스크러버 배기',
                icon: Cpu,
                image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
                tag: 'R&D 첨단연구소',
              },
              {
                id: 'bim',
                title: '3D BIM',
                sub: '사전 간섭 검증 및 가상시공',
                detail: '공종별 간섭 사전 100% 시뮬레이션 · 시공 오차 원천 예방',
                icon: HardHat,
                image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
                tag: '3D BIM 가상시공',
              },
            ].map((item) => {
              const isHovered = hoveredTech === item.id;
              const isAnyHovered = hoveredTech !== null;
              const isContracted = isAnyHovered && !isHovered;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredTech(item.id)}
                  onClick={() => setHoveredTech(isHovered ? null : item.id)}
                  className={`group relative flex flex-col items-center justify-center text-center p-6 lg:p-8 h-full cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isHovered
                      ? 'md:flex-[2.5] bg-black/20 shadow-2xl z-20 ring-1 ring-white/30'
                      : isContracted
                        ? 'md:flex-[0.62] bg-black/50 opacity-80 z-10'
                        : 'md:flex-1 bg-black/30 hover:bg-black/10 z-10'
                  }`}
                >
                  {/* 각 주제별 고해상도 배경 사진 (높은 가시성 및 줌 모션) */}
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none ${
                      isHovered 
                        ? 'opacity-85 scale-105' 
                        : isContracted 
                          ? 'opacity-35 scale-100' 
                          : 'opacity-65 scale-100 group-hover:opacity-80'
                    }`}
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  {/* 사진이 시원하게 보이도록 투명도를 높인 부드러운 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 z-0 pointer-events-none transition-opacity duration-500" />

                  {/* 중앙 정렬 컨텐츠 (타이틀 -> 부가설명) */}
                  <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">

                    {/* 메인 타이틀 (GMP, HACCP, BIO, R&D, 3D BIM) - 사진 위 선명한 가독성 확보 */}
                    <h3 
                      className={`font-semibold tracking-tight transition-all duration-500 font-sans mb-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ${
                        isHovered 
                          ? 'text-4xl lg:text-5xl xl:text-6xl font-bold' 
                          : isContracted
                            ? 'text-2xl lg:text-3xl text-slate-200'
                            : 'text-3xl lg:text-4xl xl:text-5xl'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* 부가설명 */}
                    <p 
                      className={`transition-all duration-500 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${
                        isHovered
                          ? 'text-sm sm:text-base text-slate-100 font-medium max-w-[320px] mt-1'
                          : isContracted
                            ? 'text-xs text-slate-300 line-clamp-2 max-w-[120px]'
                            : 'text-xs sm:text-sm text-slate-200 font-medium max-w-[200px]'
                      }`}
                    >
                      {item.sub}
                    </p>

                    {/* 펼쳐질 때 나타나는 기술 상세 엔지니어링 역량 배지 */}
                    {isHovered && (
                      <div className="mt-6 pt-4 border-t border-white/20 hidden md:flex flex-col items-center gap-2 max-w-[340px] animate-fadeIn backdrop-blur-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e30613]/90 text-white shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> 전문 엔지니어링 역량
                        </span>
                        <p className="text-xs lg:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-md">
                          {item.detail}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 하단 인터랙션 포인트 라인 (펼쳐지면 붉은색 풀라인 강조) */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full transition-all duration-500 z-10 ${
                      isHovered ? 'h-[5px] bg-[#e30613]' : 'h-[3px] bg-transparent group-hover:bg-[#e30613]/50'
                    }`} 
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 다음 섹션 이동 스크롤 버튼 */}
        <button
          onClick={() => scrollToSection('news')}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown className="w-4 h-4 text-[#e30613]" />
          </motion.div>
        </button>
      </section>

      {/* ================================================================
          4. 회사 소식 (NEWS - 밝고 정돈된 리스트)
      ================================================================ */}
      <section 
        id="news" 
        className="snap-section flex flex-col justify-center relative overflow-hidden bg-[#1f242d] border-t border-white/10 pt-20 pb-16"
      >
        {/* 기업 사옥/건축 배경 이미지 및 딥 슬레이트 오버레이 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f242d]/95 via-[#1f242d]/90 to-[#1f242d]/95 z-10" />

        {/* 올라오는 액션 느낌이 부각된 컨텐츠 래퍼 */}
        <motion.div 
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-6 w-full flex flex-col justify-center relative z-20"
        >
          {/* 헤더: 타이틀 & 소식 작성 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-[#e30613] text-xs font-bold font-mono tracking-wider uppercase">NEWS & NOTICE</span>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white">회사 소식</h2>
                <span className="text-xs text-slate-400 font-mono">
                  {showAllNews ? `전체 소식 (${displayedNews.length})` : `공지사항 (${displayedNews.length})`}
                </span>
              </div>
            </div>

            {/* 컨트롤 버튼: 전체/공지만 보기 토글 & 새 소식 작성 */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowAllNews(!showAllNews)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#192231] border border-white/10 hover:bg-[#202b3e] transition-colors cursor-pointer shadow-xs"
              >
                {showAllNews ? '공지만 보기' : '전체 소식'}
              </button>
              <button
                onClick={() => setWriteModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-500/20"
              >
                <Plus className="w-3.5 h-3.5" /> 소식 등록
              </button>
            </div>
          </div>

          {/* 위에서부터 아래로 나열되는 수직 리스트 (정돈된 다크 슬레이트 카드 패널) */}
          <div className="bg-[#192231]/90 border border-white/10 rounded-xl p-4 sm:p-6 divide-y divide-white/5 shadow-xl">
            {displayedNews.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs">
                등록된 공지사항이 없습니다.
              </div>
            ) : (
              displayedNews.slice(0, 4).map((n) => (
                <div 
                  key={n.id}
                  onClick={() => setSelectedNews(n)}
                  className="py-5 px-3 -mx-3 rounded-lg hover:bg-[#202b3e]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* 공지 뱃지 (체크된 글) */}
                    {n.isNotice ? (
                      <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-red-950/60 text-[#ff4d58] border border-red-500/30">
                        공지
                      </span>
                    ) : (
                      <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-medium font-mono bg-white/5 text-slate-400 border border-white/10">
                        일반
                      </span>
                    )}
                    
                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      [{n.category}]
                    </span>

                    {/* 제목 */}
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-[#ff4d58] transition-colors truncate">
                      {n.title}
                    </h3>
                  </div>

                  {/* 날짜 & 화살표 */}
                  <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 text-xs text-slate-400 font-mono">
                    <span>{n.date}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#ff4d58] transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* 다음 섹션 이동 스크롤 버튼 */}
        <button
          onClick={() => scrollToSection('location')}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown className="w-4 h-4 text-[#e30613]" />
          </motion.div>
        </button>
      </section>

      {/* ================================================================
          5. LOCATION & FOOTER (한 화면 가득 채움 + 올라오는 모션)
      ================================================================ */}
      <section 
        id="location" 
        className="snap-section flex flex-col justify-between relative overflow-hidden bg-[#181d26] border-t border-white/10 pt-20 pb-4"
      >
        {/* 본사 빌딩/현대 건축 배경 이미지 및 딥 슬레이트 오버레이 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#181d26]/95 via-[#181d26]/90 to-[#141820]/95 z-10" />

        {/* 올라오는 액션 느낌이 부각된 컨텐츠 래퍼 */}
        <motion.div 
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center my-auto relative z-20"
        >
          {/* 섹션 상단 헤더 & 교통 편의 안내 */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3.5 pb-2.5 border-b border-white/10 gap-3">
            <div>
              <span className="text-[#e30613] text-sm font-bold font-mono tracking-wider uppercase">LOCATION & DIRECTIONS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">오시는 길</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#192231] border border-white/10 font-semibold shadow-xs">
                <Train className="w-4 h-4 text-blue-400" /> KTX 광명역 1·5번 출구 도보 8분
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#192231] border border-white/10 font-semibold shadow-xs">
                <Navigation className="w-4 h-4 text-amber-400" /> 서해안·제2경인 광명역IC 3분
              </span>
            </div>
          </div>

          {/* 1. 광명역 역세권 정밀 지도 영역 (티엔이엔씨 본사 집중 부각) */}
          <div className="bg-[#192231] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
            
            {/* 지도 상단 범례 안내 바 */}
            <div className="bg-[#141b26] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs sm:text-sm gap-2.5">
              <div className="flex items-center gap-4 sm:gap-5 text-slate-300">
                <span className="flex items-center gap-2 font-black text-white">
                  <span className="w-3 h-3 rounded-full bg-[#e30613] inline-block animate-pulse" /> 티엔이엔씨(주) 본사
                </span>
                <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <Train className="w-3.5 h-3.5" /> KTX 광명역 (1호선)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Bus className="w-3.5 h-3.5" /> 버스 정류장
                </span>
                <span className="text-slate-400 hidden md:inline font-medium">
                  🏢 주요 랜드마크
                </span>
                <span className="text-emerald-400 hidden md:inline font-medium">
                  🌲 새빛공원
                </span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-slate-300 font-bold">
                광명역자이타워 B동 906, 907호
              </div>
            </div>

            {/* 정밀 지형/건물/정류장 SVG 지도 (광명자이타워 B동 정밀 위치 반영 - 정교한 다크 캐드/블루프린트 스타일) */}
            <div className="w-full h-[320px] sm:h-[370px] lg:h-[400px] relative bg-[#131924]">
              <svg 
                viewBox="0 0 960 400" 
                className="w-full h-full select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* B동 본사용 딥 루비 그라데이션 */}
                  <linearGradient id="bTowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b1419" />
                    <stop offset="100%" stopColor="#54151b" />
                  </linearGradient>

                  {/* 본사 강조 콜아웃 카드 그라데이션 */}
                  <linearGradient id="heroCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c50713" />
                    <stop offset="100%" stopColor="#e30613" />
                  </linearGradient>

                  {/* 부드러운 드롭 섀도우 필터 */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e30613" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* 미세 그리드 배경선 */}
                <g stroke="#334155" strokeOpacity="0.3" strokeWidth="1">
                  {[40, 80, 120, 160, 200, 240, 280, 320, 360].map(y => (
                    <line key={`h-${y}`} x1="0" y1={y} x2="960" y2={y} />
                  ))}
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
                    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" />
                  ))}
                </g>

                {/* =======================================================
                    1. 메인 도로망 (Road Networks - 정확한 실측 방위)
                ======================================================= */}
                {/* 1) 상단 광역도로망 (서해안 / 제2경인고속도로) */}
                <rect x="0" y="12" width="960" height="22" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="23" x2="960" y2="23" stroke="#475569" strokeDasharray="8 6" strokeWidth="1.5" />
                <text x="40" y="27" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">▲ 서해안고속도로 / 제2경인고속도로 (광명역 IC 방면 차량 3분)</text>

                {/* 2) 양지로 (KTX 광명역 앞 남북 간선대로) */}
                <rect x="175" y="34" width="46" height="366" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="198" y1="34" x2="198" y2="400" stroke="#475569" strokeDasharray="6 6" strokeWidth="1.5" />
                <text x="183" y="380" fill="#94a3b8" fontSize="12" fontWeight="bold" writingMode="vertical-rl" fontFamily="sans-serif">양지로</text>

                {/* 3) 덕안로 (광명역세권 동서 관통 메인대로) */}
                <rect x="175" y="145" width="785" height="42" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="175" y1="166" x2="960" y2="166" stroke="#475569" strokeDasharray="6 6" strokeWidth="1.5" />
                <text x="315" y="162" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">덕안로</text>

                {/* 4) 새빛공원로 (광명역자이타워 앞 도로 - 새빛공원로 67) */}
                <rect x="370" y="145" width="38" height="255" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="389" y1="145" x2="389" y2="400" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
                <text x="376" y="215" fill="#cbd5e1" fontSize="11" fontWeight="bold" writingMode="vertical-rl" fontFamily="sans-serif">새빛공원로</text>

                {/* 5) 일직로 (동측 남북로 - 코스트코/이케아 연계) */}
                <rect x="735" y="34" width="36" height="366" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="753" y1="34" x2="753" y2="400" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
                <text x="742" y="380" fill="#94a3b8" fontSize="11" fontWeight="bold" writingMode="vertical-rl" fontFamily="sans-serif">일직로</text>

                {/* =======================================================
                    2. 서측: KTX 광명역 (1호선 연계 대형 랜드마크)
                ======================================================= */}
                <g>
                  {/* 선로 철도 구역 */}
                  <rect x="25" y="55" width="135" height="305" rx="8" fill="#172554" stroke="#1e40af" strokeWidth="1.5" />
                  <line x1="42" y1="75" x2="42" y2="340" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <line x1="52" y1="75" x2="52" y2="340" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  
                  {/* 역사 건물 본체 */}
                  <rect x="32" y="85" width="120" height="245" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                  <rect x="32" y="85" width="120" height="32" rx="6" fill="#2563eb" />
                  
                  <text x="42" y="106" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🚆 KTX 광명역</text>
                  <text x="42" y="132" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily="monospace">수도권 1호선 전철</text>

                  {/* 1번 출구 */}
                  <g transform="translate(132, 120)">
                    <rect x="0" y="0" width="30" height="22" rx="3" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                    <text x="5" y="16" fill="#ffffff" fontSize="12" fontWeight="bold">1번</text>
                  </g>

                  {/* 5번 출구 (도보 이동 주 출구) */}
                  <g transform="translate(132, 175)">
                    <rect x="0" y="0" width="30" height="22" rx="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="5" y="16" fill="#ffffff" fontSize="12" fontWeight="bold">5번</text>
                  </g>
                </g>

                {/* =======================================================
                    3. 북측 블록 (덕안로 북쪽 - 주거 및 대형 복합몰)
                ======================================================= */}
                {/* 1) 광명역 센트럴자이 (아파트) */}
                <rect x="235" y="48" width="120" height="82" rx="6" fill="#192231" stroke="#334155" strokeWidth="1" />
                <text x="245" y="78" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="sans-serif">광명역 센트럴자이</text>
                <text x="245" y="98" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">아파트 1,005세대</text>

                {/* 2) 아브뉴프랑 광명 & 호반써밋플레이스 */}
                <rect x="420" y="48" width="145" height="82" rx="6" fill="#192231" stroke="#334155" strokeWidth="1" />
                <text x="432" y="78" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="sans-serif">아브뉴프랑 광명</text>
                <text x="432" y="98" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">써밋플레이스 복합몰</text>

                {/* 3) 이케아(IKEA) & 롯데몰 광명점 */}
                <rect x="580" y="48" width="140" height="82" rx="6" fill="#192231" stroke="#334155" strokeWidth="1" />
                <text x="590" y="78" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="sans-serif">이케아 광명점</text>
                <text x="590" y="98" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">롯데몰 광명점 복합관</text>

                {/* 4) 코스트코 광명점 */}
                <rect x="785" y="48" width="150" height="82" rx="6" fill="#192231" stroke="#334155" strokeWidth="1" />
                <text x="797" y="78" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="sans-serif">코스트코 광명점</text>
                <text x="797" y="98" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">대형 유통센터</text>

                {/* =======================================================
                    4. 남측 블록 (덕안로 남쪽 - 파크자이, 자이타워, 새빛공원)
                ======================================================= */}
                {/* 1) 광명역 파크자이 (아파트 - KTX역 및 새빛공원로 사이) */}
                <rect x="235" y="202" width="120" height="168" rx="6" fill="#192231" stroke="#334155" strokeWidth="1" />
                <text x="245" y="235" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="sans-serif">광명역 파크자이</text>
                <text x="245" y="255" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">아파트 875세대</text>

                {/* =======================================================
                    ★ [핵심] 광명역자이타워 대단지 필지 (새빛공원로 67)
                    - 서측: A동 (광명역/파크자이 방향)
                    - 중앙: 아트리움 보행로 및 상가
                    - 동측: B동 (새빛공원 뷰 및 티엔이엔씨(주) 본사)
                ======================================================= */}
                {/* 자이타워 전체 대지 필지 테두리 */}
                <rect x="420" y="202" width="300" height="178" rx="8" fill="#151c28" stroke="#3b4b66" strokeWidth="1.5" />
                
                {/* 필지 상단 주소 라벨 */}
                <rect x="420" y="202" width="300" height="20" rx="4" fill="#1e293b" />
                <text x="570" y="216" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  광명역자이타워 단지 (경기도 광명시 새빛공원로 67)
                </text>

                {/* --- 1. A동 (서측 타워 - 역/파크자이 방향 일반동) --- */}
                <g transform="translate(432, 228)">
                  <rect x="0" y="0" width="105" height="142" rx="6" fill="#1a2332" stroke="#475569" strokeWidth="1.5" />
                  
                  {/* A동 지붕 밴드 */}
                  <rect x="0" y="0" width="105" height="24" rx="6" fill="#253347" />
                  <text x="52" y="17" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">자이타워 A동</text>
                  
                  {/* A동 외벽 오피스 윈도우 그리드 */}
                  <line x1="12" y1="34" x2="93" y2="34" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="12" y1="50" x2="93" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="12" y1="66" x2="93" y2="66" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  
                  <text x="52" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="medium">지식산업센터</text>
                  <text x="52" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">오피스 / 제조시설</text>
                  <text x="52" y="130" textAnchor="middle" fill="#64748b" fontSize="9">서측 출입구</text>
                </g>

                {/* --- 2. 중앙 연결 통로 & 1~3F 상가 스트리트 --- */}
                <g transform="translate(540, 260)">
                  <rect x="0" y="0" width="22" height="75" rx="3" fill="#131924" stroke="#334155" strokeWidth="1" />
                  <text x="11" y="32" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" writingMode="vertical-rl">중앙통로</text>
                  <text x="11" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" writingMode="vertical-rl">상가스트리트</text>
                </g>

                {/* --- 3. ★ B동 [티엔이엔씨(주) 본사 소재지 - 동측/새빛공원 파노라마 뷰] --- */}
                <g transform="translate(566, 222)">
                  {/* B동 외벽 (선명한 레드 테두리 & 딥 와인 틴트 배경) */}
                  <rect 
                    x="0" y="0" width="144" height="152" rx="8" 
                    fill="url(#bTowerGrad)" 
                    stroke="#e30613" 
                    strokeWidth="2.5" 
                  />
                  
                  {/* B동 지붕 크라운 헤더 (선명한 레드) */}
                  <rect x="0" y="0" width="144" height="28" rx="8" fill="#e30613" />
                  <text x="72" y="19" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                    ★ 광명역자이타워 B동
                  </text>

                  {/* B동 중앙: 티엔이엔씨(주) 엠블럼 및 본사 명칭 강조 */}
                  <text x="72" y="58" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="900" fontFamily="sans-serif">
                    티엔이엔씨(주)
                  </text>
                  <text x="72" y="78" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                    9층 906호 · 907호 본사
                  </text>
                  
                  {/* 세부 안내 */}
                  <rect x="12" y="90" width="120" height="24" rx="4" fill="#2a1418" stroke="#7f1d1d" strokeWidth="1" />
                  <text x="72" y="106" textAnchor="middle" fill="#fecaca" fontSize="10" fontWeight="bold">
                    플랜트 엔지니어링 본부
                  </text>

                  {/* B동 로비 진입로 */}
                  <rect x="25" y="124" width="94" height="20" rx="3" fill="#e30613" />
                  <text x="72" y="138" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                    B동 메인로비 출입구 ▲
                  </text>
                </g>

                {/* 4) 새빛공원 (자이타워 B동 바로 동측에 위치한 대형 녹지·수변공원) */}
                <g transform="translate(735, 202)">
                  <rect x="0" y="0" width="200" height="178" rx="8" fill="#0a2016" stroke="#166534" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="20" y="32" fill="#4ade80" fontSize="13" fontWeight="bold" fontFamily="sans-serif">🌲 새빛공원 (녹지·수변)</text>
                  <text x="20" y="52" fill="#86efac" fontSize="11" fontFamily="sans-serif">자이타워 B동 동측 맞은편</text>
                  <text x="20" y="70" fill="#4ade80" fontSize="10" opacity="0.8" fontFamily="sans-serif">수변 산책로 및 공원 뷰</text>
                  
                  {/* 산책로 및 수변 웨이브 */}
                  <path d="M15,95 Q70,80 120,105 T185,95" fill="none" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.6" />
                  <path d="M15,120 Q80,105 130,130 T185,115" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" />
                  <path d="M15,145 Q65,130 115,150 T185,140" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />
                </g>

                {/* =======================================================
                    5. 도보 이동 경로 (KTX광명역 5번출구 -> 자이타워 B동 본사)
                ======================================================= */}
                {/* 레드 점선 도보 경로 */}
                <path 
                  d="M162,186 L220,186 L220,166 L389,166 L389,342 L420,342 L566,342" 
                  fill="none" 
                  stroke="#e30613" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                  opacity="0.95"
                />
                
                {/* 도보 소요시간 배지 */}
                <g transform="translate(235, 172)">
                  <rect x="0" y="0" width="130" height="22" rx="4" fill="#1e293b" stroke="#e30613" strokeWidth="1.5" />
                  <text x="8" y="15" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily="sans-serif">🚶 도보 8분 (약 540m)</text>
                </g>

                {/* =======================================================
                    6. 버스 정류장 3개소 (Bus Stops)
                ======================================================= */}
                {/* 🚏 1) 광명역자이타워·새빛공원 정류장 (자이타워 앞 도보 1분) */}
                <g transform="translate(355, 275)">
                  <circle cx="11" cy="11" r="11" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="5" y="16" fill="#ffffff" fontSize="12" fontWeight="bold">🚏</text>
                  <rect x="25" y="1" width="145" height="20" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                  <text x="31" y="15" fill="#a7f3d0" fontSize="11" fontWeight="bold">광명역자이타워 정류장 (1분)</text>
                </g>

                {/* 🚏 2) KTX광명역 정류장 (1번출구 앞) */}
                <g transform="translate(170, 95)">
                  <circle cx="9" cy="9" r="9" fill="#059669" stroke="#ffffff" strokeWidth="1" />
                  <text x="4" y="14" fill="#ffffff" fontSize="10">🚏</text>
                  <rect x="20" y="0" width="110" height="18" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                  <text x="25" y="13" fill="#a7f3d0" fontSize="10" fontWeight="bold">KTX광명역 정류장</text>
                </g>

                {/* 🚏 3) 새빛공원 정류장 (새빛공원·일직로 앞) */}
                <g transform="translate(740, 150)">
                  <circle cx="9" cy="9" r="9" fill="#059669" stroke="#ffffff" strokeWidth="1" />
                  <text x="4" y="14" fill="#ffffff" fontSize="10">🚏</text>
                  <rect x="20" y="0" width="100" height="18" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                  <text x="25" y="13" fill="#a7f3d0" fontSize="10" fontWeight="bold">새빛공원 정류장</text>
                </g>

                {/* =======================================================
                    7. ★ B동 정밀 타겟 펄스 비콘 & 상단 플로팅 본사 배지
                ======================================================= */}
                {/* 1) B동 옥상 정밀 타겟 펄스 링 (Pulsing Radar Pin) */}
                <g transform="translate(638, 222)">
                  <circle cx="0" cy="0" r="26" fill="#e30613" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="16" fill="#e30613" fillOpacity="0.45" />
                  <circle cx="0" cy="0" r="8" fill="#e30613" stroke="#ffffff" strokeWidth="2.5" />
                </g>

                {/* 2) 덕안로 상단 공간을 활용한 플로팅 본사 콜아웃 핀 카드 */}
                <g transform="translate(528, 142)" filter="url(#glow)">
                  <rect 
                    x="0" y="0" width="220" height="54" rx="8" 
                    fill="url(#heroCardGrad)" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                  />
                  {/* 카드 내부 텍스트 */}
                  <text x="14" y="24" fill="#ffffff" fontSize="15" fontWeight="900" fontFamily="sans-serif">
                    ★ 티엔이엔씨(주) 본사
                  </text>
                  <text x="14" y="44" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                    광명자이타워 B동 906호·907호 (9층)
                  </text>
                  
                  {/* 말풍선 핀 꼬리 (B동 옥상 정확한 비콘 위치를 가리킴) */}
                  <polygon points="103,54 117,54 110,68" fill="#e30613" stroke="#ffffff" strokeWidth="1" />
                </g>
              </svg>
            </div>
          </div>

          {/* 2. 그 아래: 주소, 대표전화, 팩스번호, 이메일 + 길찾기/상담 액션 버튼들 */}
          <div className="bg-[#192231]/90 border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl mt-3.5 text-sm">
            
            {/* 상단: 4대 핵심 연락 정보 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-white/10">
              
              {/* 주소 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e30613]/20 border border-[#e30613]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#ff4d58]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">본사 주소</div>
                  <div className="text-white font-semibold text-sm leading-snug mt-1">
                    경기도 광명시 새빛공원로 67 B동 906·907호 (광명역자이타워)
                  </div>
                </div>
              </div>

              {/* 대표전화 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">대표전화</div>
                  <a href="tel:02-6929-2560" className="text-white hover:text-[#ff4d58] font-bold font-mono text-base transition-colors block mt-1">
                    02. 6929. 2560
                  </a>
                </div>
              </div>

              {/* 팩스번호 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">팩스번호</div>
                  <div className="text-white font-mono text-base font-semibold mt-1">
                    02. 6929. 2570
                  </div>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">이메일 문의</div>
                  <a href="mailto:tnenc@tnenc.com" className="text-white hover:text-blue-400 font-mono text-sm font-semibold transition-colors block mt-1">
                    tnenc@tnenc.com
                  </a>
                </div>
              </div>

            </div>

            {/* 하단: 카카오맵 길찾기, 네이버지도 길찾기, 프로젝트 상담 버튼 */}
            <div className="pt-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-slate-400 hidden md:block font-medium">
                * 방문 전 사전 연락 주시면 주차 등록 및 전담 엔지니어 상담을 도와드립니다.
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* 카카오맵 길찾기 버튼 */}
                <a 
                  href="https://map.kakao.com/link/search/광명역자이타워" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-lg bg-[#fee500] hover:bg-[#ebd300] text-[#191919] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3c1e1e]" />
                  카카오맵 길찾기 <ExternalLink className="w-4 h-4" />
                </a>

                {/* 네이버지도 길찾기 버튼 */}
                <a 
                  href="https://map.naver.com/p/search/광명역자이타워" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-lg bg-[#03c75a] hover:bg-[#02b351] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  네이버 지도 길찾기 <ExternalLink className="w-4 h-4" />
                </a>

                {/* 프로젝트 상담 신청 버튼 */}
                <button 
                  onClick={() => setInquiryOpen(true)}
                  className="flex-1 md:flex-initial px-5 py-2.5 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-red-500/20 inline-flex items-center justify-center gap-2"
                >
                  견적·상담 문의
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 마지막 화면 하단 통합형 푸터 (고급스러운 딥 슬레이트 바) */}
        <footer className="w-full border-t border-white/10 bg-[#0e131d] backdrop-blur-md text-xs text-slate-400 py-5 mt-auto relative z-20">
          <div className="max-w-6xl mx-auto px-6 space-y-3.5">
            {/* 상단 행: 로고/회사명 및 내비게이션 메뉴 */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div 
                  className="h-5 w-[85px] sm:h-6 sm:w-[95px] overflow-hidden flex items-start cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => scrollToSection('home')}
                >
                  <img 
                    src="/assets/aistudio/________AI___text_ddfc456b.png" 
                    alt="티엔이엔씨(주) TN E&C" 
                    className="w-full h-auto object-cover object-top"
                  />
                </div>
                <span className="font-bold text-white font-mono tracking-wider text-xs sm:text-sm">TN E&C Co., Ltd.</span>
              </div>

              {/* 푸터 내비게이션 메뉴 */}
              <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-mono">
                {[
                  { id: 'home', label: 'HOME' },
                  { id: 'project', label: 'PROJECT' },
                  { id: 'technology', label: 'TECHNOLOGY' },
                  { id: 'news', label: 'NEWS' },
                  { id: 'location', label: 'LOCATION' },
                ].map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`tracking-wider uppercase transition-colors cursor-pointer py-1 relative font-semibold ${
                        isActive 
                          ? 'text-[#ff4d58] font-bold' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#e30613]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 하단 행: 사업자 정보 및 카피라이트 */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1">
                <span className="text-slate-200 font-semibold">티엔이엔씨(주)</span>
                <span className="text-slate-600">|</span>
                <span>대표자: 박헌우</span>
                <span className="text-slate-600">|</span>
                <span>사업자등록번호: 114-87-07244</span>
                <span className="hidden md:inline text-slate-600">|</span>
                <span className="hidden md:inline">경기도 광명시 새빛공원로 67, B동 906·907호 (광명역자이타워)</span>
              </div>
              <div className="font-mono text-slate-400 text-[10px] sm:text-[11px]">
                © 2026 TN E&C Co., Ltd. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* ================================================================
          프로젝트 상세 모달
      ================================================================ */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#192231] border border-white/15 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in">
            <div className="h-52 relative">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-amber-300 border border-white/10">
                {selectedProject.categoryName}
              </div>
            </div>

            <div className="p-6 text-xs">
              <div className="text-[#ff4d58] font-semibold mb-1">{selectedProject.client}</div>
              <h3 className="text-lg font-bold text-white mb-4">{selectedProject.title}</h3>

              <div className="space-y-2 bg-[#131924] p-3.5 rounded-lg border border-white/10 mb-6 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">공사분류</span>
                  <span className="font-semibold text-slate-100">{selectedProject.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">소재지</span>
                  <span className="text-slate-200">{selectedProject.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">건축규모</span>
                  <span className="text-slate-200">{selectedProject.area}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors"
                >
                  닫기
                </button>
                <button 
                  onClick={() => { setSelectedProject(null); setInquiryOpen(true); }}
                  className="px-4 py-2 rounded-lg bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  유사 프로젝트 상담
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          소식 상세 보기 모달
      ================================================================ */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#192231] border border-white/15 rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-xs">
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              {selectedNews.isNotice && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-950/60 text-[#ff4d58] border border-red-500/30">
                  공지사항
                </span>
              )}
              <span className="text-slate-400 font-medium">[{selectedNews.category}]</span>
              <span className="text-slate-400 font-mono text-[11px] ml-auto">{selectedNews.date}</span>
            </div>

            <h3 className="text-base font-bold text-white mb-4 leading-snug">{selectedNews.title}</h3>
            
            <div className="p-4 rounded-lg bg-[#131924] border border-white/10 text-slate-300 leading-relaxed whitespace-pre-line mb-6">
              {selectedNews.content}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 font-semibold transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          간편 문의 모달
      ================================================================ */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#192231] border border-white/15 rounded-xl max-w-md w-full p-6 shadow-2xl relative text-xs">
            <button 
              onClick={() => setInquiryOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">프로젝트 견적 및 상담 문의</h3>
            <p className="text-slate-400 mb-5 text-[11px]">성함과 연락처를 남겨주시면 신속히 연락드리겠습니다.</p>

            {inquirySent ? (
              <div className="text-center py-8">
                <div className="text-emerald-400 font-bold text-sm mb-2">접수가 완료되었습니다.</div>
                <p className="text-slate-400 text-xs mb-4">담당자가 확인 후 연락드리겠습니다.</p>
                <button 
                  onClick={() => { setInquirySent(false); setInquiryOpen(false); }}
                  className="px-4 py-2 rounded-lg bg-white/10 text-slate-200 hover:bg-white/15 font-medium"
                >
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">회사명 / 성함 *</label>
                  <input required type="text" placeholder="(주)회사명 / 성함" className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#e30613]" />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">연락처 *</label>
                  <input required type="tel" placeholder="010-0000-0000" className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#e30613]" />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">공사 종류</label>
                  <select className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white focus:outline-none focus:border-[#e30613]">
                    <option className="bg-[#192231] text-white">바이오·제약 플랜트 (GMP)</option>
                    <option className="bg-[#192231] text-white">R&D 연구시설</option>
                    <option className="bg-[#192231] text-white">HACCP 식품공장</option>
                    <option className="bg-[#192231] text-white">일반건축 및 사옥</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">문의 내용</label>
                  <textarea rows={3} placeholder="공사 규모, 위치, 요청사항 등" className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#e30613] resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs transition-colors mt-2 shadow-sm">
                  상담 신청 접수
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================================================================
          새 소식 작성 모달 (공지사항 체크란 지원)
      ================================================================ */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#192231] border border-white/15 rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-xs">
            <button 
              onClick={() => setWriteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e30613]" /> 회사 소식 작성
            </h3>
            <p className="text-slate-400 mb-5 text-[11px]">
              신규 소식을 작성합니다. 공지사항으로 체크하면 메인화면 상단부터 즉시 노출됩니다.
            </p>

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">소식 분류</label>
                <select 
                  value={newNewsPost.category}
                  onChange={(e) => setNewNewsPost({ ...newNewsPost, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white focus:outline-none focus:border-[#e30613]"
                >
                  <option value="수주 소식" className="bg-[#192231] text-white">수주 소식</option>
                  <option value="기업 신용" className="bg-[#192231] text-white">기업 신용 / 평가</option>
                  <option value="안전 경영" className="bg-[#192231] text-white">안전 경영</option>
                  <option value="기술 동향" className="bg-[#192231] text-white">기술 동향 / 인증</option>
                  <option value="일반 공지" className="bg-[#192231] text-white">일반 공지</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">제목 *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="소식 제목을 입력해 주세요."
                  value={newNewsPost.title}
                  onChange={(e) => setNewNewsPost({ ...newNewsPost, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#e30613]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">본문 내용 *</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder="소식 본문 내용을 작성해 주세요."
                  value={newNewsPost.content}
                  onChange={(e) => setNewNewsPost({ ...newNewsPost, content: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#131924] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#e30613] resize-none"
                />
              </div>

              {/* 공지사항 체크란 */}
              <div className="p-3.5 rounded-lg bg-[#131924] border border-white/10 hover:border-[#e30613]/50 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNewsPost.isNotice}
                    onChange={(e) => setNewNewsPost({ ...newNewsPost, isNotice: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#e30613] bg-[#192231] focus:ring-0 cursor-pointer accent-[#e30613]"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" /> 메인화면 공지사항으로 등록
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      체크 시 메인화면 '회사 소식'에 위에서부터 최신 순으로 노출됩니다.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 text-xs font-semibold transition-colors"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className="w-2/3 py-2.5 rounded-lg bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" /> 소식 등록 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
