import { Home, User, GraduationCap, Briefcase, FolderOpen, Award, StickyNote, Sparkles, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About me', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'random', label: 'Random Stuff', icon: Sparkles },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl z-50 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, rgb(88, 28, 135) 0%, rgb(30, 58, 138) 50%, rgb(67, 56, 202) 100%)'
      }}
    >
      <div className="p-6">
        {/* Logo/Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${themeClasses.primary} rounded-xl flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Andrea Peyro</h2>
          <p className="text-purple-200 text-sm">Full Stack Developer</p>
        </motion.div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-105 ${
                  activeSection === item.id 
                    ? `bg-gradient-to-r ${themeClasses.primary} shadow-lg` 
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Social Links */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-medium text-purple-200 mb-3">Connect with me</h3>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  title={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}