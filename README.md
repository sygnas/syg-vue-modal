# syg-vue-modal

Vue で簡易的なモーダルを実装（自分用）。

## Description

- Vue3 でシンプルなモーダルウィンドウを使いたい人向け。
- css も最低限のものしか指定していない。
- Youtube 埋め込みとかまったく実装していません。
- モーダルの開閉は useModalControl() で作成したインスタンス経由で行う。

## Latest Release

- 2022.07.29 : ver.3.0.4
  - README.md に isOpen の説明を追加。
  - package.json に types を追加。
- 2022.06.12 : ver.3.0.2
  - onClose() を実行する条件を修正
  - type TModalOption を export に追加。
- 2022.06.11 : ver.3.0.0
  - useModalControl() を使う方式に刷新。
  - それ以前との互換性なし。

## Usage

### Install

```sh
npm install --save @sygnas/vue-modal
```

Vue2 は過去バージョンを使う。

```sh
npm install --save @sygnas/vue-modal@^1.1.1
```

### html / JS

```html
<section>
  <div id="app">
    <button @click.prevent="showModal">モーダル表示</button>

    <vue-modal id="modal-1" :option="modalOption">
      モーダルの内容
    </vue-modal>
  </div>
</section>
```

```javascript
import { createApp } from "vue";
// VueModal本体とデフォルトオプション
import { VueModal, useModalControl } from "@sygnas/vue-modal";
// モーダル用CSS
import "@sygnas/vue-modal/css";

// モーダルのオプション
const modalOption = {
  closeBtnText: "CLOSE",
  styleBgColor: "rgba(0,0,0,0.9)",
};

// モーダルコントローラー
// <vue-modal> に付与した id と同じ文字列を与える
// モーダルの開閉、スクロール、開閉時イベント設定などはコントローラー経由で行う
const modalControl = useModalControl('modal-1', {
  onOpen: (id) => {
    console.log('modal open');
  },
  onClose: (id) => {
    console.log('modal close');
  },
});

const app = createApp({
  components: {
    VueModal,
  },
  data() {
    return {
      modalOption,
    };
  },
  methods: {
    showModal() {
      // モーダル開く
      modalControl.open();
      // 0.1秒後にページ先頭にスムーススクロール
      setTimeout(() => {
        modalControl.scroll(0, true);
      }, 100);
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
<vue-modal :option="modalOption"></vue-modal>
```

```js
const modalOption = {
  closeBtnText: "CLOSE",
  styleBgColor: "rgba(0,0,0,0.9)",
};
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
| transitionBaseName | 'syg-modal-fade' | &lt;transition name=""&gt; の指定 |


## Control

`useModalControl()` でインスタンスを作成し、開閉などはインスタンス経由で行う。

```js
const modalControl = useModalControl(id, option);
modalControl.open();
modalControl.scroll(1);
```

### useModalControl(id, option)

| 引数 | 初期値 | 説明 |
| --- | --- | --- |
| id | undefined | 【必須】&lt;vue-modal id="`モーダルID`"&gt; と同じ文字列 |
| option | undefined | 開閉時に実行する関数を登録。`{onOpen, opClose}` |

```js
const modalControl = useModalControl('modal-1', {
  onOpen: (id) => {
    console.log('modal open');
  },
  onClose: (id) => {
    console.log('modal close');
  },
});
```

### isOpen

モーダルの開閉状態。

```js
console.log(modalControl.isOpen); // true / false
```


### open()

モーダルを開く。

```js
modalControl.open();
```

### close()

モーダルを閉じる。
`<vue-modal>` 自身で閉じるので使う機会は少ない。

```js
modalControl.close();
```

### scroll(posY, isSmooth = false)

指定座標 `posY` にスクロールする。
`isSmooth` に `true` を指定するとスムーススクロールになる。

```js
modalControl.scroll(0, true);
```

## License

MIT

## Release

- 2022.04.18
  - サンプルに `import "@sygnas/vue-modal/css";` 行を追加。
  - オプションの初期値を読み込んで `Object.assign()` する方式に変更。
- 2022.03.15
  - css モジュールが適用されていないのを修正
- 2022.02.16
  - Vue3 対応
- 2021.09.16
  - モーダルを閉じるイベント v-on:close を使わず、 v-bind:closeHndl に メソッドを渡す方法に変更。
- 2021.04.07
  - 親からスクロールさせるための関数 scroll() を追加。
- 2021.01.16
  - とりあえず作成。
