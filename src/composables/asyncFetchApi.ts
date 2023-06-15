import { ref } from 'vue'
export const asyncFetchApi = async (url: string, options: any = {}) => {
    options.headers = {
        ...options.headers,
        accept: 'application/json',
    }

    const data = <any> ref(null)
    const error = <any> ref(null)
    const pending = <any> ref(true)

    await fetch(url, options)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
        .finally(() => pending.value = false)

  return { pending, data, error }
}
