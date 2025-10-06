import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Star, Code2, Palette, Moon, Sun, Check } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'ocean'];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  const bgClass = theme === 'dark' ? 'bg-gray-900' : theme === 'ocean' ? 'bg-gradient-to-b from-blue-900 to-teal-900' : 'bg-gradient-to-b from-purple-50 to-pink-50';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <Navbar theme={theme} cycleTheme={cycleTheme} />
      <Header theme={theme} />
      <Profile theme={theme} />
      <About theme={theme} />
      <Skills theme={theme} />
      <Projects theme={theme} />
      <ContactForm theme={theme} />
      <FeedbackWall theme={theme} />
      <ProjectUpdates theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

function Navbar({ theme, cycleTheme }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-blue-800' : 'bg-purple-900';

  return (
    <nav className={`${navBg} text-white p-4 sticky top-0 z-50 shadow-lg relative`}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: '3px', width: `${scrollProgress}%`, backgroundColor: '#ec4899' }}></div>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Homaira Yousufi</h1>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li className="hover:text-pink-300 cursor-pointer transition">Home</li>
            <li className="hover:text-pink-300 cursor-pointer transition">About</li>
            <li className="hover:text-pink-300 cursor-pointer transition">Projects</li>
            <li className="hover:text-pink-300 cursor-pointer transition">Contact</li>
          </ul>
          <button onClick={cycleTheme} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
            {theme === 'light' ? <Moon size={20} /> : theme === 'dark' ? <Sun size={20} /> : <span>🌊</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Header({ theme }) {
  const [displayedText, setDisplayedText] = useState('');
  const quote = "Every expert was once a beginner.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= quote.length) {
        setDisplayedText(quote.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const headerBg = theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-800' : theme === 'ocean' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700';

  return (
    <header className={`${headerBg} text-white py-20 text-center`}>
      <h1 className="text-5xl font-bold mb-4">Homaira Yousufi</h1>
      <p className="text-xl mb-4">Welcome to my developer journey!</p>
      <p className="text-lg italic opacity-90 min-h-8">"{displayedText}<span className="animate-pulse">|</span>"</p>
    </header>
  );
}

function Profile({ theme }) {
  const [avatarExpression, setAvatarExpression] = useState('HY');

  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'ocean' ? 'bg-teal-800 text-white' : 'bg-white';
  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-purple-300' : 'text-purple-900';
  const textColor = theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-700';

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <div className={`flex flex-col md:flex-row items-center gap-8 ${cardBg} rounded-lg shadow-lg p-8`}>
        <div 
          className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => setAvatarExpression('😊')}
          onMouseLeave={() => setAvatarExpression('HY')}
          onClick={() => setAvatarExpression(prev => prev === '😊' ? '🎉' : '😊')}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
            {avatarExpression}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className={`text-3xl font-bold mb-2 ${titleColor}`}>Frontend Developer</h2>
          <p className={textColor}>I'm a passionate Computer Science student from Afghanistan who enjoys building creative and user-friendly websites.</p>
        </div>
      </div>
    </section>
  );
}

