<script setup lang="ts">
import { CounterType } from '../constants';
interface Counter {
    counter: CounterType;
}

const props = defineProps<Counter>();
</script>

<template>
    <div class="content-memory__play-game__timer">
        <span>花費時間</span>
        <span class="content-memory__play-game__timer__tick">{{ props.counter }}</span>
    </div>
</template>