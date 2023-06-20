import { ref, computed, watch, defineComponent, openBlock, createBlock, Teleport, createVNode, Transition, unref, withCtx, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, withModifiers, renderSlot, createCommentVNode } from 'vue';

const modals = ref([]);
const $_getModalState = (id) => {
  let modalState = modals.value.find((modal) => modal.id === id);
  if (modalState)
    return modalState;
  modals.value.push({
    id,
    isOpen: false,
    scrollContainer: void 0
  });
  return modals.value.find((modal) => modal.id === id);
};
const useModalControl = (id, opt) => {
  const $_modalState = $_getModalState(id);
  const isOpen = computed(() => $_modalState.isOpen);
  watch(isOpen, (isOpenNext) => {
    if (isOpenNext && opt && opt.onOpen !== void 0) {
      opt.onOpen($_modalState.id);
    } else if (!isOpenNext && opt && opt.onClose !== void 0) {
      opt.onClose($_modalState.id);
    }
  });
  const open = () => {
    $_modalState.isOpen = true;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    $_modalState.isOpen = false;
    document.body.style.overflow = "auto";
  };
  const setScrollContainer = (scrollContainer) => {
    $_modalState.scrollContainer = scrollContainer;
  };
  const scroll = (posY, isSmooth = false) => {
    const container = $_modalState.scrollContainer;
    if (!container)
      return false;
    container.scroll({
      top: posY,
      behavior: isSmooth ? "smooth" : "instant"
    });
    return true;
  };
  return { open, close, scroll, setScrollContainer, isOpen };
};

const modal = "_modal_e1eb1_1";
const modal__bg = "_modal__bg_e1eb1_8";
const modal__slide = "_modal__slide_e1eb1_16";
const modal__content = "_modal__content_e1eb1_27";
const modal__close_btn = "_modal__close_btn_e1eb1_31";
var $style = {
	modal: modal,
	modal__bg: modal__bg,
	modal__slide: modal__slide,
	modal__content: modal__content,
	modal__close_btn: modal__close_btn
};

var VueModal_vue_vue_type_style_index_0_lang = '';

const _hoisted_1 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    id: null,
    option: null
  },
  setup(__props) {
    const props = __props;
    const defaultOption = {
      closeBtnText: "X",
      classModal: "c-modal",
      classBg: "c-modal__bg",
      classSlide: "c-modal__slide",
      classContent: "c-modal__content",
      classClose: "c-modal__close-btn",
      styleZIndex: 1e4,
      transitionBaseName: "syg-modal-fade",
      autoAlign: true
    };
    const opt = computed(() => {
      return Object.assign({}, defaultOption, props.option);
    });
    const modalStyle = ref({});
    modalStyle.value = {
      zIndex: `var(--modal--z-index, ${opt.value.styleZIndex})`
    };
    const scrollContainer = ref(null);
    const contentContainer = ref(null);
    const setScrollContainerAlign = (state) => {
      const scrollCon = scrollContainer.value;
      if (scrollCon === null)
        return;
      scrollCon.style.alignItems = state;
    };
    const changeAlignItems = () => {
      const scrollCon = scrollContainer.value;
      const contentCon = contentContainer.value;
      if (scrollCon === null || contentCon === null)
        return;
      if (scrollCon.clientHeight < contentCon.clientHeight) {
        setScrollContainerAlign("flex-start");
      } else {
        setScrollContainerAlign("center");
      }
    };
    let intervalId = 0;
    const modalControl = useModalControl(props.id, {
      onOpen: (id) => {
        modalControl.setScrollContainer(scrollContainer);
        if (opt.value.autoAlign) {
          setTimeout(changeAlignItems, 50);
          intervalId = setInterval(changeAlignItems, 500);
        } else {
          setTimeout(() => {
            setScrollContainerAlign("flex-start");
          }, 50);
        }
      },
      onClose: (id) => {
        if (opt.value.autoAlign) {
          clearInterval(intervalId);
        }
      }
    });
    const isOpen = computed(() => modalControl.isOpen.value);
    const closeModal = () => {
      modalControl.close();
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          name: unref(opt).transitionBaseName
        }, {
          default: withCtx(() => [
            unref(isOpen) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([unref($style).modal, unref(opt).classModal]),
              style: normalizeStyle(modalStyle.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass([unref($style).modal__bg, unref(opt).classBg]),
                onClick: closeModal
              }, null, 2),
              createElementVNode("div", {
                class: normalizeClass([unref($style).modal__slide, unref(opt).classSlide]),
                onClick: closeModal,
                ref_key: "scrollContainer",
                ref: scrollContainer
              }, [
                createElementVNode("div", {
                  class: normalizeClass([unref($style).modal__content, unref(opt).classContent]),
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"])),
                  ref_key: "contentContainer",
                  ref: contentContainer
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2)
              ], 2),
              createElementVNode("button", {
                class: normalizeClass([unref($style).modal__close_btn, unref(opt).classClose]),
                onClick: closeModal,
                innerHTML: unref(opt).closeBtnText
              }, null, 10, _hoisted_1)
            ], 6)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name"])
      ]);
    };
  }
});

export { _sfc_main as VueModal, useModalControl };
//# sourceMappingURL=vue-modal.es.js.map
