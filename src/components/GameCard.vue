<script setup lang="ts">
import { computed } from 'vue';

interface Card {
    icon: string;
    down: boolean;
    matched: boolean;
}

interface Props {
    card: Card;
}

const props = defineProps<Props>();
const emits = defineEmits(['cardClick']);

const cardBackImgPath1: string = 'https://fakeimg.pl/300x300/1F3A52/000';
const cardBackImgPath2: string = 'https://fakeimg.pl/300x300/1F3A52/fff';
const cardBackground = computed(() => {
    return { 'background-image': 'url(' + cardBackImgPath2 + '), url(' + cardBackImgPath1 + ')' }
});
const cardBackImgUrl = computed(() => 'https://fakeimg.pl/300x300/1F3A52');
const cardClickHandler = () => {
    emits('cardClick');
};
</script>
<template>
    <div :class="[{ 'down': props.card.down && !props.card.matched, 'up': !props.card.down, 'matched': props.card.matched }, ' card']"
        :style="props.card.down && !props.card.matched ? cardBackground : {}" @click="cardClickHandler">
        <img v-if="props.card.down" :src="cardBackImgUrl" alt="牌背" width="104" height="104">
        <img v-else :src="`/${props.card.icon}`" alt="牌面">
    </div>
</template>