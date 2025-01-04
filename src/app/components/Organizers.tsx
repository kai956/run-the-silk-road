'use client';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { motion } from 'framer-motion';
import { FaSmile } from 'react-icons/fa';

export default function Organizers() {
  const { language } = useLanguage();
  const t = translations[language].organizers;

  const teamMembers = [
    {
      name: 'Ibarat Samakova',
      role: t.roles.creativeDirector,
    },
    {
      name: 'Melis Nadyrov',
      role: t.roles.chairman,
    },
    {
      name: 'Aigerim Valisheva',
      role: t.roles.executiveDirector,
    },
    {
      name: 'Maxim Sim',
      role: t.roles.marathonDirector,
    },
    {
      name: 'Andrey Gurinov',
      role: t.roles.itDirector,
    },
    {
      name: 'Victoria Sim',
      role: t.roles.seniorVolunteer,
    },
    {
      name: 'Katerina Dvornitsyna',
      role: t.roles.eventsDirector,
    },
    {
      name: 'ISHIWATA Akiyoshi',
      role: t.roles.japanRep,
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1E1E4A]">
          {t.title}
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600">
          {t.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-white shadow-lg"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FaSmile className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1E1E4A]">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 