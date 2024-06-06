<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import type { Ref } from 'vue';
import apis from '../apis';
import { GetRecordLevelRequestPayload, Counter } from "../constants";
import modal from "@easonlin0716/js-modal";
interface Props {
    counter: Counter;
}
const props = defineProps<Props>();
const elRef = ref<any>(null);
const gameResult = ref(null);
const resultLevel: Ref<number> = ref(0);
const nickName: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);
watch(nickName, (newVal: string, oldVal: string) => {
    const len = newVal.replace(/[^\x00-\xff]/g, "**").length;
    if (len > 12) {
        nickName.value = oldVal;
    } else {
        nickName.value = newVal;
    }
});
const handleSubmit = async () => {
    try {
        isLoading.value = true;
        const requestPayload: GetRecordLevelRequestPayload = {
            nickName: nickName.value,
            counter: props.counter,
        }
        const { data = {
            level: 0,
        } } = await apis.getRecordLevel(requestPayload);
        if (data.level !== undefined) {
            resultLevel.value = data.level;
        } else {
            throw new Error('Missing level in response data');
        }
    } catch (e) {
        console.error(e);
    } finally {
        isLoading.value = false;
    }
}
const openModal = () => {
    modal.setOptions({ clickClose: false, });
    modal.open(elRef.value);
}
const closeModal = () => {
    gameResult.value = null;
    modal.close();
}
defineExpose({
    openModal,
    closeModal,
});
</script>
<template>
    <section ref="elRef" class="content-modal">
        <div class="modal-common">
            <div class="modal-common__wrapper">
                <template v-if="resultLevel === 0">
                    <div class="game-result__info game-result__info--success">
                        <p>Wow！挑戰成功</p>
                        <p>你花了{{ props.counter }}過關</p>
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
                        <div v-if="resultLevel" class="game-result__info__boarding">
                            <label class="game-result__info__invite">你超強，排名第 {{ resultLevel }} 名！</label>
                        </div>
                        <div v-else class="game-result__info__invite game-result__info__boarding">
                            <label class="game-result__info__invite">雖然沒進入排行榜，再挑戰一次也不錯！</label>
                        </div>
                    </div>
                    <div class="game-result__actions">
                        <button @click="closeModal">關閉視窗</button>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';
@import '../styles/_modal.scss';

.game-result {
    &__info {
        margin: 32px 0 40px 0;

        @include ipad-s {
            margin: 24px 0 32px 0;
        }

        p {
            line-height: 1.5;
            text-align: center;
            color: $DarkBlue-600;
            font-size: 24px;
            font-weight: bold;
        }

        &.game-result__info--success p {
            @include ipad-s {
                font-size: 20px;
            }
        }

        &__invite {
            display: block;
            text-align: center;
            color: $DarkBlue-400;
            font-size: 18px;
            line-height: 1.5;

            @include ipad-s {
                font-size: 16px;
                margin-bottom: 0;
            }
        }
    }

    &__form {
        input {
            width: 100%;
            max-width: 312px;
            border: 2px solid $DarkBlue-200;
            border-radius: 8px;
            color: $DarkBlue-800;
            font-size: 18px;
            padding: 12px 0;
            text-align: center;
            margin-bottom: 72px;

            @include pc-sm {
                margin-bottom: 48px;
            }

            @include phone-l {
                margin-bottom: 56px;
            }
        }

        label {
            display: block;
            text-align: center;
            color: $DarkBlue-400;
            font-size: 18px;
            margin-bottom: 16px;

            @include ipad-s {
                font-size: 16px;
                margin-bottom: 12px;
            }
        }
    }

    &__btn {
        &:before {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-radius: 50%;
            border: 0 none;
            margin-right: 0;
            transition: all 0.5s;
        }

        &--black {
            box-shadow: 0 7px 0 0 $DarkBlue-800 !important;
            background-color: $DarkBlue-500 !important;
            color: #fff !important;
            position: relative;

            &:hover {
                top: 4px;
                box-shadow: 0 3px 0 0 $DarkBlue-800 !important;
            }
        }

        &.game-result__btn--disabled,
        &.game-result__btn--loading {
            pointer-events: none;
            background-color: $Blue-500;
            color: #fff;
            box-shadow: 0 7px 0 0 $Blue-400;

            @include ipad-s {
                box-shadow: 0 3px 0 0 $Blue-400;
            }
        }

        &--loading:before {
            width: 20px;
            height: 20px;
            border: 2px solid #99ccff;
            border-top-color: white;
            margin-right: 10px;
            animation: rotating 1s infinite;
        }
    }
}
</style>