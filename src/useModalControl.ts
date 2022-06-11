import { ref, computed, watch } from "vue";
import { TControlOption, IRef } from "./types";

type TElementRef = IRef<HTMLElement | null>;

type TModalState = {
  id: string;
  isOpen: boolean;
  scrollContainer?: TElementRef | HTMLElement;
  // scrollContainer?: HTMLElement;
};

// モーダルステート一覧を格納
const modals = ref<TModalState[]>([]);

/**
 * モーダルステートを取得
 * 存在しなければ新規に登録したものを返す
 */
const $_getModalState = (id: string): TModalState => {
  let modalState: TModalState | undefined = modals.value.find(
    (modal) => modal.id === id
  );
  if (modalState) return modalState;

  modals.value.push({
    id,
    isOpen: false,
    scrollContainer: undefined,
  });
  return modals.value.find((modal) => modal.id === id) as TModalState;
};

/**
 * モーダルコントローラー
 * @param id モーダルid
 * @param opt onOpen / onClose を指定
 */
const useModalControl = (id: string, opt?: TControlOption) => {
  const $_modalState = $_getModalState(id);

  // 開いているか
  const isOpen = computed<boolean>(() => $_modalState.isOpen);

  // 開いているかを監視して、設定されたメソッドを実行する
  watch(isOpen, (isOpenNext: boolean) => {
    if (isOpenNext && opt && opt.onOpen !== undefined) {
      opt.onOpen($_modalState.id);
    } else if (opt && opt.onClose !== undefined) {
      opt.onClose($_modalState.id);
    }
  });

  /**
   * モーダルを開く
   * <body> のスクロールを止める
   */
  const open = () => {
    $_modalState.isOpen = true;
    document.body.style.overflow = "hidden";
  };

  /**
   * モーダルを閉じる
   * <body> のスクロールを戻す
   */
  const close = () => {
    $_modalState.isOpen = false;
    document.body.style.overflow = "auto";
  };

  /**
   * スクロールコンテナを登録
   */
  const setScrollContainer = (scrollContainer: TElementRef) => {
    $_modalState.scrollContainer = scrollContainer;
  };

  /**
   * 指定座標にスクロールさせる
   * @param posY 座標
   * @param isSmooth スムーススクロールさせるなら true
   * @returns スクロール成功 true / 失敗 false
   */
  const scroll = (posY: number, isSmooth: boolean = false): boolean => {
    // ref() 内の ref() オブジェクトにアクセスするとなぜかアンラップされるので、ここでは HTMLElement として取り出される
    const container = $_modalState.scrollContainer as HTMLElement;

    if (!container) return false;

    container.scroll({
      top: posY,
      behavior: isSmooth ? "smooth" : ("instant" as ScrollBehavior),
    });
    return true;
  };

  return { open, close, scroll, setScrollContainer, isOpen };
};

export { useModalControl };
