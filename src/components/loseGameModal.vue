<template>
    <section ref="loseGameModal" class="content-modal">
        <div class="modal-common">
            <div class="get-coupon">
                <div class="get-coupon__wrapper get-coupon__wrapper--tight">
                    <p>玩太久囉</p>
                    <span>想加入排行榜得再加把勁</span>
                    <button @click="handleReplay">重新挑戰</button>
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
    name: 'loseGameModal',
    data() {
        return {
            cardImgPath: `${CFG_IMG_URL}/active/2022_bestcandidate/`,
        }
    },
    methods: {
        handleReplay() {
            this.closeModal();
            this.$emit('replay');
        },
        openModal(type = 1, couponNum = 1) {
            this.type = type;
            this.couponNum = couponNum;
            modal.setOptions({ showClose: false, modalClass: 'content-modal', clickClose: false, });
            modal.open(this.$refs.loseGameModal);
        },
        closeModal() {
            modal.close();
        },
    }
}
</script>