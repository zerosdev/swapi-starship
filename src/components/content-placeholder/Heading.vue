<script lang="ts" setup>
import { ref } from 'vue'
let props = defineProps({
    img: {
        type: Boolean,
        default: false,
    }
})
let data = ref({
    className: 'vue-content-placeholders-heading'
})
</script>
<template>
    <div :class="data.className">
        <div v-if="props.img" :class="`${data.className}__img`" />
        <div :class="`${data.className}__content`">
            <div :class="`${data.className}__title`" />
            <div :class="`${data.className}__subtitle`" />
        </div>
    </div>
</template>
