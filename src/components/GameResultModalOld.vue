<template>
    <section ref="gameResultModal" class="content-modal">
        <div class="modal-common">
            <div class="modal-common__wrapper">
                <a href="javascript:;" class="close-modal" @click="closeModal"></a>
                <div class="content-modal__title">
                    <img v-if="gameResult === null" :src="cardImgPath + 'img_title_pop_game.svg'" alt="你就棒">
                    <img v-else :src="cardImgPath + 'img_title_pop_congrats.svg'" alt="恭喜你">
                </div>
                <template v-if="gameResult === null">
                    <div class="game-result__info game-result__info--success">
                        <p>Wow！挑戰成功</p>
                        <!-- <p>你花了{{ counter | counterTextFilter }}過關</p> -->
                        <p>你花了{{ counter }}過關</p>
                    </div>
                    <div class="game-result__form">
                        <label for="player-name">輸入暱稱：</label>
                        <input v-model="nickName" name="player-name" type="text" placeholder="限六個字" />
                        <button
                            :class="{ 'game-result__btn--loading': isLoading, 'game-result__btn--disabled': nickName === '' }"
                            class="game-result__btn" @click="handleSubmit">下一步</button>
                    </div>
                </template>
                <template v-else>
                    <div class="game-result__info">
                        <p>可獲得 Apple 3C 抽獎券</p>
                        <div v-if="gameResult && gameResult.level" class="game-result__info__boarding">
                            <label class="game-result__info__invite">你超強，排名第 {{ gameResult.level }} 名！</label>
                            <label class="game-result__info__invite">趕快邀請朋友一起來挑戰！</label>
                        </div>
                        <div v-else class="game-result__info__invite game-result__info__boarding">
                            <label class="game-result__info__invite">雖然沒進入排行榜</label>
                            <label class="game-result__info__invite">但沒關係快號召朋友一起來挑戰！</label>
                        </div>
                    </div>
                    <div class="game-result__actions">
                        <button @click="handleGetCoupon">領抽獎券</button>
                        <button @click="handleShareGameResultToFacebook" class="game-result__btn--black">分享戰績</button>
                    </div>
                </template>
                <img class="modal-common__bg-head" :src="cardImgPath + '/img_head.png'" alt="背景圖">
            </div>
        </div>
    </section>
</template>
<script>
import modal from "@easonlin0716/js-modal";
const IMG_URL = ''
export default {
    name: 'gameResultModal',
    filters: {
        // counterTextFilter(value) {
        //     return value.replace(':', '分').replace('.', '秒');
        // },
    },
    props: {
        counter: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            cardImgPath: `${IMG_URL}/path/to`,
            gameResult: null,
            nickName: '',
            isLoading: false,
        }
    },
    watch: {
        nickName(newVal, oldVal) {
            const len = newVal.replace(/[^\x00-\xff]/g, "**").length;
            if (len > 12) this.nickName = oldVal
            else this.nickName = newVal;
        }
    },
    methods: {
        handleSubmit() {
            this.isLoading = true;
            const ts = Date.now() + ''; //timestamp
            const data = this.createFormData({
                module: 'active',
                action: 'setMemoryMatchingGameNewRecord',
                payload: `${this.nickName},${this.counter},${ts},${getDigit(this.counter, ts.slice(-6))}`,
            })
            // axios.post('/ajax/', data).then((res) => {
            //     const { data: gameResult } = res;
            //     if (gameResult.status === true) {
            //         // 為前六名
            //         this.gameResult = {};
            //         if (gameResult.level) {
            //             this.gameResult.level = gameResult.level;
            //             this.handleRenderNewRecordToBoard(gameResult.level);
            //         }
            //     } else {
            //         alert(gameResult.msg)
            //     }
            // }).catch(() => {
            //     alert('伺服器忙碌中，請稍後再試！');
            // }).finally(() => {
            //     this.isLoading = false;
            // });
        },
        handleGetCoupon() {
            this.closeModal();
            this.$emit('getCoupon');
        },
        handleShareGameResultToFacebook() {
            // should be removed
        },
        handleRenderNewRecordToBoard(level) {
            if (!level) return;
            // TODO: set new record
        },
        openModal() {
            modal.setOptions({ showClose: false, modalClass: 'content-modal', clickClose: false, });
            modal.open(this.$refs.gameResultModal);
        },
        closeModal() {
            this.gameResult = null;
            modal.close();
        },
        /**
         * 建立 post 用的 formData
         * @param {object} postParam 
         */
        createFormData(postParam = {}) {
            var data = new FormData();
            for (var index in postParam) {
                data.append(index, postParam[index]);
            }
            return data;
        },
        getDigit(a, b) {
            function addDigit(num) {
                if (num === 0) return 0;
                if (num % 9 === 0) return 9;
                return num % 9;
            }
            const aWithNum = a.replace(/:|\./g, '');
            return addDigit(Number(aWithNum + b));
        }
    }
}
</script>