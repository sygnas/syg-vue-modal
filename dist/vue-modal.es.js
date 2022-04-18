import { defineComponent, ref, onMounted, onBeforeMount, onUnmounted, openBlock, createBlock, Teleport, createElementVNode, normalizeClass, unref, normalizeStyle, withModifiers, renderSlot } from 'vue';

const vueModalOption = {
  closeBtnText: "X",
  classModal: "c-modal",
  classBg: "c-modal__bg",
  classSlide: "c-modal__slide",
  classContent: "c-modal__content",
  classClose: "c-modal__close-btn",
  styleBgColor: "rgba(0, 0, 0, .7)",
  styleZIndex: 1e4
};

const modal = "_modal_2z4x2_1";
const modal__bg = "_modal__bg_2z4x2_9";
const modal__slide = "_modal__slide_2z4x2_17";
const modal__content = "_modal__content_2z4x2_25";
const modal__close_btn = "_modal__close_btn_2z4x2_31";
var $style = {
	modal: modal,
	modal__bg: modal__bg,
	modal__slide: modal__slide,
	modal__content: modal__content,
	modal__close_btn: modal__close_btn
};

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onClick", "innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    opt: { default: () => vueModalOption },
    handlClose: null
  },
  setup(__props) {
    const props = __props;
    const modalStyle = ref({});
    const scrollContainer = ref(null);
    const closeModal = () => {
      if (props.handlClose) {
        props.handlClose();
      }
    };
    onMounted(() => {
      modalStyle.value = {
        "--modal--bg-color": props.opt.styleBgColor,
        "--modal--z-index": props.opt.styleZIndex
      };
    });
    onBeforeMount(() => {
      document.body.style.overflow = "hidden";
    });
    onUnmounted(() => {
      document.body.style.overflow = "auto";
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createElementVNode("div", {
          class: normalizeClass([unref($style).modal, props.opt.classModal]),
          style: normalizeStyle(modalStyle.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass([unref($style).modal__bg, props.opt.classBg])
          }, null, 2),
          createElementVNode("div", {
            class: normalizeClass([unref($style).modal__slide, props.opt.classSlide]),
            onClick: withModifiers(closeModal, ["prevent"]),
            ref_key: "scrollContainer",
            ref: scrollContainer
          }, [
            createElementVNode("div", {
              class: normalizeClass([unref($style).modal__content, props.opt.classContent]),
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2)
          ], 10, _hoisted_1),
          createElementVNode("button", {
            class: normalizeClass([unref($style).modal__close_btn, props.opt.classClose]),
            onClick: withModifiers(closeModal, ["prevent"]),
            innerHTML: props.opt.closeBtnText
          }, null, 10, _hoisted_2)
        ], 6)
      ]);
    };
  }
});

export { _sfc_main as vueModal, vueModalOption };
//# sourceMappingURL=vue-modal.es.js.map
