<script lang="ts" setup>
import { ref } from 'vue'
let props = defineProps({
    class: {
        type: String,
        default: '',
    }
})
let data = ref({
    className: `vue-content-placeholders-img ${props.class}`
})
</script>
<template>
    <div :class="data.className"></div>
</template>
