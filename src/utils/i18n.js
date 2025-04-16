import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to the Acme Survey',
      loading: 'Loading survey...',
      error: 'Error loading survey',
      invalidToken: 'Invalid or expired token'
    }
  },
  hi: {
    translation: {
      welcome: 'Acme सर्वेक्षण में आपका स्वागत है',
      loading: 'सर्वेक्षण लोड हो रहा है...',
      error: 'सर्वेक्षण लोड करने में त्रुटि',
      invalidToken: 'अमान्य या समाप्त टोकन'
    }
  },
  mr: {
    translation: {
      welcome: 'Acme सर्वेक्षणात आपले स्वागत आहे',
      loading: 'सर्वेक्षण लोड होत आहे...',
      error: 'सर्वेक्षण लोड करताना त्रुटी',
      invalidToken: 'अवैध किंवा कालबाह्य टोकन'
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