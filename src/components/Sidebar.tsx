import { Home, User, GraduationCap, Briefcase, FolderOpen, Award, StickyNote, Sparkles, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeProvider';
import styles from '../styles/SideBar.module.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { currentTheme } = useTheme();

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
    { icon: Github, href: 'https://github.com/ORYEPA', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/andrea-peyro/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/Aid3nnS?t=8qQofzGAwh4jkRw34Mn8Qg&s=09', label: 'Twitter' },
    { icon: Mail, href: 'andreaelenapeyro@gmail.com', label: 'Email' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={styles.sidebar}
    >
      <div className={styles.container}>
        {/* Logo/Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={styles.header}
        >
          <div className={styles.avatar}>
            {/* <User className={styles.navIcon} />*/}
          </div>
          <h2 className={styles.name}>Andrea Peyro</h2>
          <p className={styles.title}>Full Stack Developer</p>
        </motion.div>

       
        <nav className={styles.navigation}>
          <div className={styles.navList}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  onClick={() => onSectionChange(item.id)}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Social Links */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={styles.socialSection}
        >
          <h3 className={styles.socialHeader}>Connect with me</h3>
          <div className={styles.socialGrid}>
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
                  className={styles.socialLink}
                  title={social.label}
                >
                  <Icon className={styles.socialIcon} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}