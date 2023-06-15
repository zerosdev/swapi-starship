import './assets/custom.css'
import './assets/responsive.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// @ts-ignore
import StarRating from 'vue-star-rating'
import ContentPlaceholderWrapper from './components/content-placeholder/Wrapper.vue'
import ContentPlaceholderImg from './components/content-placeholder/Img.vue'
import ContentPlaceholderText from './components/content-placeholder/Text.vue'
import ContentPlaceholderHeading from './components/content-placeholder/Heading.vue'

// bootstrap assets
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(
    Object.assign(App, {
        watch: {
            '$route': {
                // watch dynamic page title by router
                handler: (to: any, from: any) => {
                    document.title = to.meta.title && to.meta.title.length > 0 ? to.meta.title + ' | SWAPI Starship' : 'SWAPI Starship'
                },
                immediate: true
            }
        }
    })
)

app.use(createPinia())
app.use(router)
app.component('StarRating', StarRating)
app.component('ContentPlaceholderWrapper', ContentPlaceholderWrapper)
app.component('ContentPlaceholderImg', ContentPlaceholderImg)
app.component('ContentPlaceholderText', ContentPlaceholderText)
app.component('ContentPlaceholderHeading', ContentPlaceholderHeading)
app.mount('#app')