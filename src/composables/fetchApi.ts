import { ref } from 'vue'
// import fetch from 'node-fetch'
export const fetchApi = (url: string | CallableFunction = '', options: any = {}) => {
    options.headers = {
        ...options.headers,
        accept: 'application/json',
    }

    const data = <any> ref(null)
    const error = <any> ref(null)
    const pending = <any> ref(true)

    if (typeof url == 'function') {
        url = String(url())
    }

    url = url ? url : ''
    url = url.substring(0, 1) === '/' ? url.substring(1) : url
    url = url.substring(0, 4) === 'http' ? url : `https://swapi.dev/api/${url}`

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
        .finally(() => pending.value = false)

  return { pending, data, error }
}
