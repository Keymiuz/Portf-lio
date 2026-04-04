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
    items: ['Ciberseguranca', 'Agile', 'CI/CD', 'DevOps']
  }
];

export const spokenLanguages = ['Ingles (C1 - EFSET)', 'Frances (basico)', 'Espanhol (basico)'];

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'education-unipaulistana',
    kind: 'education',
    period: '2022 - 2025',
    title: 'Analise e Desenvolvimento de Sistemas',
    organization: 'Centro Universitario Paulistano',
    location: 'Sao Paulo, Brasil',
    summary: 'Formacao superior focada em base computacional, desenvolvimento de software e resolucao estruturada de problemas.',
    tags: ['Java', 'POO', 'Estruturas de Dados', 'SQL'],
    bullets: [
      'Formacao superior em Analise e Desenvolvimento de Sistemas.',
      'Base academica em programacao orientada a objetos, estruturas de dados, banco de dados e arquitetura de software.',
      'Jornada conectada a projetos praticos e fundamentos de engenharia de produto.'
    ]
  },
  {
    id: 'experience-music-go',
    kind: 'experience',
    period: 'set 2023 - nov 2023',
    title: 'Desenvolvedor Front-End',
    organization: 'Music.go',
    location: 'Remoto / Freelancer',
    summary: 'Atuacao freelancer com foco em interfaces responsivas, animacoes e melhoria de performance no front-end da aplicacao.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub', 'SOLID'],
    bullets: [
      'Desenvolvi animacoes e implementei o front-end da aplicacao.',
      'Criei interfaces responsivas com HTML, CSS, JavaScript e React, reduzindo em 40% (0,4s) o tempo medio de carregamento das telas.',
      'Apliquei principios SOLID e versionamento com Git, reduzindo em 5% a ocorrencia de bugs em producao.',
      'Colaborei em reunioes diarias com a equipe, garantindo consistencia visual entre prototipos e produto final.'
    ]
  },
  {
    id: 'experience-monitoria-java',
    kind: 'experience',
    period: 'ago 2025 - presente',
    title: 'Monitoria - Programacao Orientada a Objetos (Java)',
    organization: 'Centro Universitario Paulistano',
    location: 'Sao Paulo, Brasil',
    summary: 'Apoio academico em Java para mais de 40 alunos, com foco em POO, exercicios praticos e melhoria de desempenho.',
    tags: ['Java', 'POO', 'Estruturas de Dados'],
    bullets: [
      'Apoio a mais de 40 alunos no aprendizado de POO em Java, contribuindo para uma melhora media de 15% nas notas finais.',
      'Auxiliei na resolucao de exercicios e projetos, ajudando a reduzir em 10% a taxa de reprovacao da disciplina.',
      'Produzi materiais de apoio e resumos teoricos, otimizando o estudo individual dos alunos fora da sala de aula.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: 'project-cedro-rosa',
    title: 'Desenvolvedor para Cedro Rosa',
    summary: 'Participacao em um projeto real publicado, com foco em entrega funcional e presenca digital em producao.',
    stack: ['Projeto real', 'Front-end', 'Entrega em producao'],
    difficulty: 2,
    badge: 'projeto real',
    details: [
      'Projeto real publicado e acessivel online.',
      'Entra no portfolio como prova concreta de entrega em ambiente de producao.',
      'Boa peca para equilibrar os projetos autorais com trabalho aplicado a um contexto real.'
    ],
    links: [{ label: 'Visitar site', href: 'https://cedrorosamusica.online/musicas/', kind: 'live' }]
  },
  {
    id: 'project-tetris',
    title: 'Tetris',
    summary: 'Versao autoral do classico com foco em gameplay, organizacao da logica do jogo e experiencia visual.',
    stack: ['Game Dev', 'Frontend', 'Logica'],
    difficulty: 3,
    badge: 'portfolio',
    details: [
      'Projeto proprio voltado a gameplay, controle de estado e lapidacao da experiencia do usuario.',
      'Estrutura pensada para suportar demo integrada no proprio portifolio.',
      'Pode funcionar como projeto jogavel e vitrine tecnica ao mesmo tempo.'
    ],
    links: [{ label: 'Jogar no site', href: '/projects/tetris', kind: 'demo' }]
  },
  {
    id: 'project-price-alert',
    title: 'Sistema de Alerta de Preco',
    summary: 'Monitoramento de preco com logica de alerta para identificar mudancas e avisar rapidamente.',
    stack: ['Monitoring', 'Automation', 'Alerts'],
    difficulty: 3,
    badge: 'portfolio',
    details: [
      'Projeto de monitoramento com fluxo voltado a consulta, comparacao de valores e disparo de alerta.',
      'Tem bom potencial para demonstracao interativa dentro do site do portfolio.',
      'Conecta bem automacao com aplicacao real de utilidade.'
    ],
    links: [{ label: 'Demo no site em breve', href: '#', kind: 'demo' }]
  },
  {
    id: 'project-rastreador-nf',
    title: 'Rastreador de NF',
    summary: 'Ferramenta voltada ao acompanhamento e organizacao de notas fiscais, com fluxo orientado a automacao.',
    stack: ['Automation', 'Tracking', 'Back-end'],
    difficulty: 4,
    badge: 'portfolio',
    details: [
      'Projeto focado em rastreio de notas fiscais e centralizacao de acompanhamento operacional.',
      'Envolve logica de consulta, tratamento de dados e organizacao de informacoes para uso pratico.',
      'Nao possui imagem no momento, mas a estrutura do modal ja fica pronta para receber uma depois.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Rastreador-de-NF', kind: 'github' }]
  },
  {
    id: 'project-flappy-bird-neat',
    title: 'Automatizador de Flappy Bird',
    summary: 'Experimento em que o jogo aprende a se jogar sozinho com rede neural NEAT e evolucao de geracoes.',
    stack: ['Python', 'NEAT', 'Neural Networks'],
    difficulty: 4,
    badge: 'portfolio',
    image: {
      src: '/projects/flappy-bird-neat.jpg',
      alt: 'Treinamento do Flappy Bird com rede neural NEAT'
    },
    details: [
      'Aplicacao que combina jogo, algoritmo genetico e rede neural NEAT para aprender a jogar automaticamente.',
      'Exige entendimento de fitness, geracoes, ajuste de parametros e integracao com a simulacao do jogo.',
      'Projeto forte para mostrar IA aplicada, experimentacao e raciocinio evolutivo.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/ML-com-Flappy-Bird', kind: 'github' }]
  },
  {
    id: 'project-ray-tracer',
    title: 'Ray Tracer em C',
    summary: 'Projeto de computacao grafica para estudo de iluminacao, materiais, camera e renderizacao em baixo nivel.',
    stack: ['C', 'Computer Graphics', 'Rendering'],
    difficulty: 5,
    badge: 'portfolio',
    image: {
      src: '/projects/ray-tracer.jpg',
      alt: 'Cena renderizada do projeto Ray Tracer em C'
    },
    details: [
      'Implementacao de ray tracing em C com foco em fundamentos de luz, sombra, reflexao e materiais.',
      'Projeto mais tecnico e matematico, exigindo bastante controle de memoria, vetores e pipeline de renderizacao.',
      'Bom destaque para computacao grafica e programacao de baixo nivel.'
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Ray-Tracing-in-C', kind: 'github' }]
  }
];
