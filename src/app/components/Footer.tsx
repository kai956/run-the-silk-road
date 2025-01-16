'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-[#1E1E4A] text-white">
      <div className="bg-white h-24 rounded-b-[64px] mb-16" />
      
      <div className="container mx-auto px-4 py-16 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{language === 'en' ? 'Contact Us' : 'Контакты'}</h3>
            <div className="space-y-3">
              <p>Run The Silk Road Marathon</p>
              <p>{t.hours}</p>
              <p>{t.phone}</p>
              <p>{t.email}</p>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{language === 'en' ? 'Address' : 'Адрес'}</h3>
            <div className="space-y-3">
              <p>{t.address}</p>
              <p>{t.city}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{language === 'en' ? 'Follow Us' : 'Соц. сети'}</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/silkroadmarathon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram text-xl"></i>
                </div>
              </a>
              <a
                href="https://facebook.com/silkroadmarathon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook text-xl"></i>
                </div>
              </a>
              <a
                href="https://twitter.com/silkroadrun"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter text-xl"></i>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 pb-12 border-t border-white/10 text-center text-sm">
          <p>© 2024 Run The Silk Road Marathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 