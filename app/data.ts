export const socials = {
  github: 'https://github.com/bhavi834',
  linkedin: 'https://www.linkedin.com/in/bhavya-chauhan-b8997b286/',
  email: 'bhavyachauhan3112@gmail.com',
};
type Skill = { name: string; icon?: string };
type Project = { title: string; category: string; description: string; stack: Skill[]; note: string; visualLabel: string; repo?: string; demo?: string; image?: string };
export const projects: Project[] = [
  { title: 'PPE Detection Kit', category: 'COMPUTER VISION', description: 'A real-time safety monitoring system that uses YOLO and OpenCV to detect helmets, safety vests and other protective equipment in live video feeds, and flag PPE violations.', stack: [{ name: 'Python', icon: 'python' }, { name: 'PyTorch', icon: 'pytorch' }, { name: 'OpenCV', icon: 'opencv' }, { name: 'YOLO' }], note: 'Real-time detection', visualLabel: 'VISION / DETECTION' },
  { title: 'Paw Patrol', category: 'FULL-STACK DEVELOPMENT', description: 'A pet-care platform for adoption, fostering, services and supplies. Built with secure authentication, role-based access and structured database management.', stack: [{ name: 'PHP', icon: 'php' }, { name: 'JavaScript', icon: 'javascript' }, { name: 'MySQL', icon: 'mysql' }], note: 'Pet care, connected', visualLabel: 'CARE / CONNECTION' },
  { title: 'AlertLens', category: 'INCIDENT INTELLIGENCE', description: 'A system that groups and analyzes alerts to identify important issues, prioritize incidents and streamline response. Awarded second place at a hackathon.', stack: [{ name: 'Alert analysis' }, { name: 'Incident response' }], note: 'Hackathon runner-up', visualLabel: 'SIGNAL / CLARITY' },
];
export const skillGroups: { title: string; skills: Skill[] }[] = [
  { title: 'Languages & data', skills: [{ name: 'Python', icon: 'python' }, { name: 'C++', icon: 'cplusplus' }, { name: 'C', icon: 'c' }, { name: 'SQL', icon: 'mysql' }, { name: 'NumPy', icon: 'numpy' }, { name: 'Pandas', icon: 'pandas' }, { name: 'PySpark', icon: 'apachespark' }] },
  { title: 'Web & systems', skills: [{ name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'nextjs' }, { name: 'Laravel', icon: 'laravel' }, { name: 'FastAPI', icon: 'fastapi' }, { name: 'Flask', icon: 'flask' }, { name: 'Git', icon: 'git' }, { name: 'Linux', icon: 'linux' }, { name: 'SAP ABAP' }] },
  { title: 'AI & machine learning', skills: [{ name: 'PyTorch', icon: 'pytorch' }, { name: 'OpenCV', icon: 'opencv' }, { name: 'Deep learning' }, { name: 'Computer vision' }, { name: 'NLP' }, { name: 'LLMs & RAG' }, { name: 'Explainable AI' }] },
  { title: 'Foundations', skills: [{ name: 'Data structures & algorithms' }, { name: 'OOP' }, { name: 'DBMS' }, { name: 'Operating systems' }, { name: 'Computer networks' }] },
];
