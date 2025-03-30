'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-[#1E1E4A] text-white relative z-10 mt-auto">
      <div className="bg-white h-24 rounded-b-[64px] mb-20" />
      
      <div className="container mx-auto px-4 py-16 -mt-8 pb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{t.contactUs}</h3>
            <div className="space-y-3">
              <p>Run The Silk Road Marathon</p>
              <p>{t.hours}</p>
              <p>{t.phone}</p>
              <p>{t.email}</p>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{language === 'en' ? 'Address' : language === 'ru' ? 'Адрес' : 'Дарек'}</h3>
            <div className="space-y-3">
              <p>{t.address}</p>
              <p>{t.city}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/run_the_silkroad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FaInstagram className="text-xl" />
                </div>
              </a>
              <a
                href="https://www.facebook.com/RuntheSilkRoad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FaFacebookF className="text-xl" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add extra padding at the bottom and prevent scrolling beyond this point */}
      <div className="h-24 w-full"></div>
      <div id="scroll-boundary" className="absolute w-full h-1" style={{ bottom: 0 }}></div>
    </footer>
  );
} 