export type TimelineKind = 'experience' | 'education' | 'project';

export type TimelineItem = {
  id: string;
  kind: TimelineKind;
  date: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  details?: {
    description: string;
    technologies: string[];
    images: { src: string; alt: string }[];
    ctas: { label: string; href: string; type: 'play' | 'site' | 'github' }[];
  };
};

export const techStack = [
  'JavaScript',
  'React',
  'Angular',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Oracle Cloud Infrastructure (OCI)'
];

export const timelineItems: TimelineItem[] = [
  {
    id: 'experience-1',
    kind: 'experience',
    date: '2024 - Atualmente',
    title: 'Software Engineer',
    subtitle: 'Projetos Full Stack e Front-end',
    summary: 'Desenvolvimento de interfaces performáticas e integrações escaláveis com foco em UX.',
    tags: ['React', 'Next.js', 'Node.js']
  },
  {
    id: 'education-1',
    kind: 'education',
    date: '2022 - 2024',
    title: 'Análise e Desenvolvimento de Sistemas',
    subtitle: 'Centro Universitário Paulistano',
    summary: 'Formação orientada a arquitetura de software, banco de dados e engenharia de produto.',
    tags: ['Algoritmos', 'Banco de Dados', 'Arquitetura']
  },
  {
    id: 'project-1',
    kind: 'project',
    date: 'Projeto Destaque',
    title: 'Tetris Futurista',
    subtitle: 'Game Web interativo',
    summary: 'Jogo desenvolvido com animações fluidas, pontuação em tempo real e UI cyberpunk.',
    tags: ['TypeScript', 'Canvas', 'Framer Motion'],
    details: {
      description:
        'Projeto autoral com mecânica de gameplay otimizada, HUD responsivo e componentes reutilizáveis para facilitar evolução de features.',
      technologies: ['TypeScript', 'React', 'Framer Motion', 'Tailwind CSS'],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
          alt: 'Preview do projeto de jogo estilo Tetris'
        }
      ],
      ctas: [
        { label: 'Jogar', href: '#', type: 'play' },
        { label: 'Ver no GitHub', href: '#', type: 'github' }
      ]
    }
  },
  {
    id: 'project-2',
    kind: 'project',
    date: 'Projeto Destaque',
    title: 'E-commerce Performance',
    subtitle: 'Plataforma de vendas moderna',
    summary: 'Experiência de compra de alta conversão com foco em velocidade e acessibilidade.',
    tags: ['Next.js', 'SEO', 'Performance'],
    details: {
      description:
        'Aplicação com catálogo inteligente, checkout simplificado e arquitetura modular preparada para escala de produto.',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'API REST'],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
          alt: 'Preview do dashboard de e-commerce'
        }
      ],
      ctas: [
        { label: 'Visitar Site', href: '#', type: 'site' },
        { label: 'Ver no GitHub', href: '#', type: 'github' }
      ]
    }
  }
];
