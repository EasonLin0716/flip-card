<script setup lang="ts">
import { computed } from 'vue';
import { Card, cardBackImgPath } from '../constants';

interface Props {
    card: Card;
}

const props = defineProps<Props>();

interface EmitType {
    (event: 'cardClick'): void;
};

const emits = defineEmits<EmitType>();

const cardBackStyle = computed(() => {
    return props.card.down && !props.card.matched ? { backgroundImage: `url(${cardBackImgPath})` } : {}
});
const cardBackImgUrl = computed(() => 'https://fakeimg.pl/300x300/1F3A52');
const cardClickHandler = () => {
    emits('cardClick');
};
</script>
<template>
    <div :class="[{ 'down': props.card.down && !props.card.matched, 'up': !props.card.down, 'matched': props.card.matched }, ' card']"
        :style="cardBackStyle" @click="cardClickHandler">
        <img v-if="props.card.down" :src="cardBackImgUrl" alt="牌背" width="104" height="104">
        <img v-else :src="`/${props.card.icon}`" alt="牌面">
    </div>
</template>