function Skills({ theme }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skills = [
    { name: 'React', level: 75, fact: 'Building amazing UIs!' },
    { name: 'JavaScript', level: 80, fact: 'The language of the web!' },
    { name: 'Python', level: 85, fact: 'My first love in coding!' },
    { name: 'Django', level: 70, fact: 'Backend powerhouse!' },
    { name: 'HTML/CSS', level: 90, fact: 'Foundation of the web!' }
  ];

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';
  const barBg = theme === 'dark' ? 'bg-gray-700' : theme === 'ocean' ? 'bg-teal-900' : 'bg-gray-200';

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>Skills</h2>
      <div className={`${cardBg} rounded-lg shadow-lg p-8 space-y-6`}>
        {skills.map((skill, i) => (
          <div key={i} onMouseEnter={() => setHoveredSkill(i)} onMouseLeave={() => setHoveredSkill(null)} className="relative">
            <div className="flex justify-between mb-2">
              <span className={`font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-800'}`}>{skill.name}</span>
              <span className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>{skill.level}%</span>
            </div>
            <div className={`h-3 ${barBg} rounded-full overflow-hidden`}>
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
            </div>
            {hoveredSkill === i && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                {skill.fact}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ theme }) {
  const [showMore, setShowMore] = useState(false);
  
  const hobbies = [
    "Learning new languages and exploring different cultures",
    "Reading motivational books",
    "Designing visuals and working on creative projects",
    "Teaching and helping others learn technology"
  ];

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'ocean' ? 'bg-teal-800 text-white' : 'bg-white';
  const textColor = theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-700';
  
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>About Me</h2>
      <div className={`${cardBg} rounded-lg shadow-lg p-8`}>
        <p className={`mb-4 ${textColor}`}>
          I'm a passionate Computer Science student from Afghanistan who enjoys building creative and user-friendly websites.
        </p>
        <p className={`mb-4 ${textColor}`}>
          Currently learning <span className="font-semibold text-purple-400">JavaScript, React.js, and Django</span>.
        </p>
        {showMore && (
          <div className="mt-4">
            <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' || theme === 'ocean' ? 'text-purple-300' : 'text-purple-800'}`}>
              <Palette size={24} />
              Fun Facts & Hobbies
            </h3>
            <ul className={`list-disc list-inside space-y-2 ${textColor}`}>
              {hobbies.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}
        <button onClick={() => setShowMore(!showMore)} className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition-all">
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
}

function Projects({ theme }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    { name: "Online Book Store", description: "Desktop app for browsing and purchasing books.", techStack: ["Python", "MySQL", "Tkinter"], featured: true, status: "Completed", liveLink: "", details: "Full CRUD operations with inventory management." },
    { name: "School Management System", description: "Web app for managing students and teachers.", techStack: ["Django", "HTML", "CSS", "JavaScript"], featured: true, status: "Completed", liveLink: "", details: "Role-based access and reporting." },
    { name: "Invoice & Client Management", description: "App for managing invoices.", techStack: ["HTML", "CSS", "JavaScript"], featured: false, status: "Live", liveLink: "https://homaira1379.github.io/five/", details: "Invoice generation and tracking." },
    { name: "Employee Payroll System", description: "HR and payroll management.", techStack: ["Django", "HTML", "CSS", "Bootstrap"], featured: false, status: "In Progress", liveLink: "", details: "Salary calculation and payslips." }
  ];

  const allTechs = ['All', ...new Set(projects.flatMap(p => p.techStack))];
  const filteredProjects = selectedFilter === 'All' ? projects : projects.filter(p => p.techStack.includes(selectedFilter));

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';

  return (
    <section className="max-w-6xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>My Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {allTechs.map(tech => (
          <button key={tech} onClick={() => setSelectedFilter(tech)} className={`px-4 py-2 rounded-full transition-all ${selectedFilter === tech ? 'bg-purple-600 text-white scale-105' : theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {tech}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((p, i) => (
          <div key={i} className={`${cardBg} rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
            <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center text-white">
              <Code2 size={80} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className={`text-2xl font-bold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900'}`}>{p.name}</h3>
                {p.featured && <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"><Star size={16} fill="currentColor" />Featured</span>}
                <span className={`px-2 py-1 rounded text-sm ${p.status === 'Completed' ? 'bg-green-100 text-green-800' : p.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{p.status}</span>
              </div>
              <p className={`mb-4 ${theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}`}>{p.description}</p>
              {expandedProject === i && <p className={`mb-4 text-sm ${theme === 'dark' || theme === 'ocean' ? 'text-gray-400' : 'text-gray-500'}`}>{p.details}</p>}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.techStack.map((t, idx) => <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t}</span>)}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setExpandedProject(expandedProject === i ? null : i)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 hover:scale-105 transition">
                  {expandedProject === i ? 'Hide' : 'View'} Details
                </button>
                {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 hover:scale-105 transition">Live</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactForm({ theme }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('contactForm');
    if (saved) {
      setForm(JSON.parse(saved));
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    if (form.name || form.email || form.message) {
      localStorage.setItem('contactForm', JSON.stringify(form));
    }
  }, [form]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrors(e => ({ ...e, email: 'Invalid email' }));
      } else {
        setErrors(e => ({ ...e, email: '' }));
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [form.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.email.trim()) newErrors.email = 'Email required';
    if (!form.message.trim()) newErrors.message = 'Message required';
    
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
      localStorage.removeItem('contactForm');
      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setShowModal(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : '';
  const previewBg = theme === 'dark' ? 'bg-gray-700' : theme === 'ocean' ? 'bg-teal-700' : 'bg-gray-100';

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>Contact Me</h2>
      {showHint && <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded">You have unsaved message data!</div>}
      <form onSubmit={handleSubmit} className={`${cardBg} rounded-lg shadow-lg p-8`}>
        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full px-4 py-2 border rounded ${inputBg}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`w-full px-4 py-2 border rounded ${inputBg}`} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Message</label>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="5" className={`w-full px-4 py-2 border rounded ${inputBg}`}></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <div className={`mb-6 p-4 rounded ${previewBg}`}>
          <h3 className={`font-semibold mb-2 ${theme === 'dark' || theme === 'ocean' ? 'text-white' : ''}`}>Live Preview:</h3>
          <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>Name: {form.name || '...'}</p>
          <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>Email: {form.email || '...'}</p>
          <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>Message: {form.message || '...'}</p>
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 hover:scale-105 transition">Send</button>
      </form>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <Check size={64} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-center">Thank you, {form.name}!</h3>
            <p className="text-gray-600 text-center">Your message was sent.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function FeedbackWall({ theme }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [sort, setSort] = useState('newest');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.comment) {
      setFeedbacks([{ ...form, id: Date.now() }, ...feedbacks]);
      setForm({ name: '', rating: 5, comment: '' });
    }
  };

  const sorted = [...feedbacks].sort((a, b) => sort === 'rating' ? b.rating - a.rating : b.id - a.id);

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : '';

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>Feedback Wall</h2>
      <form onSubmit={handleSubmit} className={`${cardBg} rounded-lg p-6 mb-8`}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full px-4 py-2 mb-4 border rounded ${inputBg}`} />
        <div className="mb-4">
          <label className={`block mb-2 ${theme === 'dark' || theme === 'ocean' ? 'text-white' : ''}`}>Rating</label>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(s => (
              <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })} className={`text-2xl ${s <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
            ))}
          </div>
        </div>
        <textarea placeholder="Comment" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows="3" className={`w-full px-4 py-2 mb-4 border rounded ${inputBg}`}></textarea>
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Submit</button>
      </form>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setSort('newest')} className={`px-4 py-2 rounded ${sort === 'newest' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>Newest</button>
        <button onClick={() => setSort('rating')} className={`px-4 py-2 rounded ${sort === 'rating' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>Highest Rating</button>
      </div>
      <div className="space-y-4">
        {sorted.map(f => (
          <div key={f.id} className={`${cardBg} p-6 rounded-lg shadow ${f.rating === 5 ? 'border-2 border-yellow-400' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className={`font-bold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-800'}`}>{f.name}</h4>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">{'★'.repeat(f.rating)}</span>
                {f.rating === 5 && <span className="text-yellow-400 ml-2">Featured</span>}
              </div>
            </div>
            <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>{f.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectUpdates({ theme }) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const msgs = ["New project deployed", "Bug fix completed", "Feature added", "Performance improved"];
    const interval = setInterval(() => {
      setUpdates(prev => [{ msg: msgs[Math.floor(Math.random() * msgs.length)], id: Date.now() }, ...prev.slice(0, 4)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';
  const updateBg = theme === 'dark' ? 'bg-gray-700' : theme === 'ocean' ? 'bg-teal-700' : 'bg-gray-100';

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>Live Updates</h2>
      <div className={`${cardBg} rounded-lg p-6 max-h-64 overflow-y-auto`}>
        {updates.length === 0 ? (
          <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-400' : 'text-gray-500'}>Waiting for updates...</p>
        ) : (
          updates.map(u => (
            <div key={u.id} className={`p-3 mb-2 rounded ${updateBg}`}>
              <p className={theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-800'}>{u.msg}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function Footer({ theme }) {
  const footerBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-blue-800' : 'bg-purple-900';

  return (
    <footer className={`${footerBg} text-white py-12 mt-20`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/homaira1379" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition transform hover:scale-110">
            <Github size={28} />
          </a>
          <a href="https://linkedin.com/in/homaira-yousufi-6983311b5" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition transform hover:scale-110">
            <Linkedin size={28} />
          </a>
          <a href="mailto:humaira.yousufi@gmail.com" className="hover:text-pink-300 transition transform hover:scale-110">
            <Mail size={28} />
          </a>
        </div>
        <p className="text-purple-200">
          © {new Date().getFullYear()} Homaira Yousufi. All rights reserved.
        </p>
        <p className="text-purple-300 text-sm mt-2">
          Built with React & Passion
        </p>
      </div>
    </footer>
  );
}