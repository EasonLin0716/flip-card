<script setup lang="ts">
import { Counter } from '../constants';
interface ICounter {
    counter: Counter;
}

const props = defineProps<ICounter>();
</script>

<template>
    <div class="content-memory__play-game__timer">
        <span>花費時間</span>
        <span class="content-memory__play-game__timer__tick">{{ props.counter }}</span>
    </div>
</template>