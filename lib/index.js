import VueCropper from './vue-cropper.vue'


const install = function(Vue) {
  Vue.component('VueCropper', VueCropper)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.createApp({}).component('VueCropper', VueCropper);
}


export const globalCropper = {
  version: '1.0.5',
  install,
  VueCropper,
}

export { VueCropper }

export default globalCropper
