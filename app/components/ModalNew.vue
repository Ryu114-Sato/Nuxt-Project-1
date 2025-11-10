<template>
  <div v-if="modelValue" class="fixed inset-0 z-50">
    <!-- overlay -->
    <div class="absolute inset-0 bg-black/50" @click="onBackdrop" />

    <!-- panel wrapper -->
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <!-- panel（スクショ準拠：白・角丸・薄いボーダー・影） -->
      <div
        class="w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <!-- header：左にタイトル、右に× -->
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="text-base font-semibold text-gray-900">
            <slot name="title">購入内容確認</slot>
          </h2>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="閉じる"
            @click="close('cancel')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- body：スロット（見出し・ボックスは親側で構成） -->
        <div class="px-6 py-6">
          <slot />
        </div>

        <!-- actions：縦積み（上：主ボタン、下：アウトライン） -->
        <div class="px-6 pb-6">
          <slot name="actions">
            <div class="grid gap-3">
              <button
                type="button"
                class="w-full rounded-md bg-gray-800 px-3 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                @click="close('confirm')"
              >
                注文確定する
              </button>
              <button
                type="button"
                class="w-full rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                @click="close('cancel')"
              >
                戻る
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { string } from "zod";

const props = defineProps<{
  modelValue: boolean;
  closeOnBackdrop?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const close = (st: string) => {
  /* 
    　・モーダルを閉じる処理
    　・閉じたらmodalValue をfalseにして親に値を渡す
     */
  if (st === "confirm") {
    console.log("st", st);
    emit("confirm");
  } else {
    emit("cancel");
  }
  emit("update:modelValue", false);
};

function onBackdrop() {
  if (props.closeOnBackdrop !== false) {
    close("cancel");
  }
}
/*
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) {
    close();
    emit("cancel");
  }
}
  */

//onMounted(() => window.addEventListener("keydown", onKey));
//onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>