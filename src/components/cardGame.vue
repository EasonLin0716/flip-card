<template>
    <div class="content-memory__play-game">
        <!-- 碼表 -->
        <div class="content-memory__play-game__timer">
            <span>花費時間</span>
            <span class="content-memory__play-game__timer__tick">{{ counter }}</span>
        </div>
        <!-- 遊戲 -->
        <div class="content-memory__play-game__section">
            <div v-for="(card, index) in cards" :key="index"
                :class="[{ 'down': card.down && !card.matched, 'up': !card.down, 'matched': card.matched }, ' card']"
                :style="card.down && !card.matched ? cardBackground : {}"
                @click="handleClick(index)">
                <img v-if="card.down" :src="cardBackImgUrl" alt="牌背">
                <img v-else :src="cardImgPath + card.icon" alt="牌背">
            </div>
        </div>
        <!-- 按鈕 -->
        <button v-if="playState === 1" class="content-memory__play-game__btn content-memory__play-game__btn--disabled"
            @click="startGame">挑戰中...</button>
        <button v-else class="content-memory__play-game__btn" @click="startGame">開始遊戲</button>
        <gameResultModal ref="gameResultModal" :counter="counter" @getCoupon="handleGetCoupon" />
        <loseGameModal ref="loseGameModal" @replay="startGame" />
    </div>
</template>

<script>
const IMG_URL = '/'
import gameResultModal from './gameResultModal.vue';
import loseGameModal from './loseGameModal.vue';
// List of font awesome codes used as illustrations, can be modified
const icons = [
    'chick.png',
    'donut.png',
    'heart.png',
    'kitty.png',
    'panda.png',
    'stars.png',
];

// Check if two cards are a match
const checkMatch = (comparing, compared) => {
    return comparing.icon === compared.icon
};

function shuffle(array) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = [...array];
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand];
        result[rand] = result[index];
        result[index] = value;
    }
    return result;
}
// 時間限制(分鐘)
const GAME_LIMIT_MINUTE = 5;

export default {
    name: 'cardGame',
    components: { gameResultModal, loseGameModal },
    data() {
        return {
            timer: null,
            timeBegan: null,
            counter: '0:00.00',
            cards: [],
            cardBackImgUrl: 'https://fakeimg.pl/300x300',
            cardImgPath: `${IMG_URL}`,
            cardBackImgPath1: `https://fakeimg.pl/300x300/ff0000/000`,
            cardBackImgPath2: `https://fakeimg.pl/300x300/00ff00/fff`,
            // 0: 待開始, 1: 遊戲中
            playState: 0,
            // 比較
            comparingIcons: [],
        }
    },
    computed: {
        // make a count of cards up and cards matched, keep icons of cards to check in array
        cardCount() {
            let cardMatchedCount = 0;
            this.cards.forEach((card) => {
                if (card.matched) {
                    cardMatchedCount++;
                }
            });
            return {
                cardsMatched: cardMatchedCount,
            }
        },
        // update victory state
        victory() {
            if (this.cardCount.cardsMatched === this.cards.length) {
                return true;
            }
        },
        cardBackground() {
            return { 'background-image': 'url(' + this.cardBackImgPath2 + '), url(' + this.cardBackImgPath1 + ')' }
        }
    },
    watch: {
        victory(val) {
            if (val) {
                this.handleWin()
            }
        }
    },
    mounted() {
        this.cards = this.initCards(icons.length * 2);
        this.cardsShuffle();
    },
    methods: {
        handleGetCoupon() {
            const customEvt = new CustomEvent('getTicket', {
                detail: {
                    gameType: '1',
                    modalType: 1,
                    couponNum: 1,
                },
            });
            document.dispatchEvent(customEvt);
        },
        startGame() {
            this.cardsShuffle();
            this.startCounter();
            this.playState = 1;
        },
        startGameByClickCard() {
            this.startCounter();
            this.playState = 1;
        },
        cardsShuffle() {
            // prep objects
            this.cards.forEach((_, index) => {
                this.cards[index] = {
                    icon: '',
                    down: true,
                    matched: false,
                }
            });
            // input every icon two times
            icons.forEach((icon, index) => {
                this.cards[index].icon = icon;
                this.cards[index + icons.length].icon = icon;
            });
            this.cards = shuffle(this.cards);
        },
        handleClick(cardIndex) {
            if (this.playState === 0) {
                this.cardsShuffle();
                this.startGameByClickCard();
            }
            const cardClicked = this.cards[cardIndex];
            if (cardClicked.matched || !cardClicked.down) return;
            // turn card up
            cardClicked.down = false;
            this.comparingIcons.push(cardClicked);
            // when two cards are up, check if they match or turn them down
            if (this.comparingIcons.length % 2 === 0) {
                const comparing = this.comparingIcons.pop();
                const compared = this.comparingIcons.pop();
                let match = checkMatch(comparing, compared);
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
        },
        handleWin() {
            this.playState = 0;
            this.stopCounter();
            this.$refs.gameResultModal.openModal();
            const customEvt = new CustomEvent('winCardGame', {});
            document.dispatchEvent(customEvt);
        },
        handleLose() {
            this.playState = 0;
            this.stopCounter();
            this.counter = `${GAME_LIMIT_MINUTE}:00.00`
            this.$refs.loseGameModal.openModal(3);
        },
        startCounter() {
            const count = () => {
                const currentTime = new Date()
                    , timeElapsed = new Date(currentTime - this.timeBegan)
                    , min = timeElapsed.getUTCMinutes()
                    , sec = timeElapsed.getUTCSeconds()
                    , ms = timeElapsed.getUTCMilliseconds();

                this.counter = zeroPrefix(min, 1) + ":" + zeroPrefix(sec, 2) + "." + zeroPrefix(ms, 3).slice(0, 2);

                if (min >= GAME_LIMIT_MINUTE) {
                    setTimeout(() => { this.handleLose() }, 0);
                    return;
                }
            }

            function zeroPrefix(num, digit) {
                let zero = '';
                for (var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }

            if (this.timeBegan !== null) return null;
            this.counter = '0:00.00';
            this.timeBegan = new Date();
            this.timer = setInterval(count, 75);

        },
        stopCounter() {
            clearInterval(this.timer);
            this.timeBegan = null;
        },
        initCards(len) {
            const ary = [];
            for (let i = 0; i < len; i++) {
                ary.push(i);
            }
            return ary;
        },
    },
}
</script>