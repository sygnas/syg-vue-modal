<script>
import Vue from 'vue';
import VueModal from '@/vue-modal.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueModal
  },
  data(){
    return {
      isShowModal: false,
    };
  },
  methods:{
    showModal(){
      this.isShowModal = true;
    },
    closeModal(){
      this.isShowModal = false;
      console.log("閉じた");
    },
  },
});
</script>

<template>
  <div id="app">

    <button @click.prevent="showModal">モーダル表示</button>

    <vue-modal v-if="isShowModal" @close="closeModal">
      モーダルの内容
    </vue-modal>
  </div>
</template>

<style>
  .c-modal .c-modal__content{
    background-color: #fff;
    width: 100%;
    max-width: 600px;
    padding: 4rem;
  }
</style>
