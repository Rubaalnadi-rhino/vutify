// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import { createPinia } from 'pinia'
import router from "../routes/index.routes";
import i18n from "../i18n"

// Types src/i18n.ts
import type { App } from 'vue'
import Croppa from 'vue-croppa'

export function registerPlugins (app: App) {
  const pinia = createPinia()
  loadFonts()
  app.use(vuetify)
  app.use(pinia)
  app.use(router);
  app.use(Croppa)
  app.use(i18n)  
}
