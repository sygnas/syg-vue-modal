type TModalOption = {
  closeBtnText?: string;
  classModal?: string;
  classBg?: string;
  classSlide?: string;
  classContent?: string;
  classClose?: string;
  styleZIndex?: number;
  transitionBaseName?: string;
  autoAlign?: boolean;
};

type TControlOption = {
  onOpen?: (id: string) => void;
  onClose?: (id: string) => void;
};

interface IRef<T> {
  value: T;
}

export type { TModalOption, TControlOption, IRef };
