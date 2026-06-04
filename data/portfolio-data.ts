import type { SiteLocale } from '@/components/language-provider';

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
  highlight?: {
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  };
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
  badge: 'portfolio' | 'projeto real' | 'real project';
  image?: {
    src: string;
    alt: string;
  };
  details: string[];
  links: ProjectLink[];
};

type PortfolioContent = {
  skillGroups: SkillGroup[];
  spokenLanguages: string[];
  timelineEntries: TimelineEntry[];
  projects: ProjectItem[];
};

const portfolioContent: Record<SiteLocale, PortfolioContent> = {
  pt: {
    skillGroups: [
      { title: 'Core stack', items: ['Node.js', 'Angular', 'React', 'Java', 'Spring Boot'] },
      { title: 'Linguagens', items: ['C', 'C++', 'TypeScript / JavaScript'] },
      { title: 'Ferramentas de automação', items: ['Python', 'SQL', 'Shell'] }
    ],
    spokenLanguages: ['Inglês (C1 - EFSET)', 'Francês (básico)', 'Espanhol (básico)'],
    timelineEntries: [
      {
        id: 'education-unipaulistana',
        kind: 'education',
        period: '2022 - 2025',
        title: 'Análise e Desenvolvimento de Sistemas',
        organization: 'Centro Universitário Paulistano',
        location: 'São Paulo, Brasil',
        summary: 'Graduação orientada a desenvolvimento de software, fundamentos de computação e resolução estruturada de problemas.',
        tags: ['Java', 'POO', 'Estruturas de Dados', 'SQL'],
        bullets: [
          'Formação superior em Análise e Desenvolvimento de Sistemas.',
          'Base acadêmica em programação orientada a objetos, estruturas de dados, banco de dados e arquitetura de software.',
          'Contato contínuo com projetos práticos e fundamentos aplicados à engenharia de produto.'
        ],
        highlight: {
          title: 'Palestra certificada em IA aplicada',
          description:
            'Apresentei uma palestra sobre comparações de métodos de aprendizado não supervisionado para detecção de fraude em notas fiscais, experiência que me rendeu certificado pelo congresso da Unipaulistana.',
          image: {
            src: '/projects/unipaulistana-certificate.png',
            alt: 'Certificado da palestra sobre métodos de aprendizado não supervisionado para detecção de fraude em notas fiscais'
          }
        }
      },
      {
        id: 'experience-music-go',
        kind: 'experience',
        period: 'set 2023 - nov 2023',
        title: 'Desenvolvedor Front-End',
        organization: 'Music.go',
        location: 'Remoto / Freelancer',
        summary: 'Atuação freelancer com foco em front-end responsivo, animações e melhoria de performance da aplicação.',
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
        summary: 'Apoio acadêmico em Java para mais de 40 alunos, com foco em POO, exercícios práticos e evolução de desempenho.',
        tags: ['Java', 'POO', 'Estruturas de Dados'],
        bullets: [
          'Apoio a mais de 40 alunos no aprendizado de POO em Java, contribuindo para uma melhora média de 15% nas notas finais.',
          'Auxiliei na resolução de exercícios e projetos, ajudando a reduzir em 10% a taxa de reprovação da disciplina.',
          'Produzi materiais de apoio e resumos teóricos, otimizando o estudo individual dos alunos fora da sala de aula.'
        ]
      }
    ],
    projects: [
      {
        id: 'project-cedro-rosa',
        title: 'Desenvolvedor para Cedro Rosa',
        summary: 'Participação em projeto real publicado, com foco em entrega funcional, experiência digital e ambiente de produção.',
        stack: ['Projeto real', 'Front-end', 'Entrega em produção'],
        badge: 'projeto real',
        image: { src: '/projects/cedro-rosa.png', alt: 'Página inicial do projeto Cedro Rosa' },
        details: [
          'Projeto real publicado e acessível online.',
          'Incluído no portfólio como evidência concreta de entrega em ambiente de produção.',
          'Demonstra capacidade de trabalhar em contexto aplicado, com foco em execução e consistência visual.'
        ],
        links: [{ label: 'Visitar site', href: 'https://cedrorosamusica.online/musicas/', kind: 'live' }]
      },
      {
        id: 'project-tetris',
        title: 'Tetris',
        summary: 'Versão autoral do clássico desenvolvida com foco em gameplay, organização de lógica e experiência visual.',
        stack: ['Game Dev', 'Frontend', 'Lógica'],
        badge: 'portfolio',
        image: { src: '/projects/tetris.png', alt: 'Tela do projeto Tetris desenvolvido para o portfólio' },
        details: [
          'Projeto próprio voltado a gameplay, controle de estado e refinamento da experiência do usuário.',
          'Estrutura pensada para suportar demonstração integrada no próprio portfólio.',
          'Combina apelo visual, lógica de jogo e apresentação técnica em um projeto autoral.'
        ],
        links: [{ label: 'Jogar no site', href: '/projects/tetris', kind: 'demo' }]
      },
      {
        id: 'project-price-alert',
        title: 'Sistema de Alerta de Preço',
        summary: 'Plataforma de alertas com conta persistida no navegador, monitoramento visual e catálogo mock integrado a múltiplos sites.',
        stack: ['Monitoring', 'Automation', 'Alerts'],
        badge: 'portfolio',
        image: { src: '/projects/price-alert.png', alt: 'Painel do Sistema de Alerta de Preço' },
        details: [
          'Demo com criação de conta, persistência local e alertas personalizados por produto.',
          'Painel visual para acompanhar preços de sites como Amazon, Google Shopping, Mercado Livre e KaBuM!.',
          'Projeto pensado para representar um produto digital com boa apresentação visual e estrutura funcional.'
        ],
        links: [{ label: 'Abrir demo', href: '/projects/price-alert', kind: 'demo' }]
      },
      {
        id: 'project-lol-api',
        title: 'API LOL Matchup Analyzer',
        summary: 'Aplicação com backend Node.js + Express e frontend Angular para analisar matchups exatos de Top Lane usando a Riot API.',
        stack: ['Node.js', 'Express', 'Angular', 'Riot API', 'Analytics'],
        badge: 'portfolio',
        image: { src: '/projects/lol-api.png', alt: 'Interface do projeto API LOL Matchup Analyzer' },
        details: [
          'Consulta a Riot API para localizar a conta, buscar partidas recentes e filtrar matchups exatos na Top Lane.',
          'Calcula winrate do matchup, gold diff, cs diff e xp diff aos 10 e 15 minutos, além de risco de gank e resumo de build, runas e combate.',
          'Arquitetura separada em backend Node.js + Express e frontend Angular, com cache em memória para acelerar consultas repetidas.',
          'Projeto relevante para demonstrar integração com API externa, processamento de dados e transformação de métricas em produto utilizável.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/API-LOL', kind: 'github' }]
      },
      {
        id: 'project-taskflow',
        title: 'TaskFlow',
        summary: 'Plataforma Kanban full-stack para equipes, estruturada como monorepo com backend Spring Boot e frontend Angular.',
        stack: ['Spring Boot', 'Angular', 'PostgreSQL', 'Docker', 'WebSockets'],
        badge: 'portfolio',
        image: { src: '/projects/taskflow.png', alt: 'Painel do TaskFlow Kanban Board' },
        details: [
          'Autenticação JWT segura com suporte a refresh tokens e controle de acesso baseado em cargos (Admin/Membro).',
          'Comunicação em tempo real via WebSockets (STOMP/SockJS) para atualização dinâmica do quadro Kanban entre usuários.',
          'Persistência robusta com PostgreSQL estruturada com Spring Data JPA e histórico de registros por logs de auditoria.',
          'Ambiente local simplificado usando Docker Compose para subir a API Java 21, o app Angular 18 e o banco de dados.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/TaskFlow', kind: 'github' }]
      },
      {
        id: 'project-rastreador-nf',
        title: 'Rastreador de NF',
        summary: 'Ferramenta voltada ao acompanhamento e à organização de notas fiscais, com fluxo orientado à automação.',
        stack: ['Automation', 'Tracking', 'Back-end'],
        badge: 'portfolio',
        details: [
          'Projeto focado em rastreio de notas fiscais e centralização de acompanhamento operacional.',
          'Envolve lógica de consulta, tratamento de dados e organização de informações para uso prático.',
          'Estrutura pronta para evoluir com integrações e visual dedicado sem alterar a proposta funcional.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Rastreador-de-NF', kind: 'github' }]
      },
      {
        id: 'project-flappy-bird-neat',
        title: 'Automatizador de Flappy Bird',
        summary: 'Experimento em que o jogo aprende a se jogar sozinho com rede neural NEAT e evolução por gerações.',
        stack: ['Python', 'NEAT', 'Neural Networks'],
        badge: 'portfolio',
        image: { src: '/projects/flappy-bird-neat.jpg', alt: 'Treinamento do Flappy Bird com rede neural NEAT' },
        details: [
          'Aplicação que combina jogo, algoritmo genético e rede neural NEAT para aprendizado automático.',
          'Exige entendimento de fitness, gerações, ajuste de parâmetros e integração com a simulação do jogo.',
          'Projeto forte para evidenciar interesse por IA aplicada, experimentação e raciocínio evolutivo.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/ML-com-Flappy-Bird', kind: 'github' }]
      },
      {
        id: 'project-ray-tracer',
        title: 'Ray Tracer em C',
        summary: 'Projeto de computação gráfica para estudo de iluminação, materiais, câmera e renderização em baixo nível.',
        stack: ['C', 'Computer Graphics', 'Rendering'],
        badge: 'portfolio',
        image: { src: '/projects/ray-tracer.jpg', alt: 'Cena renderizada do projeto Ray Tracer em C' },
        details: [
          'Implementação de ray tracing em C com foco em fundamentos de luz, sombra, reflexão e materiais.',
          'Projeto mais técnico e matemático, exigindo controle de memória, vetores e pipeline de renderização.',
          'Destaque consistente para computação gráfica e programação de baixo nível.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Ray-Tracing-in-C', kind: 'github' }]
      }
    ]
  },
  en: {
    skillGroups: [
      { title: 'Core stack', items: ['Node.js', 'Angular', 'React', 'Java', 'Spring Boot'] },
      { title: 'Languages', items: ['C', 'C++', 'TypeScript / JavaScript'] },
      { title: 'Automation tools', items: ['Python', 'SQL', 'Shell'] }
    ],
    spokenLanguages: ['English (C1 - EFSET)', 'French (basic)', 'Spanish (basic)'],
    timelineEntries: [
      {
        id: 'education-unipaulistana',
        kind: 'education',
        period: '2022 - 2025',
        title: 'Systems Analysis and Development',
        organization: 'Centro Universitário Paulistano',
        location: 'São Paulo, Brazil',
        summary: 'Degree focused on software development, computing fundamentals and structured problem solving.',
        tags: ['Java', 'OOP', 'Data Structures', 'SQL'],
        bullets: [
          'Undergraduate degree in Systems Analysis and Development.',
          'Academic foundation in object-oriented programming, data structures, databases and software architecture.',
          'Continuous exposure to hands-on projects and product engineering fundamentals.'
        ],
        highlight: {
          title: 'Certified presentation on applied AI',
          description:
            'I delivered a presentation comparing unsupervised learning methods for invoice fraud detection, an academic talk that also earned me an institutional certificate at the Unipaulistana conference.',
          image: {
            src: '/projects/unipaulistana-certificate.png',
            alt: 'Certificate for the presentation on unsupervised learning methods for invoice fraud detection'
          }
        }
      },
      {
        id: 'experience-music-go',
        kind: 'experience',
        period: 'Sep 2023 - Nov 2023',
        title: 'Front-End Developer',
        organization: 'Music.go',
        location: 'Remote / Freelance',
        summary: 'Freelance work focused on responsive front-end delivery, animations and application performance improvements.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub', 'SOLID'],
        bullets: [
          'Developed animations and implemented the application front-end.',
          'Built responsive interfaces with HTML, CSS, JavaScript and React, reducing average screen load time by 40% (0.4s).',
          'Applied SOLID principles and Git version control, helping reduce production bugs by 5%.',
          'Collaborated in daily meetings to keep visual consistency between prototypes and the final product.'
        ]
      },
      {
        id: 'experience-monitoria-java',
        kind: 'experience',
        period: 'Aug 2025 - Present',
        title: 'Teaching Assistant - Object-Oriented Programming (Java)',
        organization: 'Centro Universitário Paulistano',
        location: 'São Paulo, Brazil',
        summary: 'Academic support in Java for more than 40 students, focused on OOP, practical exercises and learning outcomes.',
        tags: ['Java', 'OOP', 'Data Structures'],
        bullets: [
          'Supported more than 40 students in learning Java OOP, contributing to an average 15% improvement in final grades.',
          'Helped with exercises and projects, contributing to a 10% reduction in course failure rate.',
          'Produced study materials and theoretical summaries to improve independent learning outside the classroom.'
        ]
      }
    ],
    projects: [
      {
        id: 'project-cedro-rosa',
        title: 'Developer for Cedro Rosa',
        summary: 'Contribution to a live production project focused on functional delivery, digital experience and real-world execution.',
        stack: ['Real project', 'Front-end', 'Production delivery'],
        badge: 'real project',
        image: { src: '/projects/cedro-rosa.png', alt: 'Cedro Rosa homepage' },
        details: [
          'Real project published and accessible online.',
          'Included in the portfolio as concrete evidence of production delivery.',
          'Shows the ability to work in applied business contexts with execution quality and visual consistency.'
        ],
        links: [{ label: 'Visit website', href: 'https://cedrorosamusica.online/musicas/', kind: 'live' }]
      },
      {
        id: 'project-tetris',
        title: 'Tetris',
        summary: 'Original take on the classic game built around gameplay, logic organization and polished visual presentation.',
        stack: ['Game Dev', 'Frontend', 'Logic'],
        badge: 'portfolio',
        image: { src: '/projects/tetris.png', alt: 'Tetris project screen' },
        details: [
          'Personal project focused on gameplay systems, state control and user experience refinement.',
          'Structured to support an integrated playable demo inside the portfolio.',
          'Combines visual appeal, game logic and technical presentation in a single project.'
        ],
        links: [{ label: 'Play on site', href: '/projects/tetris', kind: 'demo' }]
      },
      {
        id: 'project-price-alert',
        title: 'Price Alert System',
        summary: 'Alert platform with browser-persisted accounts, visual monitoring and a mock catalog connected to multiple marketplaces.',
        stack: ['Monitoring', 'Automation', 'Alerts'],
        badge: 'portfolio',
        image: { src: '/projects/price-alert.png', alt: 'Price Alert System dashboard' },
        details: [
          'Demo with account creation, local persistence and product-specific custom alerts.',
          'Visual dashboard to monitor prices from Amazon, Google Shopping, Mercado Livre and KaBuM!.',
          'Designed to present a product-like experience with strong UI and a functional structure.'
        ],
        links: [{ label: 'Open demo', href: '/projects/price-alert', kind: 'demo' }]
      },
      {
        id: 'project-lol-api',
        title: 'LOL Matchup Analyzer API',
        summary: 'Node.js + Express backend and Angular frontend for analyzing exact Top Lane matchups through the Riot API.',
        stack: ['Node.js', 'Express', 'Angular', 'Riot API', 'Analytics'],
        badge: 'portfolio',
        image: { src: '/projects/lol-api.png', alt: 'LOL Matchup Analyzer interface' },
        details: [
          'Uses the Riot API to locate an account, fetch recent matches and filter exact Top Lane matchups.',
          'Calculates matchup win rate, gold diff, CS diff and XP diff at 10 and 15 minutes, plus gank pressure and build/rune summaries.',
          'Current architecture separates a Node.js + Express backend from an Angular frontend, with in-memory caching for repeated lookups.',
          'Strong project to demonstrate external API integration, match data processing and turning metrics into a usable product.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/API-LOL', kind: 'github' }]
      },
      {
        id: 'project-taskflow',
        title: 'TaskFlow',
        summary: 'Full-stack Kanban platform for teams, built as a monorepo with Spring Boot and Angular.',
        stack: ['Spring Boot', 'Angular', 'PostgreSQL', 'Docker', 'WebSockets'],
        badge: 'portfolio',
        image: { src: '/projects/taskflow.png', alt: 'TaskFlow Kanban board dashboard' },
        details: [
          'Secure JWT authentication with refresh token support and role-based access control (Admin/Member).',
          'Real-time communication using WebSockets (STOMP/SockJS) for dynamic Kanban board updates across users.',
          'Robust persistence with PostgreSQL integrated via Spring Data JPA and tracking through audit logs.',
          'Simplified local setup using Docker Compose to spin up the Java 21 API, Angular 18 app, and database.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/TaskFlow', kind: 'github' }]
      },
      {
        id: 'project-rastreador-nf',
        title: 'Invoice Tracker',
        summary: 'Tool focused on monitoring and organizing invoices through an automation-oriented workflow.',
        stack: ['Automation', 'Tracking', 'Back-end'],
        badge: 'portfolio',
        details: [
          'Project focused on invoice tracking and centralized operational monitoring.',
          'Involves query logic, data handling and information structuring for practical use.',
          'Ready to evolve with integrations and dedicated visuals without changing its functional proposal.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Rastreador-de-NF', kind: 'github' }]
      },
      {
        id: 'project-flappy-bird-neat',
        title: 'Flappy Bird Automation',
        summary: 'Experiment where the game learns to play itself using NEAT neural networks and generation-based evolution.',
        stack: ['Python', 'NEAT', 'Neural Networks'],
        badge: 'portfolio',
        image: { src: '/projects/flappy-bird-neat.jpg', alt: 'Flappy Bird training with NEAT neural network' },
        details: [
          'Application combining a game loop, genetic algorithm and NEAT neural network for autonomous learning.',
          'Requires understanding of fitness, generations, parameter tuning and integration with the game simulation.',
          'Strong project to showcase interest in applied AI, experimentation and evolutionary reasoning.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/ML-com-Flappy-Bird', kind: 'github' }]
      },
      {
        id: 'project-ray-tracer',
        title: 'Ray Tracer in C',
        summary: 'Computer graphics project focused on lighting, materials, camera systems and low-level rendering.',
        stack: ['C', 'Computer Graphics', 'Rendering'],
        badge: 'portfolio',
        image: { src: '/projects/ray-tracer.jpg', alt: 'Rendered scene from the Ray Tracer in C project' },
        details: [
          'Ray tracing implementation in C focused on light, shadow, reflection and material fundamentals.',
          'More technical and math-heavy project requiring memory control, vector math and rendering pipeline understanding.',
          'Consistent highlight for computer graphics and low-level programming.'
        ],
        links: [{ label: 'GitHub', href: 'https://github.com/Keymiuz/Ray-Tracing-in-C', kind: 'github' }]
      }
    ]
  }
};

export function getPortfolioContent(locale: SiteLocale) {
  return portfolioContent[locale];
}
