<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { shuffleCards, checkMatch, zeroPrefix } from './utils';
import { GAME_LIMIT_MINUTE, icons, Counter, Card, PlayState } from './constants';
import GameTimer from './components/GameTimer.vue';
import ChallengeBtn from './components/ChallengeBtn.vue';
import GameCard from './components/GameCard.vue';
import GameResultModal from './components/GameResultModal.vue';
import LoseGameModal from './components/LoseGameModal.vue';
import type { Ref } from 'vue'
type CardCount = {
    cardsMatched: number;
}
const GameResultModalRef = ref<any>(null);
const LoseGameModalRef = ref<any>(null);
const timer: Ref<number> = ref(0);
const timeBegan: Ref<number> = ref(0);
const counter: Ref<Counter> = ref('0:00.00');
const cards: Ref<Card[]> = ref([]);
const playState: Ref<PlayState> = ref(0);
const comparingIcons: Ref<Card[]> = ref([]);
const cardCount = computed<CardCount>(() => {
    let cardMatchedCount = 0;
    cards.value.forEach((card) => {
        if (card.matched) {
            cardMatchedCount++;
        }
    });
    return {
        cardsMatched: cardMatchedCount,
    }
});
const victory = computed<boolean>(() => {
    if (cardCount.value.cardsMatched === cards.value.length) {
        return true;
    } return false;
});
watch(victory, (isWin: boolean) => {
    if (isWin === true) {
        handleWin();
    }
});
onMounted(() => {
    cardsShuffle();
});
const startGame = () => {
    cardsShuffle();
    startCounter();
    playState.value = 1;
}
const startGameByClickCard = () => {
    startCounter()
    playState.value = 1;
}
const cardsShuffle = () => {
    const initialCardIndex: Array<Number> = getValueWithNumbers(icons.length * 2);
    cards.value = initialCardIndex.map(() => ({
        icon: '',
        down: true,
        matched: false,
    }));
    icons.forEach((icon, index) => {
        cards.value[index].icon = icon;
        cards.value[index + icons.length].icon = icon;
    });
    cards.value = shuffleCards(cards.value);
}
const handleClick = (cardIndex: number) => {
    if (playState.value === 0) {
        cardsShuffle();
        startGameByClickCard();
    }
    const cardClicked: Card = cards.value[cardIndex];
    if (cardClicked.matched || !cardClicked.down) return;
    cardClicked.down = false;
    comparingIcons.value.push(cardClicked);
    if (comparingIcons.value.length % 2 === 0 && comparingIcons.value.length > 0) {
        const comparing: Card | undefined = comparingIcons.value.pop();
        const compared: Card | undefined = comparingIcons.value.pop();
        if (comparing && compared) {
            const match: boolean = checkMatch(comparing, compared);
            setTimeout(() => {
                if (match && !comparing.matched && !compared.matched) {
                    comparing.matched = true;
                    compared.matched = true;
                } else {
                    comparing.down = true;
                    compared.down = true;
                }
            }, 1000);
        }
    }
}
const handleWin = () => {
    playState.value = 0;
    stopCounter();
    GameResultModalRef.value.openModal();
}
const handleLose = () => {
    playState.value = 0;
    stopCounter();
    counter.value = `${GAME_LIMIT_MINUTE}:00.00`
    LoseGameModalRef.value.openModal();
}
const startCounter = () => {
    const _count = () => {
        const currentTime: number = Date.now();
        const timeElapsed: Date = new Date(currentTime - timeBegan.value);
        const min: number = timeElapsed.getUTCMinutes();
        const sec: number = timeElapsed.getUTCSeconds();
        const ms: number = timeElapsed.getUTCMilliseconds();
        counter.value = `${zeroPrefix(min, 1)}:${zeroPrefix(sec, 2)}.${zeroPrefix(ms, 3).slice(0, 2)}`;

        if (min >= GAME_LIMIT_MINUTE) {
            setTimeout(() => { handleLose() }, 0);
            return;
        }
    }
    if (timeBegan.value !== 0) return null;
    counter.value = '0:00.00';
    timeBegan.value = Date.now();
    timer.value = setInterval(_count, 75);
}
const stopCounter = () => {
    if (timer.value !== 0) {
        clearInterval(timer.value);
        timer.value = 0;
    }
    timeBegan.value = 0;
}
const getValueWithNumbers = (len: number): Array<number> => {
    const ary: Array<number> = [];
    for (let i = 0; i < len; i++) {
        ary.push(i);
    }
    return ary;
}
</script>

<template>
    <div class="content-memory__play-game">
        <GameTimer :counter="counter" />
        <div class="content-memory__play-game__section">
            <GameCard v-for="(card, index) in cards" :key="index" :card="card" @cardClick="handleClick(index)" />
        </div>
        <ChallengeBtn :playState="playState" @startGame="startGame" />
        <GameResultModal ref="GameResultModalRef" :counter="counter" />
        <LoseGameModal ref="LoseGameModalRef" @replay="startGame" />
    </div>
</template>