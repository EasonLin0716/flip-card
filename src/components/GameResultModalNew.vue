<script setup>
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import modal from "@easonlin0716/js-modal";
const IMG_URL = '';
interface Props {
    counter: string;
}
const props = defineProps < Props > ();
const cardImgPath = `${IMG_URL}/path/to`;
const gameResult = ref(null);
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
</script>