'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Partners from '../components/Partners';

export default function AboutPage() {
  const { language } = useLanguage();

  const sections = [
    {
      title: language === 'en' ? 'Our Story' : 'История марафона Run the Silk Road',
      content: language === 'en' 
        ? 'The Run the Silk Road Marathon was first held on May 26, 2012. The start and finish lines for the 42.195m, 10000m, and 5000m races were located on the Balykchy-Karakol route opposite the Issyk-Kul Aurora sanatorium. More than 800 people participated.'
        : 'Марафон Run the Silk Road впервые был проведен в 26 мая 2012 года. Старт и финиш забегов на 42,195 м, 10000 м и 5000 м располагался по трассе Балыкчы-Каракол напротив санатория «Иссык-Куль Аврора». Участие приняли более 800 человек.',
      image: '/images/placeholder-1.jpg'
    },
    {
      title: language === 'en' ? 'First International Marathon' : 'I-ый Международный Марафон Кыргызстана',
      content: language === 'en'
        ? 'The "First International Marathon of Kyrgyzstan" was dedicated to the 20th anniversary of diplomatic relations between the Kyrgyz Republic and Japan. Under the slogan "Marathon of Friendship", it brought together organizers from both countries.'
        : 'Название: "I-ый Международный Марафон Кыргызстана"\nСлоган: Марафон дружбы\nПосвящается 20-летию дипломатических отношений между Кыргызской Республикой и Японией.',
      image: '/images/placeholder-2.jpg'
    },
    {
      title: language === 'en' ? 'Our Beginning' : 'Наше Начало',
      content: language === 'en'
        ? 'In 2011, right after the Fukushima nuclear disaster, Ibarat Samakova returned to Kyrgyzstan with the idea of organizing a marathon. The idea was immediately embraced and supported by the Japanese Ambassador to Kyrgyzstan, Shin Maruo, who provided unprecedented support.'
        : '2011 год, сразу после трагедии на АЭС Фукусимы. В Кыргызстан вернулась Ибарат Самакова и обратилась к нам с идеей проведения марафона. Мы как-то сразу ухватились за эту идею, поддержали. Обратились к тогдашнему послу Японии в Кыргызстане — Син Маруо. Ему идея очень понравилась и он оказал по истине беспрецедентную поддержку.',
      image: '/images/placeholder-3.jpg'
    }
  ];

  const organizers = [
    {
      title: language === 'en' ? 'Organizing Committee' : 'Оргкомитет',
      members: [
        { role: language === 'en' ? 'Co-chairman' : 'Со-председатель', name: 'Карганбек Самаков (Кыргызстан)' },
        { role: language === 'en' ? 'Co-chairman' : 'Со-председатель', name: 'Наото Сакагучи (Япония)' }
      ]
    },
    {
      title: language === 'en' ? 'Committee Members' : 'Члены Оргкомитета',
      members: [
        'Олимпийский комитет Кыргызской Республики',
        'Федерация легкой атлетики Кыргызской Республики',
        'Администрация Ыссык-Кульской области',
        'Компания "САТ" (Бишкек)',
        'Компания "Mainichi Education" (Tokyo)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E4A] mb-4">
              {language === 'en' ? 'About Us' : 'О Нас'}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'The story of the Silk Road Marathon and its mission to unite cultures through running'
                : 'История марафона Шелкового пути и его миссия объединения культур через бег'}
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-20">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-sm">Image placeholder</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-3xl font-bold text-[#1E1E4A]">{section.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Organizers Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            {organizers.map((org, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-2xl font-bold text-[#1E1E4A] mb-6">{org.title}</h3>
                <div className="space-y-4">
                  {Array.isArray(org.members) && org.members.map((member, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      {typeof member === 'string' ? (
                        <p className="text-gray-700">{member}</p>
                      ) : (
                        <div>
                          <span className="text-sm text-gray-500">{member.role}</span>
                          <p className="text-gray-700 font-medium">{member.name}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
      
      {/* Partners Section */}
      <div className="bg-[#1E1E4A] py-8">
        <Partners />
      </div>
    </div>
  );
} 