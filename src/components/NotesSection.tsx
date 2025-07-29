import { motion } from 'motion/react';
import { FileText, Lightbulb, Code, Target, Heart, Coffee } from 'lucide-react';

export function NotesSection() {
  const notes = [
    {
      id: 1,
      title: 'Development Philosophy',
      content: 'Clean code is not written by following a set of rules. You don\'t become a software craftsman by learning a list of heuristics. Professionalism and craftsmanship come from values that drive disciplines.',
      category: 'Philosophy',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'React Best Practices',
      content: 'Always use useCallback for functions passed to child components, useMemo for expensive calculations, and remember that premature optimization is the root of all evil - but strategic optimization is the key to performance.',
      category: 'Technical',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Project Goals 2024',
      content: 'Focus on mastering TypeScript, diving deeper into system design, contributing to open source projects, and building at least 3 major full-stack applications with different tech stacks.',
      category: 'Goals',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      date: '2024-01-01'
    },
    {
      id: 4,
      title: 'What I Love About Coding',
      content: 'The moment when a complex problem suddenly makes sense, the satisfaction of refactoring messy code into something beautiful, and the endless possibility to create solutions that can impact people\'s lives.',
      category: 'Personal',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      date: '2023-12-20'
    },
    {
      id: 5,
      title: 'Database Design Insights',
      content: 'Normalization is important, but don\'t over-normalize. Think about query patterns first, then design your schema. Indexes are your friend, but too many can hurt write performance.',
      category: 'Technical',
      icon: Code,
      color: 'from-purple-500 to-indigo-500',
      date: '2023-12-15'
    },
    {
      id: 6,
      title: 'Daily Coding Routine',
      content: 'Start with coffee ☕, review yesterday\'s work, tackle the hardest problem first when mind is fresh, take breaks every 45 minutes, and always end the day by writing tomorrow\'s first task.',
      category: 'Routine',
      icon: Coffee,
      color: 'from-amber-500 to-yellow-500',
      date: '2023-12-10'
    }
  ];

  const categoryStats = {
    'Technical': notes.filter(n => n.category === 'Technical').length,
    'Personal': notes.filter(n => n.category === 'Personal').length,
    'Philosophy': notes.filter(n => n.category === 'Philosophy').length,
    'Goals': notes.filter(n => n.category === 'Goals').length,
    'Routine': notes.filter(n => n.category === 'Routine').length,
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent mb-6">
            Notes & Thoughts
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Random thoughts, insights, and learnings from my journey as a developer. 
            A collection of ideas that help shape my approach to coding and life.
          </p>
        </motion.div>

        {/* Category Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {Object.entries(categoryStats).map(([category, count], index) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-2xl font-bold text-slate-700">{count}</div>
              <div className="text-sm text-gray-600">{category}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => {
            const Icon = note.icon;
            return (
              <motion.div
                key={note.id}
                initial={{ y: 100, opacity: 0, rotateX: -20 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50
                }}
                className="group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform transition-all duration-500 group-hover:shadow-2xl border border-gray-100 h-full flex flex-col">
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${note.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {note.category}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{note.date}</p>
                    </div>
                  </div>

                  {/* Note Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {note.title}
                  </h3>

                  {/* Note Content */}
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {note.content}
                    </p>
                  </div>

                  {/* Note Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        Read more →
                      </motion.div>
                    </div>
                  </div>

                  {/* 3D Border Effect */}
                  <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${note.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Thought Bubbles */}
        <div className="relative mt-16 h-40 overflow-hidden">
          {[
            { icon: Lightbulb, pos: { left: '5%', top: '10%' } },
            { icon: FileText, pos: { right: '10%', top: '20%' } },
            { icon: Heart, pos: { left: '15%', bottom: '15%' } },
            { icon: Code, pos: { right: '20%', bottom: '25%' } },
            { icon: Coffee, pos: { left: '50%', top: '5%' } }
          ].map((bubble, index) => {
            const Icon = bubble.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.6, 1, 0.6],
                  opacity: [0.1, 0.4, 0.1],
                  y: [0, -20, 0],
                  rotateZ: [0, 180, 360]
                }}
                transition={{
                  duration: 8 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut"
                }}
                className="absolute pointer-events-none"
                style={bubble.pos}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Icon className="w-6 h-6 text-slate-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add Note Button */}
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
            className="px-8 py-4 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 transform"
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Add New Note</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}