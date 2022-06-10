import { ref, computed } from "vue";
import { TModalOption, TControlOption } from "./types";

type TModalState = {
  id: string;
  isOpen: boolean;
};

// モーダルステート一覧を格納
const modals = ref<TModalState[]>([]);

/**
 * モーダルステートを取得
 */
const $_getModalState = (id: string): TModalState => {
  let modalState: TModalState | undefined = modals.value.find(
    (modal) => modal.id === id
  );
  console.log("既存ある？", modalState);

  if (modalState) return modalState;
  console.log("既存なかった");

  modals.value.push({
    id,
    isOpen: false,
  });
  return modals.value.find((modal) => modal.id === id) as TModalState;
};

/**
 * モーダルコントローラー
 * @param id モーダルid
 * @param opt 変更したいオプション
 */
const useModalControl = (id: string, opt?: TControlOption) => {
  const $_modalState = $_getModalState(id);

  // 開いているか
  const isOpen = computed<boolean>(() => $_modalState.isOpen);

  /**
   * モーダルを開く
   */
  const open = () => {
    $_modalState.isOpen = true;
    // <body> のスクロールを止める
    document.body.style.overflow = "hidden";
    console.log("open", $_modalState);

    // イベント実行
    if (opt && opt.onOpen) {
      opt.onOpen($_modalState.id);
    }
  };

  /**
   * モーダルを閉じる
   */
  const close = () => {
    $_modalState.isOpen = false;
    // <body> のスクロールを戻す
    document.body.style.overflow = "auto";
    console.log("close", $_modalState);

    // イベント実行
    if (opt && opt.onOpen) {
      opt.onClose($_modalState.id);
    }
  };

  return { open, close, isOpen };
};

export { useModalControl };
