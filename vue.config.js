const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        i18n: {
          locale: 'en',
          fallbackLocale: 'en',
          localeDir: 'locales',
          enableInSFC: true,
          enableLegacy: false,
          runtimeOnly: false,
          compositionOnly: false,
          fullInstall: true
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/basics/_base.scss";`
            }
        }
    }
});
