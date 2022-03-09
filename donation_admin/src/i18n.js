import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from './locales/en/common.json'
import common_zh from './locales/zh/common.json'
import common_ko from './locales/ko/common.json'

i18n.use(initReactI18next)
    .init({
        lng: 'en',
        interpolation:{
            escapeValue:false,
        },
        resources:{
            en:{
                translation: common_en,
            },
            zh:{
                translation: common_zh,
            },
            ko:{
                translation: common_ko,
            }
        },
    });

export default i18n;