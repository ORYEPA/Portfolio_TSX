import { motion } from 'motion/react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import ImageWithFallback from 'react-image-fallback';

export function ProjectsSection() {
  const placeholder = '/assets/placeholder.png';

  const projects = [
    {
      id: 1,
      title: 'CNN Classifications',
      description:
        'Advanced medical image classification system using Convolutional Neural Networks to analyze X-ray images and provide automated diagnostic assistance.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'AI/ML'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description:
        'Interactive business intelligence dashboard for real-time data visualization and automated reporting with predictive analytics.',
      technologies: ['Vue.js', 'D3.js', 'PostgreSQL', 'Python'],
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Data Science'
    },
    {
      id: 4,
      title: 'Mobile Health App',
      description:
        'Cross-platform mobile application for health monitoring with IoT device integration and personalized health recommendations.',
      technologies: ['React Native', 'Firebase', 'IoT', 'Machine Learning'],
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Mobile Development'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Projects
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A showcase of my latest work in web development, machine learning, and data science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 100, opacity: 0, rotateX: -30 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: 'easeOut'
              }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              className="group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={project.image}
                    fallbackImage={placeholder}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200"
                    >
                      <Github className="w-5 h-5 text-gray-800" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-800" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + techIndex * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 transform"
          >
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>View More Projects</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
