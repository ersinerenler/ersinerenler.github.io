let currentLanguage = localStorage.getItem('language') || 'en';
let translations = {};

async function loadTranslations() {
    try {
        // GitHub Pages için tam yolu kullan
        const response = await fetch(`./locales/${currentLanguage}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        updateContent();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function updateContent() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const keys = element.getAttribute('data-lang').split('.');
        let value = translations;
        for (const key of keys) {
            if (value) {
                value = value[key];
            }
        }
        if (value) {
            element.textContent = value;
        }
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    loadTranslations();
}

// Load translations on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
}); 