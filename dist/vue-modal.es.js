import { defineComponent, ref, onMounted, onBeforeMount, onUnmounted, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, withModifiers, renderSlot } from 'vue';

const modal = "_modal_1id1z_2";
const modal__bg = "_modal__bg_1id1z_10";
const modal__slide = "_modal__slide_1id1z_18";
const modal__content = "_modal__content_1id1z_26";
const modal__close_btn = "_modal__close_btn_1id1z_32";
var style0 = {
	modal: modal,
	modal__bg: modal__bg,
	modal__slide: modal__slide,
	modal__content: modal__content,
	modal__close_btn: modal__close_btn
};

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onClick", "innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    opt: { default: () => {
      return {
        closeBtnText: "X",
        classModal: "c-modal",
        classBg: "c-modal__bg",
        classSlide: "c-modal__slide",
        classContent: "c-modal__content",
        classClose: "c-modal__close-btn",
        styleBgColor: "rgba(0, 0, 0, .7)",
        styleZIndex: 1e4
      };
    } },
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
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([_ctx.$style.modal, props.opt.classModal]),
        style: normalizeStyle(modalStyle.value)
      }, [
        createElementVNode("span", {
          class: normalizeClass([_ctx.$style.modal__bg, props.opt.classBg])
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass([_ctx.$style.modal__slide, props.opt.classSlide]),
          onClick: withModifiers(closeModal, ["prevent"]),
          ref_key: "scrollContainer",
          ref: scrollContainer
        }, [
          createElementVNode("div", {
            class: normalizeClass([_ctx.$style.modal__content, props.opt.classContent]),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ], 10, _hoisted_1),
        createElementVNode("button", {
          class: normalizeClass([_ctx.$style.modal__close_btn, props.opt.classClose]),
          onClick: withModifiers(closeModal, ["prevent"]),
          innerHTML: props.opt.closeBtnText
        }, null, 10, _hoisted_2)
      ], 6);
    };
  }
});
const cssModules = {
  "$style": style0
};
var vueModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);

export { vueModal };
//# sourceMappingURL=vue-modal.es.js.map
