export const projects = [
  {
    id: "inninginsights",
    title: "InningInsights",
    description: "A full-stack web application designed for predicting IPL match scores and winners using Machine Learning, providing live predictions and real-time updates to users.",
    longDescription: "InningInsights is a comprehensive cricket analytics platform that leverages machine learning to predict match outcomes and player performances. The application provides real-time updates during matches and offers detailed statistical analysis for cricket enthusiasts.",
    image: "https://lh3.googleusercontent.com/gg-dl/AJfQ9KRUSjFMI3BeCXT31FK2YhOGwAqF8YtW2VfG8P-TO0OLCXipQQ-KpLdjk6JV3N1ZI6BYO7m6pe6TbYF0ke2xlmPlu_E9RDXZGQb5p5S40xQogrqlII0a4_MGT1dKniHVXmBqhjStV6KsMw5yr9xBLE8K1pv35M8goJb7MS_1L0YSv3TEiw=s1024?text=InningInsights",
    tags: ["React.js", "Node.js", "Express.js", "Python", "PostgreSQL", "Docker"],
    features: [
      "Developed a full-stack web application for predicting IPL match scores and winners",
      "Engineered a modern, responsive frontend with Next.js (React)",
      "Built a scalable backend API using Node.js and Express.js",
      "Implemented a dedicated Python-based ML service for data processing and prediction",
      "Utilized Docker for containerization and established CI/CD pipelines"
    ],
    technologies: ["Next.js", "Node.js", "Express.js", "Python", "PostgreSQL", "Prisma", "Docker"],
    challenges: "One of the main challenges was ensuring accurate real-time predictions during live matches. We solved this by implementing an efficient data pipeline that processes incoming match data and updates predictions with minimal latency.",
    source_code_link: "https://github.com/yashahuja31/inninginsights",
    live_demo_link: "https://inninginsights.vercel.app"
  },
  {
    id: "readerreviews",
    title: "ReaderReviews Hub",
    description: "A MERN stack application managing over 1000 book reviews, featuring secure user authentication and high-performance RESTful APIs for efficient data retrieval.",
    longDescription: "ReaderReviews Hub is a comprehensive platform for book enthusiasts to discover, review, and discuss their favorite books. The application features a robust review system, personalized recommendations, and community engagement tools.",
    image: "https://lh3.googleusercontent.com/gg-dl/AJfQ9KRvAjqZiOSRJ2KEJzzuSNbDBWplcLcYZ22JykKTsMbWT6TeLQFWuSmfmuBxeFsu3CVwL-XqShnRR8tcFvNpYsCZmO7f5t7xjo4USPiKVNiStuEk43XLeg9eExkIpaD8J2aDijxP7dIWNu1-bwazVqv84qEZDzFQsLVwueHAQMIrw3Sd=s1024?text=ReaderReviews",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    features: [
      "Developed a full-stack MERN application managing over 1000+ book reviews",
      "Implemented secure user authentication using JWT and Bcrypt",
      "Designed high-performance RESTful APIs for efficient data retrieval",
      "Managed MongoDB data persistence with automated rating updates",
      "Created an intuitive user interface for browsing and reviewing books"
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Bcrypt", "Axios"],
    challenges: "Managing complex data relationships between users, books, and reviews while ensuring optimal database performance was challenging. We implemented efficient indexing strategies and query optimization to maintain fast response times even with large datasets.",
    source_code_link: "https://github.com/yashahuja31/readerreviews",
    live_demo_link: "https://readerreviews.herokuapp.com"
  },
  {
    id: "chessy",
    title: "Chessy",
    description: "A multiplayer Chess Web Application with real-time communication, supporting interactive gameplay and advanced game analysis for ELO improvement.",
    longDescription: "Chessy is an interactive chess platform that allows players to compete in real-time matches, analyze their games, and improve their skills. The application features a sophisticated chess engine, match history tracking, and performance analytics.",
    image: "https://lh3.googleusercontent.com/gg-dl/AJfQ9KSol78BmQB4V3yBXCb5FAaVVECWgk4BnLhsCGvW8ecnGq-cmStiXRMc_4kMCPuW8op36aGg4hLyrLTWAefDbbFc7VbcnuQMBFNkNLaih6BEsx9uc9FlzgaUtCldhp-ywnC9MU6yDLCHdc8JT72etTv7NTmTdq8MuuGm1HSTvwfHC9PSIA=s1024?text=Chessy",
    tags: ["HTML", "TailwindCSS", "JavaScript", "Socket.io"],
    features: [
      "Engineered a multiplayer Chess Web Application with real-time communication",
      "Integrated chess.js and stockfish.js for core game logic and advanced game analysis",
      "Developed a responsive UI using Tailwind CSS, enhancing user experience",
      "Implemented real-time gameplay using Socket.io for seamless multiplayer experience"
    ],    
    technologies: ["HTML", "TailwindCSS", "JavaScript", "chess.js", "stockfish.js", "Socket.io"],
    challenges: "Implementing real-time multiplayer functionality while ensuring game state consistency across different clients was a significant challenge. We solved this by using Socket.io for reliable WebSocket connections and implementing a robust state synchronization mechanism.",
    source_code_link: "https://github.com/yashahuja31/chessy",
    live_demo_link: "https://chessy-game.netlify.app"
  },
  {
    id: "hospitease",
    title: "HospitEase",
    description: "A hospital management system built with Python and MySQL that tracks and manages details of rooms, patients, doctors, and more.",
    longDescription: "HospitEase (MediTrack) is a comprehensive hospital management platform that efficiently tracks and manages all aspects of hospital operations, from patient records to room availability and doctor schedules.",
    image: "https://via.placeholder.com/800x600?text=HospitEase",
    tags: ["Python", "MySQL", "Matplotlib"],
    features: [
      "Developed a platform that tracks and manages details of rooms, patients, doctors, etc.",
      "Implemented database management using MySQL for efficient data storage and retrieval",
      "Created data visualization components using Matplotlib for analytics and reporting",
      "Currently developing a React.js frontend to provide online access for users"
    ],
    technologies: ["Python", "MySQL", "Matplotlib", "React.js (in progress)"],
    challenges: "Managing complex relationships between different hospital entities while ensuring data integrity and security was challenging. We implemented a robust database schema with appropriate constraints and relationships to maintain data consistency.",
    source_code_link: "https://github.com/yourusername/hospitease",
    live_demo_link: ""
  },
  {
    id: "schoolmate",
    title: "SchoolMate",
    description: "An intuitive platform for students and teachers to connect, communicate and collaborate effortlessly within educational institutions.",
    longDescription: "SchoolMate is a comprehensive educational platform designed exclusively for internal use within specific university or school communities, ensuring privacy and relevance for all users.",
    image: "https://via.placeholder.com/800x600?text=SchoolMate",
    tags: ["JavaScript", "React.js", "Python", "MySQL"],
    features: [
      "Created an intuitive platform for students and teachers to connect, communicate and collaborate",
      "Implemented backend functionality using Python with MySQL for database management",
      "Designed with privacy in mind, exclusively for internal use within specific educational institutions",
      "Currently developing the frontend using React.js for a modern, responsive user interface"
    ],
    technologies: ["JavaScript", "React.js", "Python", "MySQL"],
    challenges: "Balancing the needs of different user types (students, teachers, administrators) while maintaining a cohesive and intuitive interface was a significant challenge. We addressed this through careful user research and iterative design processes.",
    source_code_link: "https://github.com/yourusername/schoolmate",
    live_demo_link: ""
  }
];

export const skills = [
  {
    name: "Languages",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    ]
  },
  {
    name: "Frameworks/Libraries",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
      { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" }
    ]
  },
  {
    name: "Databases",
    items: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  },
  {
    name: "Tools & Platforms",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "IntelliJ IDEA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
    ]
  },
  {
    name: "Concepts",
    items: [
      { name: "RESTful APIs", icon: "https://via.placeholder.com/50?text=REST" },
      { name: "Authentication", icon: "https://via.placeholder.com/50?text=Auth" },
      { name: "Data Structures", icon: "https://via.placeholder.com/50?text=DS" },
      { name: "Algorithms", icon: "https://via.placeholder.com/50?text=Algo" },
      { name: "Performance Optimization", icon: "https://via.placeholder.com/50?text=Perf" }
    ]
  }
];