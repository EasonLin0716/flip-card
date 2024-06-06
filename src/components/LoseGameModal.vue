<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import modal from "@easonlin0716/js-modal";

const elRef = ref<any>(null);

interface Emits {
    (event: 'replay'): void;
};

const emit = defineEmits<Emits>();

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
                <a href="javascript:;" class="close-modal close-modal--tight" @click="closeModal"></a>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';
@import '../styles/_modal.scss';

.get-coupon {
    position: relative;

    @include ipad-s {
        width: 100%;
    }

    p {
        font-size: 32px;
        color: $DarkBlue-600;
        line-height: 1.5;
        margin-bottom: 8px;
        font-weight: bold;

        @include phone-l {
            font-size: 24px;
        }
    }

    span {
        line-height: 1.5;
        color: $DarkBlue-400;
    }

    button {
        margin: 32px auto 0 auto;
    }

    &__wrapper {
        padding: 159px 99px 163px 100px;
        background-position: left 54px top 101px, right 54px bottom 106px,
            center;
        background-repeat: no-repeat;
        background-size: 31px 24px, 31px 25px, contain;
        position: relative;

        @include pc-sm {
            padding: 159px 80px 163px 80px;
            // width: 400px;
        }

        @include ipad-s {
            padding: 126px 79px 125px 73px;
            background-position: left 40px top 90px, right 40px bottom 94px,
                center;
            background-size: 28px 22px, 28px 23px, contain;
        }

        &.get-coupon__wrapper--tight {
            @include pc-sm {
                width: auto;
            }
        }
    }

    &__bg-head {
        position: absolute;
        right: -136px;
        bottom: -196px;
        transform: scaleX(-1) rotate(-8deg);
        width: 242px;

        @include pc-m {
            right: -88px;
            bottom: -138px;
            width: 180px;
        }

        @include pc-mm {
            right: -58px;
            bottom: -118px;
            width: 140px;
        }

        @include pc-sm {
            right: -38px;
            bottom: -52px;
            width: 96px;
        }

        @include ipad-s {
            width: 133px;
            right: -60px;
            bottom: -96px;
        }

        @include ipad-xs {
            right: -32px;
            bottom: -130px;
        }

        @include phone-l {
            right: 4px;
            bottom: -136px;
        }
    }

    a.close-modal {
        @include phone-l {
            right: 32px;
        }

        &.close-modal--tight {
            @include phone-l {
                right: 0;
            }
        }
    }
}
</style>