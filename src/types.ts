type TModalOption = {
  closeBtnText: string;
  classModal: string;
  classBg: string;
  classSlide: string;
  classContent: string;
  classClose: string;
  styleBgColor: string;
  styleZIndex: number;
};

type TControlOption = {
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
};

export type { TModalOption, TControlOption };
