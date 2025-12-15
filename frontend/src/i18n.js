import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "footer_text": "© 2025 VacMan Portal. All rights reserved.",
      "home_hero_title": "Stay Protected. Book Your Vaccination Today.",
      "home_hero_desc": "Choose from a wide range of vaccines and get your appointment booked at the nearest certified center. Safe, quick, and hassle-free.",
      "book_now": "Book Now",
      "view_vaccines": "View Vaccines",
      // ...add more keys as needed
    }
  },
  hi: {
    translation: {
      "footer_text": "© 2025 वैक्मैन पोर्टल. सर्वाधिकार सुरक्षित.",
      "home_hero_title": "सुरक्षित रहें। आज ही अपना टीकाकरण बुक करें।",
      "home_hero_desc": "विभिन्न प्रकार के टीकों में से चुनें और अपने निकटतम प्रमाणित केंद्र में अपॉइंटमेंट बुक करें। सुरक्षित, तेज़ और परेशानी मुक्त।",
      "book_now": "अभी बुक करें",
      "view_vaccines": "टीके देखें",
      // ...add more keys as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
