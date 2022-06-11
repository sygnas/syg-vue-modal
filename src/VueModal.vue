<script setup lang="ts">
import { defineProps, ref, computed, StyleValue } from "vue";
import { useModalControl } from "./useModalControl";
import $style from "./modal.module.css";
import { TModalOption } from "./types";

type TProps = {
  id: string;
  option: TModalOption;
};

// モーダルのデフォルトオプション
const defaultOption: TModalOption = {
  closeBtnText: "X",
  classModal: "c-modal",
  classBg: "c-modal__bg",
  classSlide: "c-modal__slide",
  classContent: "c-modal__content",
  classClose: "c-modal__close-btn",
  styleBgColor: "rgba(0, 0, 0, .7)",
  styleZIndex: 10000,
  transitionBaseName: "syg-modal-fade",
};

// プロパティ
// モーダルオプションはデフォルト値とマージ
const props = defineProps<TProps>();
const opt = computed<TModalOption>(() => {
  return Object.assign({}, defaultOption, props.option);
});

// css変数を使って背景色と z-index を制御
const modalStyle = ref({});
modalStyle.value = {
  "--modal--bg-color": opt.value.styleBgColor,
  "--modal--z-index": opt.value.styleZIndex,
}

// スクロールコンテナ`slide`、内容物コンテナ`content`
const scrollContainer = ref<HTMLElement | null>(null);
const contentContainer = ref<HTMLElement | null>(null);

/**
 * 内容物の align 変更
 * `slide`より`content`が大きいと align-items:flex-start、それ以外は center にする
 */
const changeAlignItems = () => {
  const scrollCon = scrollContainer.value;
  const contentCon = contentContainer.value;

  if (scrollCon === null || contentCon === null) return;

  if (scrollCon.clientHeight < contentCon.clientHeight) {
    scrollCon.style.alignItems = "flex-start";
  } else {
    scrollCon.style.alignItems = "center";
  }
};


/**
 * モーダル制御と、内容高さチェックの setInterval
 */
let intervalId: number = 0;

const modalControl = useModalControl(props.id, {
  onOpen: (id: string) => {
    modalControl.setScrollContainer(scrollContainer);
    setTimeout(changeAlignItems, 50);
    intervalId = setInterval(changeAlignItems, 500);
  },
  onClose: (id: string) => {
    clearInterval(intervalId);
  },
});

// モーダルが開いているか
const isOpen = computed<boolean>(() => modalControl.isOpen.value);

/**
 * 閉じる
 */
const closeModal = () => {
  modalControl.close();
};
</script>

////////////////////////////////////////////////////////////////////////////////

<template>
  <teleport to="body">
    <transition :name="opt.transitionBaseName">
      <div
        v-if="isOpen"
        :class="[$style.modal, opt.classModal]"
        :style="modalStyle"
      >
        <!-- 背景 -->
        <span
          :class="[$style.modal__bg, opt.classBg]"
          @click="closeModal"
        ></span>

        <!-- overflow:auto でスクロールバーを右端に表示するためのラッパー -->
        <div
          :class="[$style.modal__slide, opt.classSlide]"
          @click="closeModal"
          ref="scrollContainer"
        >
          <!-- 実際のコンテンツ幅を定義するためのコンテナ -->
          <div
            :class="[$style.modal__content, opt.classContent]"
            @click.stop=""
            ref="contentContainer"
          >
            <slot></slot>
          </div>
        </div>

        <!-- 閉じるボタン -->
        <button
          :class="[$style.modal__close_btn, opt.classClose]"
          @click="closeModal"
          v-html="opt.closeBtnText"
        ></button>
      </div>
    </transition>
  </teleport>
</template>

////////////////////////////////////////////////////////////////////////////////

<style>
.syg-modal-fade-leave-active,
.syg-modal-fade-enter-active {
  transition: 0.5s;
}
.syg-modal-fade-leave-to,
.syg-modal-fade-enter-from {
  opacity: 0;
}
.syg-modal-fade-leave-from,
.syg-modal-fade-enter-to {
  opacity: 1;
}
</style>
