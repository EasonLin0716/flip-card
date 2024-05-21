<template>
    <section ref="getCouponModal" class="content-modal">
        <div class="modal-common">
            <div class="get-coupon">
                <!-- 成功領券 -->
                <div v-if="type === 1" class="get-coupon__wrapper">
                    <p>獲得抽獎券 x {{ couponNum }}</p>
                    <span>祝你好運強強滾～</span>
                    <button v-if="isGotAllCoupons" @click="openPrizeRecordModal($event)">看抽獎紀錄</button>
                    <button v-else @click="continueChallenge">繼續挑戰</button>
                </div>
                <!-- 已領券 -->
                <div v-else-if="type === 2" class="get-coupon__wrapper get-coupon__wrapper--tight">
                    <p>這關領過囉！</p>
                    <span>請等候抽獎名單公佈～</span>
                    <button v-if="isGotAllCoupons" @click="openPrizeRecordModal($event)">看抽獎紀錄</button>
                    <button v-else @click="continueChallenge">繼續挑戰</button>
                </div>

                <img class="get-coupon__bg-head" :src="cardImgPath + '/img_head.png'" alt="背景圖">
                <a href="javascript:;" class="close-modal close-modal--tight" @click="closeModal"></a>
            </div>
        </div>
    </section>
</template>

<script>
import modal from "@easonlin0716/js-modal";
const CFG_IMG_URL = ''
export default {
    name: 'gameResultModal',
    data() {
        return {
            cardImgPath: `${CFG_IMG_URL}/active/2022_bestcandidate/`,
            // type  1: 獲得抽獎券 2: 已領過  3: 失敗
            type: 1,
            couponNum: 1,
            // currentStage  string  1: 翻牌遊戲  2: 二星履歷  3: 下載APP
            currentStage: '1',
            isGotAllCoupons: false,
            isLoading: false,
        }
    },
    methods: {
        handleReplay() {
            this.closeModal();
            this.$emit('replay');
        },
        openPrizeRecordModal(e) {
            this.closeModal();
            // 開啟根層中獎modal
            const customEvt = new CustomEvent('openPrizeRecordModal', {});
            document.dispatchEvent(customEvt);
        },
        openModal(type = 1, couponNum = 1, currentStage = '1') {
            this.setIsGotAllCoupons();
            this.type = type;
            this.couponNum = couponNum;
            this.currentStage = currentStage;
            modal.setOptions({ showClose: false, modalClass: 'content-modal', clickClose: false, });
            modal.open(this.$refs.getCouponModal);
        },
        continueChallenge() {
            this.closeModal();
            let scrollVal = 0;
            if (this.currentStage === '1') {
                const target = document.querySelector('#content-performance');
                scrollVal = window.pageYOffset + target.getBoundingClientRect().top;
            } else if (this.currentStage === '2') {
                const target = document.querySelector('#content-action');
                scrollVal = window.pageYOffset + target.getBoundingClientRect().top;
            }
            window.scrollTo(0, scrollVal);
        },
        closeModal() {
            modal.close();
            // modal 關閉 400ms 延遲
            setTimeout(() => {
                this.initData();
            }, 400)
        },
        setIsGotAllCoupons() {
            const couponNotificationNumber = document.querySelector('#coupon-notification-number');
            this.isGotAllCoupons = !couponNotificationNumber || couponNotificationNumber.textContent === '5';
        },
        initData() {
            this.type = 1;
            this.couponNum = 1;
            this.isLoading = false;
        },
    }
}
</script>