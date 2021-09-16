<template>
  <div :class="[$style.modal, opt.classModal]" :style="modalStyle">
    <!-- 背景 -->
    <span :class="[$style.modal__bg, opt.classBg]"></span>

    <!-- overflow:auto でスクロールバーを右端に表示するためのラッパー -->
    <div :class="[$style.modal__slide, opt.classSlide]" @click.prevent="closeModal" ref="scrollContainer">

      <!-- 実際のコンテンツ幅を定義するためのコンテナ -->
      <div :class="[$style.modal__content, opt.classContent]" @click.stop="">
        <slot></slot>
      </div>

    </div>

    <!-- 閉じるボタン -->
    <button
      :class="[$style.modal__close_btn, opt.classClose]"
      @click.prevent="closeModal"
      v-html="opt.closeBtnText"
    ></button>
  </div>
</template>

////////////////////////////////////////////////////////////////////////////////
<script>
const defaultOption = {
  closeBtnText: 'X',
  classModal: 'c-modal',
  classBg: 'c-modal__bg',
  classSlide: 'c-modal__slide',
  classContent: 'c-modal__content',
  classClose: 'c-modal__close-btn',
  styleBgColor: 'rgba(0, 0, 0, .7)',
  styleZIndex: 10000,
};

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {};
      },
    },
    closeHndl: {
      type: Function,
      default(){ return ()=>{}; }
    },
  },
  data() {
    return {
      modalStyle: {},
      opt: { ...defaultOption, ...this.option },
    };
  },
  mounted() {
    // css変数を使って背景色と z-index を制御
    this.modalStyle = {
      '--modal--bg-color': this.opt.styleBgColor,
      '--modal--z-index': this.opt.styleZIndex,
    };
  },
  beforeMount() {
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    closeModal() {
      this.closeHndl();
    },
    /**
     * ページ内容が切り替わった時などに指定座標にスクロールさせる。
     * 基本的には 0 を指定してトップに移動させる。
     * 親から anime.js などを使ってスムーズにスクロールさせてもよい
     * 親の this.$refs から this.$refs.modal.scroll(0); のように呼び出す
     */
    scroll(posY, isSmooth=false) {
      this.$refs.scrollContainer.scroll({
        top: posY,
        behavior: isSmooth ? 'smooth' : 'instant',
      });
    },
  },
};
</script>

////////////////////////////////////////////////////////////////////////////////
<style lang="css" module>
.modal {
  z-index: var(--modal--z-index);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.modal__bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal--bg-color);
}
.modal__slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.modal__content {
  position: relative;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}
.modal__close_btn {
  z-index: 1000;
  position: absolute;
  user-select: none;
  appearance: none;
  cursor: pointer;
  outline: none;
}
</style>
