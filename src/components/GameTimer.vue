<script setup lang="ts">
import { Counter } from '../constants';
interface ICounter {
    counter: Counter;
}

const props = defineProps<ICounter>();
</script>
<template>
    <div class="game-timer">
        <label>花費時間</label>
        <span class="tick">{{ props.counter }}</span>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';

.game-timer {
    display: flex;
    max-width: 246px;
    justify-content: space-between;
    font-size: 18px;
    padding: 10px 47px;
    color: #fff;
    background-color: $DarkBlue-800;
    border-radius: 9.4px;
    margin: 0 auto 21px auto;

    @include pc-s {
        margin-bottom: 16px;
    }

    @include ipad-s {
        max-width: 137px;
        font-size: 13px;
        padding: 8px 16px;
        margin-bottom: 12px;
    }
}
</style>