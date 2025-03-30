'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

export default function AboutPage() {
  const { language } = useLanguage();

  const sections = [
    {
      title: language === 'en' ? 'Our Story' : language === 'ru' ? 'История марафона Run the Silk Road' : 'Run the Silk Road марафонунун тарыхы',
      content: language === 'en' 
        ? 'The Run the Silk Road Marathon was first held on May 26, 2012. The start and finish lines for the 42.195m, 10000m, and 5000m races were located on the Balykchy-Karakol route opposite the Issyk-Kul Aurora sanatorium. More than 800 people participated.'
        : language === 'ru'
          ? 'Марафон Run the Silk Road впервые был проведен в 26 мая 2012 года. Старт и финиш забегов на 42,195 м, 10000 м и 5000 м располагался по трассе Балыкчы-Каракол напротив санатория «Иссык-Куль Аврора». Участие приняли более 800 человек.'
          : 'Run the Silk Road марафону биринчи жолу 2012-жылдын 26-майында өткөрүлгөн. 42,195 м, 10000 м жана 5000 м аралыктагы жарыштардын башталышы жана аягы Балыкчы-Каракол жолунда «Ысык-Көл Аврора» санаториясынын каршысында жайгашкан. Жарышка 800дөн ашуун адам катышкан.',
      image: '/images/placeholder-1.jpg'
    },
    {
      title: language === 'en' ? 'First International Marathon' : language === 'ru' ? 'I-ый Международный Марафон Кыргызстана' : 'Кыргызстандын I-эл аралык марафону',
      content: language === 'en'
        ? 'The "First International Marathon of Kyrgyzstan" was dedicated to the 20th anniversary of diplomatic relations between the Kyrgyz Republic and Japan. Under the slogan "Marathon of Friendship", it brought together organizers from both countries.'
        : language === 'ru'
          ? 'Название: "I-ый Международный Марафон Кыргызстана"\nСлоган: Марафон дружбы\nПосвящается 20-летию дипломатических отношений между Кыргызской Республикой и Японией.'
          : 'Аталышы: "Кыргызстандын I-эл аралык марафону"\nУраан: Достук марафону\nКыргыз Республикасы менен Япониянын ортосундагы дипломатиялык мамилелердин 20 жылдыгына арналат.',
      image: '/images/placeholder-2.jpg'
    },
    {
      title: language === 'en' ? 'Our Beginning' : language === 'ru' ? 'Наше Начало' : 'Биздин башталышыбыз',
      content: language === 'en'
        ? 'In 2011, right after the Fukushima nuclear disaster, Ibarat Samakova returned to Kyrgyzstan with the idea of organizing a marathon. The idea was immediately embraced and supported by the Japanese Ambassador to Kyrgyzstan, Shin Maruo, who provided unprecedented support.'
        : language === 'ru'
          ? '2011 год, сразу после трагедии на АЭС Фукусимы. В Кыргызстан вернулась Ибарат Самакова и обратилась к нам с идеей проведения марафона. Мы как-то сразу ухватились за эту идею, поддержали. Обратились к тогдашнему послу Японии в Кыргызстане — Син Маруо. Ему идея очень понравилась и он оказал по истине беспрецедентную поддержку.'
          : '2011-жыл, Фукусима АЭСиндеги кырсыктан кийин. Ибарат Самакова Кыргызстанга кайтып келип, марафон өткөрүү идеясы менен бизге кайрылды. Биз бул идеяны дароо колдоп, Япониянын Кыргызстандагы элчиси Син Маруого кайрылдык. Ага бул идея абдан жакты жана ал чындыгында беспрецеденттүү колдоо көрсөттү.',
      image: '/images/placeholder-3.jpg'
    }
  ];

  const organizers = [
    {
      title: language === 'en' ? 'Organizing Committee' : language === 'ru' ? 'Оргкомитет' : 'Уюштуруу комитети',
      members: [
        { 
          role: language === 'en' ? 'Co-chairman' : language === 'ru' ? 'Со-председатель' : 'Кошмо төрага', 
          name: 'Карганбек Самаков (Кыргызстан)' 
        },
        { 
          role: language === 'en' ? 'Co-chairman' : language === 'ru' ? 'Со-председатель' : 'Кошмо төрага', 
          name: 'Наото Сакагучи (Япония)' 
        }
      ]
    },
    {
      title: language === 'en' ? 'Committee Members' : language === 'ru' ? 'Члены Оргкомитета' : 'Уюштуруу комитетинин мүчөлөрү',
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
              {language === 'en' ? 'About Us' : language === 'ru' ? 'О Нас' : 'Биз жөнүндө'}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'The story of the Silk Road Marathon and its mission to unite cultures through running'
                : language === 'ru'
                  ? 'История марафона Шелкового пути и его миссия объединения культур через бег'
                  : 'Жибек Жолу марафонунун тарыхы жана анын чуркоо аркылуу маданияттарды бириктирүү миссиясы'}
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-20">
            {sections.map((section, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>

          {/* Organizers Section */}
          <div className="mt-20">
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
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Partners Section */}

    </div>
  );
} 