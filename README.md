# syg-vue-modal

Vue で簡易的なモーダルを実装（自分用）。

## Description

Vue.js でシンプルなモーダルウィンドウを使いたい人向け。
css も最低限のものしか指定していない。
Youtube 埋め込みとかまったく実装していません。

## Release

- 2022.02.16
  - Vue3 対応
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

Vue2 用は古いバージョンを使う。

```sh
npm install --save @sygnas/vue-modal@^1.1.1
```

### html / JS

```html
<section>
  <div id="app">
    <button @click.prevent="showModal">モーダル表示</button>

    <vue-modal v-if="isShowModal" :handl-close="closeModal" ref="modal">
      モーダルの内容
    </vue-modal>
  </div>
</section>
```

```javascript
import { createApp } from "vue";
import { vueModal } from "@sygnas/vue-modal";

const app = createApp({
  components: {
    vueModal,
  },
  data() {
    return {
      isShowModal: false,
    };
  },
  methods: {
    showModal() {
      this.isShowModal = true;

      setTimeout(() => {
        // ページ先頭にスクロール
        // 0 : Y座標
        // true: スムーススクロールするか
        this.$refs.modal.scroll(0, true);
      }, 100);
    },
    closeModal() {
      this.isShowModal = false;
      console.log("閉じた");
    },
  },
});
```

```css
.c-modal .c-modal__content {
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
<vue-modal
  :opt="{closeBtnText:'CLOSE', styleBgColor:'rgba(255,255,255,.8)'}"
></vue-modal>
```

| パラメーター | 初期値                 | 説明                                              |
| ------------ | ---------------------- | ------------------------------------------------- |
| closeBtnText | 'X'                    | 閉じるボタンの内容。html 可。                     |
| classModal   | 'c-modal'              | 全体の class 名                                   |
| classBg      | 'c-modal\_\_bg'        | 背景の class 名                                   |
| classSlide   | 'c-modal\_\_slide'     | 右端にスクロールバーを表示するコンテナの class 名 |
| classContent | 'c-modal\_\_content'   | 内容コンテナの class 名                           |
| classClose   | 'c-modal\_\_close-btn' | 閉じるボタの class 名                             |
| styleBgColor | 'rgba(0, 0, 0, .7)'    | 背景色                                            |
| styleZIndex  | 10000                  | モーダルの z-index                                |

#### handl-close

モーダルの閉じるボタンが押された時に呼ばれるメソッドを指定。
モーダル自身に閉じる機能は無く、親から `v-if` で制御する。

```html
<vue-modal v-if="isShowModal" :handle-close="closeModal"></vue-modal>
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
