import './assets/custom.css'
import './assets/responsive.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import StarRating from 'vue-star-rating'

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
    
    app.config.globalProperties.$filters = {
        number_format(n: any, d: any = 0, p: string = '.', t: string = '') {
            n = Number(n);
            if (isNaN(n)) {
                d = (isNaN(d = Math.abs(d)) ? 0 : d);
                return (0).toFixed(d);
        }
        else {
            var isFloat = ((n % 1) !== 0);

            if (isFloat && d == "*") {
                d = String(n).split(".")[1].length;
            }
            else if (Number(d) >= 0) {
                d = Number(d);
            }
            else {
                d = String(n).split(".");
                if (d.length > 1) {
                    d = d[1].length;
                }
                else {
                    d = 0;
                }
            }

            d = (isNaN(d = Math.abs(d)) ? 2 : d);
            p = (p === undefined ? "." : p);
            t = (t === undefined ? "" : t);
            let s = n < 0 ? "-" : "";
            let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(d)));
            let j = i.length
            j = j > 3 ? j % 3 : 0;
            let ret = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (d ? p + Math.abs(n - parseInt(i)).toFixed(d).slice(2) : "");

            return ret;
        }
    }
  }

app.use(createPinia())
app.use(router)
app.component('star-rating', StarRating)
app.mount('#app')