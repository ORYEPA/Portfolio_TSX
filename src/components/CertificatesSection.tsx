import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import ImageWithFallback from 'react-image-fallback';

export function CertificatesSection() {
  const placeholder = '/assets/placeholder.png';

  const certificates = [
    {
      id: 1,
      title: 'React Developer Professional Certificate',
      issuer: 'Meta',
      date: '2023',
      credentialId: 'META-RD-2023-001',
      image: 'https://images.unsplash.com/photo-1586900470869-48884e7b7a3e?w=400&h=300&fit=crop',
      skills: ['React', 'JavaScript', 'JSX', 'State Management'],
      verified: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'FreeCodeCamp',
      date: '2022',
      credentialId: 'FCC-FSWD-2022-789',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      verified: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      issuer: 'IBM',
      date: '2023',
      credentialId: 'IBM-PDS-2023-456',
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
      verified: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CP-2023-321',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      skills: ['AWS', 'Cloud Computing', 'EC2', 'S3'],
      verified: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Machine Learning Specialization',
      issuer: 'Stanford University',
      date: '2024',
      credentialId: 'STAN-ML-2024-654',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      skills: ['Machine Learning', 'TensorFlow', 'Neural Networks'],
      verified: true,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'Database Design and Management',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'MS-DDM-2022-987',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      skills: ['SQL', 'Database Design', 'MySQL', 'PostgreSQL'],
      verified: true,
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Certificates
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my technical expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ y: 100, opacity: 0, rotateX: -30 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 10,
                rotateX: 5,
                z: 50
              }}
              className="group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl border border-gray-100">
                {/* Certificate Image */}
                <div className="relative overflow-hidden h-40">
                  <ImageWithFallback
                    src={cert.image}
                    fallbackImage={placeholder}
                    alt={cert.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Verified Badge */}
                  {cert.verified && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        className="bg-green-500 text-white p-2 rounded-full"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}

                  {/* Credential ID */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      ID: {cert.credentialId}
                    </p>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotateZ: 15 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Award className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{cert.date}</span>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-medium">Skills Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (index * 0.1) + (skillIndex * 0.05) + 0.5 }}
                          className={`px-2 py-1 bg-gradient-to-r ${cert.color} text-white rounded-full text-xs font-medium transform hover:scale-105 transition-transform duration-200`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3D Certificate Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Achievement Elements */}
        <div className="relative mt-16 h-32 overflow-hidden">
          {[ 
            { icon: Award, pos: { left: '10%', top: '20%' } },
            { icon: CheckCircle, pos: { right: '15%', top: '10%' } },
            { icon: Award, pos: { left: '20%', bottom: '20%' } },
            { icon: CheckCircle, pos: { right: '10%', bottom: '30%' } }
          ].map((element, idx) => {
            const Icon = element.icon;
            return (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.1, 0.3, 0.1],
                  rotateZ: [0, 360, 0],
                }}
                transition={{
                  duration: 6 + idx,
                  repeat: Infinity,
                  delay: idx * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute pointer-events-none"
                style={element.pos}
              >
                <Icon className="w-8 h-8 text-orange-400" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
