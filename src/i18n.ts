import { userLocal } from './store/stores/local/index';
import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";
import en from './locales/en.json'
import ar from './locales/ar.json'
import{ userLocal} from "./store/stores/local/index"
import  { createPinia} from "pinia";

export const pinia = createPinia();


export default createI18n({
  legacy: true,
  locale: userLocal(pinia).appLocale,
  messages: {
    en,
    ar
  },
});
