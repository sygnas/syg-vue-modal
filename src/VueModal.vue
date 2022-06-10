<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { useModalControl } from './useModalControl';
import $style from './modal.module.css';
import { TModalOption } from './types';

type TProps = {
  id: string;
  option: TModalOption;
};

const defaultOption: TModalOption = {
  closeBtnText: 'X',
  classModal: 'c-modal',
  classBg: 'c-modal__bg',
  classSlide: 'c-modal__slide',
  classContent: 'c-modal__content',
  classClose: 'c-modal__close-btn',
  styleBgColor: 'rgba(0, 0, 0, .7)',
  styleZIndex: 10000,
};

// モーダルオプション
// デフォルト値とマージ
const props = defineProps<TProps>();
const opt = computed<TModalOption>(() => {
  return Object.assign({}, defaultOption, props.option);
});

// css変数を使って背景色と z-index を制御
const modalStyle = ref({});
modalStyle.value = {
  '--modal--bg-color': opt.value.styleBgColor,
  '--modal--z-index': opt.value.styleZIndex,
};

// モーダル制御
const modalControl = useModalControl(props.id);
// モーダルが開いているか
const isOpen = computed<boolean>(()=> modalControl.isOpen.value);

// const scrollContainer = ref<any>(null);

/**
 * 閉じる
 */
const closeModal = () => {
  console.log("閉じるボタン");
  modalControl.close();
};

/**
 * ページ内容が切り替わった時などに指定座標にスクロールさせる。
 * 基本的には 0 を指定してトップに移動させる。
 * 親から anime.js などを使ってスムーズにスクロールさせてもよい
 * 親の this.$refs から this.$refs.modal.scroll(0); のように呼び出す
 */
// const scroll = (posY:number, isSmooth=false) => {
//   // if(typeof scrollContainer.value !== Element) return;

//   scrollContainer.value.scroll({
//     top: posY,
//     behavior: isSmooth ? 'smooth' : 'instant' as ScrollBehavior,
//   });
// };
</script>

////////////////////////////////////////////////////////////////////////////////

<template>
  <div :class="[$style.modal, opt.classModal]" :style="modalStyle">
    <!-- 背景 -->
    <span :class="[$style.modal__bg, opt.classBg]" @click="closeModal"></span>

    <!-- overflow:auto でスクロールバーを右端に表示するためのラッパー -->
    <div :class="[$style.modal__slide, opt.classSlide]" @click="closeModal" ref="scrollContainer">
      <!-- 実際のコンテンツ幅を定義するためのコンテナ -->
      <div :class="[$style.modal__content, opt.classContent]">
        <slot></slot>
      </div>
    </div>

    <!-- 閉じるボタン -->
    <button :class="[$style.modal__close_btn, opt.classClose]" @click="closeModal" v-html="opt.closeBtnText"></button>
  </div>
</template>
