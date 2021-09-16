//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const defaultOption = {
  closeBtnText: 'X',
  classModal: 'c-modal',
  classBg: 'c-modal__bg',
  classSlide: 'c-modal__slide',
  classContent: 'c-modal__content',
  classClose: 'c-modal__close-btn',
  styleBgColor: 'rgba(0, 0, 0, .7)',
  styleZIndex: 10000
};
var script = {
  props: {
    option: {
      type: Object,

      default() {
        return {};
      }

    },
    closeHndl: {
      type: Function,

      default() {
        return () => {};
      }

    }
  },

  data() {
    return {
      modalStyle: {},
      opt: { ...defaultOption,
        ...this.option
      }
    };
  },

  mounted() {
    // css変数を使って背景色と z-index を制御
    this.modalStyle = {
      '--modal--bg-color': this.opt.styleBgColor,
      '--modal--z-index': this.opt.styleZIndex
    };
  },

  beforeMount() {
    document.body.style.overflow = 'hidden';
  },

  beforeDestroy() {
    document.body.style.overflow = 'auto';
  },

  methods: {
    closeModal() {
      this.closeHndl();
    },

    /**
     * ページ内容が切り替わった時などに指定座標にスクロールさせる。
     * 基本的には 0 を指定してトップに移動させる。
     * 親から anime.js などを使ってスムーズにスクロールさせてもよい
     * 親の this.$refs から this.$refs.modal.scroll(0); のように呼び出す
     */
    scroll(posY, isSmooth = false) {
      this.$refs.scrollContainer.scroll({
        top: posY,
        behavior: isSmooth ? 'smooth' : 'instant'
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: [_vm.$style.modal, _vm.opt.classModal],
    style: _vm.modalStyle
  }, [_c('span', {
    class: [_vm.$style.modal__bg, _vm.opt.classBg]
  }), _vm._v(" "), _c('div', {
    ref: "scrollContainer",
    class: [_vm.$style.modal__slide, _vm.opt.classSlide],
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.closeModal($event);
      }
    }
  }, [_c('div', {
    class: [_vm.$style.modal__content, _vm.opt.classContent],
    on: {
      "click": function ($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('button', {
    class: [_vm.$style.modal__close_btn, _vm.opt.classClose],
    domProps: {
      "innerHTML": _vm._s(_vm.opt.closeBtnText)
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.closeModal($event);
      }
    }
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-6a46d865_0", {
    source: ".-input-css-1-modal-FMbz{z-index:var(--modal--z-index);position:fixed;left:0;top:0;width:100%;height:100%}.-input-css-1-modal__bg-PaRl{position:fixed;left:0;top:0;width:100%;height:100%;background-color:var(--modal--bg-color)}.-input-css-1-modal__slide-1zTy{position:absolute;left:0;top:0;width:100%;height:100%;overflow:auto}.-input-css-1-modal__content-2dKc{position:relative;width:max-content;margin-left:auto;margin-right:auto}.-input-css-1-modal__close_btn-1o8b{z-index:1000;position:absolute;user-select:none;appearance:none;cursor:pointer;outline:0}",
    map: undefined,
    media: undefined
  });
  Object.defineProperty(this, "$style", {
    value: {
      "modal": "-input-css-1-modal-FMbz",
      "modal__bg": "-input-css-1-modal__bg-PaRl",
      "modal__slide": "-input-css-1-modal__slide-1zTy",
      "modal__content": "-input-css-1-modal__content-2dKc",
      "modal__close_btn": "-input-css-1-modal__close_btn-1o8b"
    }
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueModal(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueModal', __vue_component__);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
