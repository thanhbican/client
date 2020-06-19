import colors from "vuetify/es5/util/colors";
const URL = "http://localhost:3000";
export default {
  mode: "universal",
  server: {
    port: 9000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://allfont.net/allfont.css?fonts=open-sans"
      },
      { rel: 'stylesheet', href:"https://fonts.googleapis.com/css?family=Material+Icons"}
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/fonts/style.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/kinesis.js', mode: 'client' },"~/plugins/vueSax.js",{ src: '~/plugins/localStorage.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    '@neneos/nuxt-animate.css',
    [
      "@nuxtjs/recaptcha",
      {
        hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
        siteKey: "6LfRtv8UAAAAAHnj-ETs9x5IzP5CvwTFSdSiFBlZ", // Site key for requests
        version: 2 // Version        // Size: 'compact', 'normal', 'invisible' (v2)
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    baseURL: URL
  },
  proxy: {
    "/api": URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
    /*
     ** You can extend webpack config here
     */
  },
  auth: {
    localStorage: false,
    cookie: false,
    strategies: {
      local: {
        endpoint: {
          login: {
            propertyName: "token"
          },
          logout: true
        },
      }
    }
  }
};
