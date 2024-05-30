<script setup lang="ts">
import { computed } from 'vue';
import { PLAY_STATE, PLAY_STATE_TEXT, PlayStateType } from '../constants';

interface Props {
    playState: PlayStateType;
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
        'content-memory__play-game__btn--disabled': isPlaying,
        'content-memory__play-game__btn': true
    }" @click="startGameHandler">{{ buttonText }}</button>
</template>