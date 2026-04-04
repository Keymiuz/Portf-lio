export type TimelineKind = 'education' | 'experience';

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  period: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  tags: string[];
  bullets: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: 'github' | 'live' | 'demo';
};

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  badge: 'portfolio' | 'projeto real';
  image?: {
    src: string;
    alt: string;
  };
  details: string[];
  links: ProjectLink[];
};

const githubProfile = 'https://github.com/Keymiuz';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front-end',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Angular', 'Bootstrap', 'Tailwind CSS']
  },
  {
    title: 'Back-end e Mobile',
    items: ['Spring Boot', 'Spring Data JPA', 'Node.js', '.NET', 'Java', 'Python', 'C#', 'React Native', 'Flutter']
  },
  {
    title: 'Banco de Dados',
    items: ['SQL', 'MySQL', 'PostgreSQL', 'Oracle SQL (PL/SQL)', 'MongoDB']
  },
  {
    title: 'Infra e Ferramentas',
    items: ['Shell', 'C/C++', 'Docker', 'Git', 'GitHub', 'Maven', 'AWS', 'Oracle', 'Power BI', 'Power Platform']
  },
  {
    title: 'Metodologias',
    items: ['Cibersegurança', 'Agile', 'CI/CD', 'DevOps']
  }
];

export const spokenLanguages = ['Inglês (C1 - EFSET)', 'Francês (básico)', 'Espanhol (básico)'];

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'education-unipaulistana',
    kind: 'education',
    period: '2022 - 2025',
    title: 'Análise e Desenvolvimento de Sistemas',
    organization: 'Centro Universitário Paulistano',
    location: 'São Paulo, Brasil',
    summary: 'Formação superior focada em base computacional, desenvolvimento de software e resolução estruturada de problemas.',
    tags: ['Java', 'POO', 'Estruturas de Dados', 'SQL'],
    bullets: [
      'Formação superior em Análise e Desenvolvimento de Sistemas.',
      'Base acadêmica em programação orientada a objetos, estruturas de dados, banco de dados e arquitetura de software.',
      'Jornada conectada a projetos práticos e fundamentos de engenharia de produto.'
    ]
  },
  {
    id: 'experience-music-go',
    kind: 'experience',
    period: 'set 2023 - nov 2023',
    title: 'Desenvolvedor Front-End',
    organization: 'Music.go',
    location: 'Remoto / Freelancer',
    summary: 'Atuação freelancer com foco em interfaces responsivas, animações e melhoria de performance no front-end da aplicação.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub', 'SOLID'],
    bullets: [
      'Desenvolvi animações e implementei o front-end da aplicação.',
      'Criei interfaces responsivas com HTML, CSS, JavaScript e React, reduzindo em 40% (0,4s) o tempo médio de carregamento das telas.',
      'Apliquei princípios SOLID e versionamento com Git, reduzindo em 5% a ocorrência de bugs em produção.',
      'Colaborei em reuniões diárias com a equipe, garantindo consistência visual entre protótipos e produto final.'
    ]
  },
  {
    id: 'experience-monitoria-java',
    kind: 'experience',
    period: 'ago 2025 - presente',
    title: 'Monitoria - Programação Orientada a Objetos (Java)',
    organization: 'Centro Universitário Paulistano',
    location: 'São Paulo, Brasil',
    summary: 'Apoio acadêmico em Java para mais de 40 alunos, com foco em POO, exercícios práticos e melhoria de desempenho.',
    tags: ['Java', 'POO', 'Estruturas de Dados'],
    bullets: [
      'Apoio a mais de 40 alunos no aprendizado de POO em Java, contribuindo para uma melhora média de 15% nas notas finais.',
      'Auxiliei na resolução de exercícios e projetos, ajudando a reduzir em 10% a taxa de reprovação da disciplina.',
      'Produzi materiais de apoio e resumos teóricos, otimizando o estudo individual dos alunos fora da sala de aula.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: 'project-cedro-rosa',
    title: 'Desenvolvedor para Cedro Rosa',
    summary: 'Participação em um projeto real publicado, com foco em entrega funcional e presença digital em produção.',
    stack: ['Projeto real', 'Front-end', 'Entrega em produção'],
    difficulty: 2,
    badge: 'projeto real',
    details: [
      'Projeto real publicado e acessível online.',
      'Entra no portfólio como prova concreta de entrega em ambiente de produção.',
      'Boa peça para equilibrar os projetos autorais com trabalho aplicado a um contexto real.'
    ],
    links: [{ label: 'Visitar site', href: 'https://cedrorosamusica.online/musicas/', kind: 'live' }]
  },
  {
    id: 'project-tetris',
    title: 'Tetris',
    summary: 'Versão autoral do clássico com foco em gameplay, organização da lógica do jogo e experiência visual.',
    stack: ['Game Dev', 'Frontend', 'Lógica'],
    difficulty: 3,
    badge: 'portfolio',
    details: [
      'Projeto próprio voltado a gameplay, controle de estado e lapidação da experiência do usuário.',
      'Estrutura pensada para suportar demo integrada no próprio portfólio.',
      'Pode funcionar como projeto jogável e vitrine técnica ao mesmo tempo.'
    ],
    links: [{ label: 'Jogar no site', href: '/projects/tetris', kind: 'demo' }]
  },
  {
    id: 'project-price-alert',
    title: 'Sistema de Alerta de Preço',
    summary: 'Plataforma de alertas com conta salva no navegador, monitoramento visual e catálogo mock integrado a vários sites.',
    stack: ['Monitoring', 'Automation', 'Alerts'],
    difficulty: 3,
    badge: 'portfolio',
    details: [
      'Demo com criação de conta, persistência local e alertas personalizados por produto.',
      'Painel elegante para acompanhar preços de sites como Amazon, Google Shopping, Mercado Livre e KaBuM!.',
      'Experiência visual pensada para parecer um produto real, mesmo usando dados mock nesta primeira versão.'
    ],
    links: [{ label: 'Abrir demo', href: '/projects/price-alert', kind: 'demo' }]
  },
  {
    id: 'project-rastreador-nf',
    title: 'Rastreador de NF',
    summary: 'Ferramenta voltada ao acompanhamento e organização de notas fiscais, com fluxo orientado à automação.',
    stack: ['Automation', 'Tracking', 'Back-end'],
    difficulty: 4,
    badge: 'portfolio',
    details: [
      'Projeto focado em rastreio de notas fiscais e centralização de acompanhamento operacional.',
      'Envolve lógica de consulta, tratamento de dados e organização de informações para uso prático.',
      'Não possui imagem no momento, mas a estrutura do modal já fica pronta para receber uma depois.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Rastreador-de-NF', kind: 'github' }]
  },
  {
    id: 'project-flappy-bird-neat',
    title: 'Automatizador de Flappy Bird',
    summary: 'Experimento em que o jogo aprende a se jogar sozinho com rede neural NEAT e evolução de gerações.',
    stack: ['Python', 'NEAT', 'Neural Networks'],
    difficulty: 4,
    badge: 'portfolio',
    image: {
      src: '/projects/flappy-bird-neat.jpg',
      alt: 'Treinamento do Flappy Bird com rede neural NEAT'
    },
    details: [
      'Aplicação que combina jogo, algoritmo genético e rede neural NEAT para aprender a jogar automaticamente.',
      'Exige entendimento de fitness, gerações, ajuste de parâmetros e integração com a simulação do jogo.',
      'Projeto forte para mostrar IA aplicada, experimentação e raciocínio evolutivo.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/ML-com-Flappy-Bird', kind: 'github' }]
  },
  {
    id: 'project-ray-tracer',
    title: 'Ray Tracer em C',
    summary: 'Projeto de computação gráfica para estudo de iluminação, materiais, câmera e renderização em baixo nível.',
    stack: ['C', 'Computer Graphics', 'Rendering'],
    difficulty: 5,
    badge: 'portfolio',
    image: {
      src: '/projects/ray-tracer.jpg',
      alt: 'Cena renderizada do projeto Ray Tracer em C'
    },
    details: [
      'Implementação de ray tracing em C com foco em fundamentos de luz, sombra, reflexão e materiais.',
      'Projeto mais técnico e matemático, exigindo bastante controle de memória, vetores e pipeline de renderização.',
      'Bom destaque para computação gráfica e programação de baixo nível.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Ray-Tracing-in-C', kind: 'github' }]
  }
];
