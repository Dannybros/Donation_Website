import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common_en from './en/common.json'
import common_zh from './zh/common.json'
import common_ko from './ko/common.json'

const lang = localStorage.getItem('lang')

let lng = 'en'

if(lang){
    lng = lang
}

i18n.use(initReactI18next)
    .init({
        lng:lng,
        interpolation:{
            escapeValue:false,
        },
        resources:{
            en:{
                translation:common_en
            },
            zh:{
                translation:common_zh
            },
            ko:{
                translation:common_ko
            }
        },
    });

export default i18n;