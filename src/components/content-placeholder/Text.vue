<script lang="ts" setup>
import { ref } from 'vue'
let props = defineProps({
    lines: {
        type: Number,
        default: 4,
    },
    line_width: {
        type: Number,
        default: 0,
    }
})
let data = ref({
    className: `vue-content-placeholders-text`
})
</script>
<template>
    <div :class="data.className">
        <div v-for="n in props.lines" :key="n" :class="`${data.className}__line` + (props.line_width>0?` w-${props.line_width}`:'')" />
    </div>
</template>
