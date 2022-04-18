<script setup lang="ts">
import { defineProps, withDefaults, ref, onMounted, onBeforeMount, onUnmounted } from 'vue';
import { vueModalOption } from './defaults';
import $style from './modal.module.css';

type TProps = {
  opt: {
    closeBtnText: string;
    classModal: string;
    classBg: string;
    classSlide: string;
    classContent: string;
    classClose: string;
    styleBgColor: string;
    styleZIndex: number;
  },
  handlClose: () => void;
};

const props = withDefaults(defineProps<TProps>(), {
  opt: () => vueModalOption
});
const modalStyle = ref({});
const scrollContainer = ref<any>(null);

/**
 * 閉じる
 */
const closeModal = () => {
  if( props.handlClose ){
    props.handlClose();
  }
};

/**
  * ページ内容が切り替わった時などに指定座標にスクロールさせる。
  * 基本的には 0 を指定してトップに移動させる。
  * 親から anime.js などを使ってスムーズにスクロールさせてもよい
  * 親の this.$refs から this.$refs.modal.scroll(0); のように呼び出す
  */
const scroll = (posY:number, isSmooth=false) => {
  // if(typeof scrollContainer.value !== Element) return;

  scrollContainer.value.scroll({
    top: posY,
    behavior: isSmooth ? 'smooth' : 'instant' as ScrollBehavior,
  });
};

onMounted(() => {
  // css変数を使って背景色と z-index を制御
  modalStyle.value = {
    '--modal--bg-color': props.opt.styleBgColor,
    '--modal--z-index': props.opt.styleZIndex,
  };
  // console.log("option", props.opt);
});

// マウント前後に <body> のスクロールを止める
onBeforeMount(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});

</script>


////////////////////////////////////////////////////////////////////////////////

<template>
  <teleport to="body">
    <div :class="[$style.modal, props.opt.classModal]" :style="modalStyle">
      <!-- 背景 -->
      <span :class="[$style.modal__bg, props.opt.classBg]"></span>

      <!-- overflow:auto でスクロールバーを右端に表示するためのラッパー -->
      <div :class="[$style.modal__slide, props.opt.classSlide]" @click.prevent="closeModal" ref="scrollContainer">

        <!-- 実際のコンテンツ幅を定義するためのコンテナ -->
        <div :class="[$style.modal__content, props.opt.classContent]" @click.stop="">
          <slot></slot>
        </div>

      </div>

      <!-- 閉じるボタン -->
      <button
        :class="[$style.modal__close_btn, props.opt.classClose]"
        @click.prevent="closeModal"
        v-html="props.opt.closeBtnText"
      ></button>
    </div>
  </teleport>
</template>
