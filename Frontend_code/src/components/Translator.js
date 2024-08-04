import React, { useEffect } from 'react';

const GoogleTranslate = ({ className }) => {
  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      } else {
        console.error('Google Translate script failed to load.');
      }
    };

    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      loadGoogleTranslateScript();
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup: Remove the script when the component unmounts
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="google_translate_element" className={className}></div>
  );
};

export default GoogleTranslate;
