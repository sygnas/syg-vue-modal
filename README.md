# syg-vue-modal

Vueで簡易的なモーダルを実装（自分用）。

## Description

Vue.jsでシンプルなモーダルウィンドウを使いたい人向け。
cssも最低限のものしか指定していない。
Youtube埋め込みとかまったく実装していません。


## Release

- 2021.01.16
  - とりあえず作成

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

    <vue-modal v-if="isShowModal" @close="closeModal">
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

### Options

`<vue-modal>`の属性。

| 属性 | 初期値 | 説明 |
| --- | --- | --- |
| closeBtnText| 'X' | 閉じるボタンの内容。html可。 |
| classModal| 'c-modal' | 全体のclass名 |
| classBg| 'c-modal__bg' | 背景のclass名 |
| classSlide| 'c-modal__slide' | 右端にスクロールバーを表示するコンテナのclass名 |
| classContent| 'c-modal__content' | 内容コンテナのclass名 |
| classClose| 'c-modal__close-btn' | 閉じるボタのclass名 |
| styleBgColor| 'rgba(0, 0, 0, .7)' | 背景色 |
| styleZIndex| 10000 | モーダルの z-index |

### Events

#### close

閉じるボタンをトリガーに発行するイベント。
vue-modal は自分自身の表示・非表示を管理しないので、このイベントを受け取った親側で非表示にする。



## License
MIT