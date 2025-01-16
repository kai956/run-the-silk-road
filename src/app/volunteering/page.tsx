'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import Partners from '../components/Partners';

export default function VolunteeringPage() {
  const { language } = useLanguage();

  const content = {
    intro: {
      en: "The Run the Silk Road Marathon Directorate is interested in recruiting responsible people for volunteer work. If you are a person with an active life position and want to contribute to the development of marathon sports and tourism in Kyrgyzstan, please read the Volunteer Code provided here, we will be happy to see you on the team.",
      ru: "Дирекция международного марафона «Run the Silk Road» заинтересована в наборе ответственных людей на волонтерскую работу. Если Вы — человек с активной жизненной позицией и хотите внести свой вклад в развитие марафонского спорта и туризма в Кыргызстане, пожалуйста ознакомьтесь с приведенным здесь Кодексом волонтера, мы будем рады видеть Вас в команде."
    }
  };

  const sections = [
    {
      title: language === 'en' ? 'Principles of Volunteering' : 'Принципы волонтерской деятельности',
      items: [
        {
          en: 'Voluntariness - no one can be forced to engage in volunteer activities. Volunteer activities are carried out on the Volunteer\'s own initiative.',
          ru: 'Добровольность – никто не может быть принужден к занятию волонтерской деятельностью. Волонтерская деятельность осуществляется по собственной инициативе Волонтера.'
        },
        {
          en: 'Free of charge - volunteer activities are not paid and are not an alternative to paid work.',
          ru: 'Безвозмездность – волонтерская деятельность не оплачивается и не является альтернативой оплачиваемой работе.'
        },
        {
          en: 'Respect - The volunteer respects the dignity, personal and cultural characteristics of all people.',
          ru: 'Уважение – Волонтер уважает достоинство, личностные и культурные особенности всех людей.'
        },
        {
          en: 'Responsibility - The volunteer is responsible for their work, its quality and meeting established deadlines.',
          ru: 'Ответственность – Волонтер несет ответственность за свою работу, ее качество и соблюдение установленных сроков.'
        },
        {
          en: 'Self-improvement - The volunteer is always open to acquiring new knowledge and skills.',
          ru: 'Самосовершенствование – Волонтер всегда открыт для приобретения новых знаний и навыков.'
        },
        {
          en: 'Healthy lifestyle - The volunteer does not smoke, drink alcohol, or use drugs during the event. In everyday life, they also try to follow this principle.',
          ru: 'Здоровый образ жизни – Волонтер не курит, не употребляет алкогольные напитки и наркотические вещества во время проведения мероприятия.'
        },
        {
          en: 'Morality - The volunteer follows moral and ethical principles.',
          ru: 'Нравственность – Волонтер соблюдает морально-этические принципы.'
        },
        {
          en: 'Equality - The volunteer recognizes equal opportunities for everyone to participate in collective activities.',
          ru: 'Равенство – Волонтер признает равные возможности участия каждого в коллективной деятельности.'
        }
      ]
    },
    {
      title: language === 'en' ? 'Volunteer Rights' : 'Права Волонтера',
      items: [
        {
          en: 'The volunteer has the right to receive timely information about the event.',
          ru: 'Волонтер имеет право на своевременное получение информации о проводящемся мероприятии.'
        },
        {
          en: 'The volunteer has the right to make suggestions about the work.',
          ru: 'Волонтер имеет право вносить предложения по работе'
        },
        {
          en: 'The volunteer has the right to respectful and friendly treatment.',
          ru: 'Волонтер имеет право на уважительное и доброжелательное отношение к себе'
        },
        {
          en: 'The volunteer has the right to recognition and fair evaluation of their contribution.',
          ru: 'Волонтер имеет право на признание и справедливую оценку его вклада.'
        },
        {
          en: 'The volunteer has the right to preliminary training.',
          ru: 'Волонтер имеет право на предварительное обучение.'
        },
        {
          en: 'The volunteer has the right to receive equipment if provided by the event conditions.',
          ru: 'Волонтер имеет право на получение экипировки, если это предусмотрено условиями проведения мероприятия.'
        },
        {
          en: 'The volunteer has the right to free meals if working more than 6 hours.',
          ru: 'Волонтер имеет право на предоставление бесплатного питания, если работает более 6ти часов.'
        },
        {
          en: 'The volunteer has the right to transportation.',
          ru: 'Волонтер имеет право на транспортировку.'
        }
      ]
    },
    {
      title: language === 'en' ? 'Tasks for Volunteers' : 'Задачи для волонтеров',
      items: [
        {
          en: 'Registration: accepting vouchers, distributing participant packages',
          ru: 'Регистрация: прием ваучеров, выдача пакетов участника'
        },
        {
          en: 'Work on the route: water distribution, encouraging participants',
          ru: 'Работа на трассе: раздача воды, подбадривание участников'
        },
        {
          en: 'Event preparation work: moving equipment, furniture, etc.',
          ru: 'Работа по подготовке мероприятия: перенос аппаратуры, мебели и т.д.'
        },
        {
          en: 'Post-event work: distributing medals, certificates',
          ru: 'Работа после мероприятия: выдача медалей, сертификатов'
        },
        {
          en: 'Other assistance to organizers as needed.',
          ru: 'Другая посильная помощь организаторам.'
        }
      ]
    },
    {
      title: language === 'en' ? 'What Volunteers Receive' : 'Что получает волонтер',
      items: [
        {
          en: 'Public recognition for contributing to the development of Kyrgyzstan\'s international tourism brand, sports, and tourism in general',
          ru: 'Общественное признание за вклад в развитие международного туристического бренда Кыргызстана, спорта и туризма вцелом'
        },
        {
          en: 'Volunteer skills and experience in organizing international events',
          ru: 'Волонтерские навыки и опыт организации международных мероприятий'
        },
        {
          en: 'Opportunity to communicate with foreigners in different languages',
          ru: 'Возможность пообщаться вживую с иностранцами на разных языках'
        },
        {
          en: 'Certificate',
          ru: 'Сертификат.'
        }
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
              {language === 'en' ? 'Volunteering' : 'Волонтерам'}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {content.intro[language]}
            </p>
          </motion.div>

          {/* Registration Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-20"
          >
            <button
              onClick={() => {/* TODO: Add registration link */}}
              className="bg-[#1E1E4A] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#4A90E2] transition-colors duration-300"
            >
              {language === 'en' ? 'Volunteer Registration' : 'Онлайн Анкета волонтера'}
            </button>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-[#1E1E4A] mb-6">{section.title}</h2>
                <ul className="space-y-4">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#4A90E2] mr-3">•</span>
                      <p className="text-gray-700 leading-relaxed">{item[language]}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-gray-600"
          >
            <p className="font-medium">
              {language === 'en' 
                ? 'The volunteer is the face of the Marathon, therefore they must follow the Volunteer Code.'
                : 'Волонтер является лицом Марафона, поэтому он обязан соблюдать Кодекс Волонтера.'}
            </p>
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