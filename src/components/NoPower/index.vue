<template>
    <div class="no_power">
        <img src="/@/assets/404.jpeg" alt="">
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NoPower',
    setup() {
    },
})
</script>

<style lang="scss">
    .no_power{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 600px;
        }
    }
</style>