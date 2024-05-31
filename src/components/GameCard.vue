<script setup lang="ts">
import { computed } from 'vue';
import { Card, cardBackImgPath } from '../constants';

interface Props {
    card: Card;
}

type CardBackStyle = {
    backgroundImage?: string;
};

const props = defineProps<Props>();

interface Emits {
    (event: 'cardClick'): void;
};

const emits = defineEmits<Emits>();


const cardBackStyle = computed<CardBackStyle>(() => {
    return props.card.down && !props.card.matched ? { backgroundImage: `url(${cardBackImgPath})` } : {}
});
const cardBackImgUrl = computed<string>(() => cardBackImgPath);
const cardClickHandler = () => {
    emits('cardClick');
};
</script>
<template>
    <div :class="[{ 'down': props.card.down && !props.card.matched, 'up': !props.card.down, 'matched': props.card.matched }, ' card']"
        :style="cardBackStyle" @click="cardClickHandler">
        <img v-if="props.card.down" :src="cardBackImgUrl" alt="牌背" width="104" height="104">
        <img v-else :src="props.card.icon" alt="牌面">
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';

@keyframes flipDown {
    0% {
        background-color: $Blue-800;
        transform: rotateY(0deg);
    }

    100% {
        background-color: $Blue-700;
        transform: rotateY(180deg);
    }
}

@keyframes flipUp {
    0% {
        background-color: $Blue-700;
        transform: rotateY(180deg);
    }

    100% {
        background-color: $Blue-800;
        transform: rotateY(0deg);
    }
}

@keyframes matching {
    0% {
        background-color: $Blue-300;
    }

    50% {
        background-color: $Blue-300;
    }

    100% {
        background-color: $Blue-200;
    }
}

.card {
    aspect-ratio: 1 / 1;
    background-color: $Blue-700;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat, no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    border: 6px solid transparent;
    animation: flipUp 0.5s forwards;

    img {
        opacity: 1;
        transition: opacity 0.5s;
        max-width: 100%;
        height: auto;
    }

    &.down {
        animation: flipDown 0.5s forwards;

        img {
            opacity: 0;
        }
    }

    &.matched {
        animation: matching 1s forwards;
    }
}
</style>