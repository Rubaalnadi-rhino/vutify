import { defineStore } from 'pinia'

export const userLocal = defineStore('userLocal', {
  state: () => {
    return {
        locale: localStorage.getItem('locale') || 'en',
    }
  },
  actions: {
    changeLocale({lang, i18n}) {
        this.locale = lang;
        i18n.locale = lang;
        localStorage.setItem('locale',this.locale)
        location.reload();
      },
  },
  getters: {
    appLocale() {
        return this.locale;
      },
  },
})