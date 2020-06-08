import createPersistedState from "vuex-persistedstate";

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'TFS-cart',
        paths: ['cart','cartLength']
    })(store)
  })
}
