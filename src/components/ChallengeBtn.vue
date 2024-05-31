<script setup lang="ts">
import { computed } from 'vue';
import { PLAY_STATE, PLAY_STATE_TEXT, PlayState } from '../constants';

interface Props {
    playState: PlayState;
}

const props = defineProps<Props>();

interface Emits {
    (event: 'startGame'): void;
};

const emits = defineEmits<Emits>();

const isPlaying = computed(() => props.playState === PLAY_STATE.PLAYING);

const buttonText = computed(() => {
    return isPlaying.value ? PLAY_STATE_TEXT.PLAYING : PLAY_STATE_TEXT.NOT_STARTED;
});

const startGameHandler = () => {
    if (isPlaying.value) return;
    emits('startGame');
};
</script>
<template>
    <button :class="{
        'is-disabled': isPlaying,
        'challenge-btn': true
    }" @click="startGameHandler">{{ buttonText }}</button>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';

.challenge-btn {
    position: relative;
    display: block;
    margin: 48px auto 0 auto;
    font-size: 36px;
    font-weight: bold;
    padding: 12px 40px;
    border-radius: 36.5px;
    border: 0;
    background-color: $challengeBgColor;
    box-shadow: 0 10px 0 0 $Blue-700;
    cursor: pointer;
    transition: all 0.2s ease-out;
    top: 0;
    color: #fff;

    @include pc-mm {
        font-size: 32px;
        padding: 10px 36px;
        margin-top: 32px;
    }

    @include pc-s {
        margin-top: 24px;
    }

    @include ipad-s {
        font-size: 24px;
        padding: 10px 29px;
        box-shadow: 0 7px 0 0 $Blue-700;
    }

    &:hover {
        box-shadow: 0 4px 0 0 $Blue-700;
        top: 9px;

        @include ipad-s {
            top: 4px;
        }
    }

    &.is-disabled {
        pointer-events: none;
        background-color: $Blue-500;
        color: #fff;
        top: 0;
        box-shadow: 0 12px 0 0 $Blue-400;

        @include ipad-s {
            box-shadow: 0 3px 0 0 $Blue-400;
        }
    }
}
</style>