<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import modal from "@easonlin0716/js-modal";

const IMG_URL = '';
const cardImgPath = `${IMG_URL}/path/to`;

const elRef = ref<HTMLElement | null>(null);

const emit = defineEmits(['replay']);

const handleReplay = () => {
    closeModal();
    emit('replay');
};

const openModal = () => {
    modal.setOptions({
        showClose: false,
        modalClass: 'content-modal',
        clickClose: false,
    });
    modal.open(elRef.value);
};

const closeModal = () => {
    modal.close();
};
defineExpose({
    openModal,
    closeModal,
});
</script>

<template>
    <section ref="elRef" class="content-modal">
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