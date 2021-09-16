# syg-vue-modal

Vueで簡易的なモーダルを実装（自分用）。

## Description

Vue.jsでシンプルなモーダルウィンドウを使いたい人向け。
cssも最低限のものしか指定していない。
Youtube埋め込みとかまったく実装していません。


## Release

- 2021.09.16
  - モーダルを閉じるイベント v-on:close を使わず、 v-bind:closeHndl に メソッドを渡す方法に変更。
- 2021.04.07
  - 親からスクロールさせるための関数 scroll() を追加。
- 2021.01.16
  - とりあえず作成。

## Usage

### Install

```sh
npm install --save @sygnas/vue-modal
```

### html / JS

```html
<section>
  <div id="app">

    <button @click.prevent="showModal">モーダル表示</button>

    <vue-modal v-if="isShowModal" :closeHndl="closeModal" ref="modal">
      モーダルの内容
    </vue-modal>

  </div>
</section>
```

```javascript
import Vue from 'vue';
import VueTabs from '@sygnas/vue-tabs';

  new Vue({
    el: '#app',
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

        setTimeout(()=>{
          // ページ先頭にスクロール
          // 0 : Y座標
          // true: スムーススクロールするか
          this.$refs.modal.scroll(0, true);
        }, 100);
      },
      closeModal(){
        this.isShowModal = false;
        console.log("閉じた");
      },
    },
  });
```

```css
.c-modal .c-modal__content{
  background-color: #fff;
  width: 100%;
  max-width: 600px;
  padding: 4rem;
}
```

### Attributes

#### option

モーダルの外見に関する設定。

```html
<vue-modal :option="{closeBtnText:'CLOSE', styleBgColor:'rgba(255,255,255,.8)'}">
```

| パラメーター | 初期値 | 説明 |
| --- | --- | --- |
| closeBtnText| 'X' | 閉じるボタンの内容。html可。 |
| classModal| 'c-modal' | 全体のclass名 |
| classBg| 'c-modal__bg' | 背景のclass名 |
| classSlide| 'c-modal__slide' | 右端にスクロールバーを表示するコンテナのclass名 |
| classContent| 'c-modal__content' | 内容コンテナのclass名 |
| classClose| 'c-modal__close-btn' | 閉じるボタのclass名 |
| styleBgColor| 'rgba(0, 0, 0, .7)' | 背景色 |
| styleZIndex| 10000 | モーダルの z-index |


#### closeHndl

モーダルの閉じるボタンが押された時に呼ばれるメソッドを指定。
モーダル自身に閉じる機能は無く、親から `v-if` で制御する。

```html
<vue-modal v-if="isShowModal" :closeHndl="closeModal">
```
```javascript
methods: {
  closeModal(){
    this.isShowModal = false;
  },
},
```


### Methods

#### scroll(posY, isSmooth=true)

指定座標`posY`にスクロールする。
`isSmooth`に`true`を指定するとスムーススクロールになる。

記述方法は上記のサンプル参照。


## License
MIT