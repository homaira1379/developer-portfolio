import { useState } from 'react';
import { Github, Linkedin, Mail, Star, Code2, Palette } from 'lucide-react';

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-purple-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Homaira Yousufi</h1>
        <ul className="flex gap-6">
          <li className="hover:text-pink-300 cursor-pointer transition">Home</li>
          <li className="hover:text-pink-300 cursor-pointer transition">About</li>
          <li className="hover:text-pink-300 cursor-pointer transition">Projects</li>
          <li className="hover:text-pink-300 cursor-pointer transition">Contact</li>
        </ul>
      </div>
    </nav>
  );
}

// Header Component
function Header({ message }) {
  const quotes = [
    "Code is poetry written in logic.",
    "Every expert was once a beginner.",
    "The best way to predict the future is to create it.",
    "Technology is best when it brings people together.",
    "Dream big, code bigger.",
    "Learn, build, inspire, repeat."
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Homaira Yousufi</h1>
      <p className="text-xl mb-4">{message}</p>
      <p className="text-lg italic opacity-90">"{randomQuote}"</p>
    </header>
  );
}

// Profile Component
function Profile({ title, bio }) {
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-8">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
            HY
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2 text-purple-900">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>
      </div>
    </section>
  );
}

// About Component
function About() {
  const [showMore, setShowMore] = useState(false);
  
  const hobbies = [
    "Learning new languages and exploring different cultures",
    "Reading motivational books",
    "Designing visuals and working on creative projects",
    "Teaching and helping others learn technology"
  ];
  
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-900">About Me</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-gray-700 mb-4 leading-relaxed">
          I'm a passionate Computer Science student from Afghanistan who enjoys building creative 
          and user-friendly websites. I love combining design and technology to create digital 
          experiences that make people's lives easier.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Currently, I'm diving deep into <span className="font-semibold text-purple-700">JavaScript, 
          React.js, and Django</span> for web development. My goal is to become a professional 
          full-stack developer and contribute to innovative projects that solve real-world problems 
          and support digital transformation in education.
        </p>
        
        {showMore && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3 text-purple-800 flex items-center gap-2">
              <Palette size={24} />
              Fun Facts & Hobbies
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
}

// ProjectCard Component
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center text-white">
        <Code2 size={80} strokeWidth={1.5} />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h3 className="text-2xl font-bold text-purple-900">{project.name}</h3>
          {project.featured && (
            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
              <Star size={16} fill="currentColor" />
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition shadow-md"
          >
            View Live
          </a>
        ) : (
          <span className="inline-block bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm">
            Local Demo
          </span>
        )}
      </div>
    </div>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      name: "Online Book Store",
      description: "A desktop application where users can browse, search, and purchase books with user accounts, inventory control, and order tracking.",
      techStack: ["Python", "MySQL", "Tkinter"],
      featured: true,
      liveLink: ""
    },
    {
      name: "School Management System",
      description: "Web app to manage students, teachers, classes, and attendance. It includes dashboards, CRUD operations, and role-based access.",
      techStack: ["Django", "HTML", "CSS", "JavaScript"],
      featured: true,
      liveLink: ""
    },
    {
      name: "Invoice & Client Management App",
      description: "A responsive web app for freelancers to maintain client lists, generate invoices, and see payment statuses.",
      techStack: ["HTML", "CSS", "JavaScript"],
      featured: false,
      liveLink: "https://homaira1379.github.io/five/"
    },
    {
      name: "Employee Payroll System",
      description: "A system to manage employee data, payroll processing, and HR tasks, with support for multiple roles (Admin, HR, Finance).",
      techStack: ["Django", "HTML", "CSS", "Bootstrap"],
      featured: false,
      liveLink: ""
    }
  ];
  
  return (
    <section className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-purple-900">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const socialLinks = [
    { 
      icon: Github, 
      url: "https://github.com/homaira1379", 
      label: "GitHub" 
    },
    { 
      icon: Linkedin, 
      url: "https://linkedin.com/in/homaira-yousufi-6983311b5", 
      label: "LinkedIn" 
    },
    { 
      icon: Mail, 
      url: "mailto:humaira.yousufi@gmail.com", 
      label: "Email" 
    }
  ];
  
  return (
    <footer className="bg-purple-900 text-white py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition transform hover:scale-110"
                aria-label={social.label}
              >
                <Icon size={28} />
              </a>
            );
          })}
        </div>
        <p className="text-purple-200">
          © {new Date().getFullYear()} Homaira Yousufi. All rights reserved.
        </p>
        <p className="text-purple-300 text-sm mt-2">
          Built with React & Passion 💜
        </p>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      <Header message="Welcome to my developer journey!" />
      <Profile
        title="Frontend Developer"
        bio="I'm a passionate Computer Science student from Afghanistan who enjoys building creative and user-friendly websites. I love combining design and technology to create digital experiences that make people's lives easier."
      />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}