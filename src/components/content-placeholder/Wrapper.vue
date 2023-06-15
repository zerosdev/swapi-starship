<script lang="ts" setup>
import { ref } from 'vue'
let props = defineProps({
    rounded: {
        type: Boolean,
        default: false,
    },
    centered: {
        type: Boolean,
        default: false,
    },
    animated: {
        type: Boolean,
        default: true,
    }
})
let data = ref({
    classObject: {
        'vue-content-placeholders': true,
        'vue-content-placeholders-is-rounded': props.rounded,
        'vue-content-placeholders-is-centered': props.centered,
        'vue-content-placeholders-is-animated': props.animated,
    }
})
</script>
<style lang="scss">
@import '../../assets/content-placeholder.scss';
</style>
<template>
    <div :class="data.classObject">
        <slot />
    </div>
</template>
