import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faArrowLeft, faHouse, faBell, faCalendar, faUser, faComment } from '@fortawesome/free-solid-svg-icons'
import { faTwitterSquare, faTwitch, faGithubSquare, faYoutubeSquare, faInstagram, faFacebook, faYoutube, faTiktok,  } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitterSquare, faTwitch, faFacebook, faTiktok, faYoutube, faGithubSquare, faYoutubeSquare, faInstagram, faXmark, faArrowLeft, faHouse, faBell, faCalendar, faUser, faComment)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})