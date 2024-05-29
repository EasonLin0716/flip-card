<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import type { Ref } from 'vue';
import apis from '../apis';
import { GetRecordLevelRequestPayloadType, CounterType } from "../constants";
import modal from "@easonlin0716/js-modal";
interface Props {
    counter: CounterType;
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
        const requestPayload: GetRecordLevelRequestPayloadType = {
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
                        <!-- <p>你花了{{ counter | counterTextFilter }}過關</p> -->
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