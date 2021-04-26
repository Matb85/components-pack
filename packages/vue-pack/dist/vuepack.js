(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vuepack = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: "Photo",
    props: {
      src: String,
      alt: String,
      sizes: String,
      srcset: String,
      dontenlargeonclick: String,
      dontaddtolist: String,
      multiview: String,
    },
    methods: {
      enlarge() {
        if (!this.$refs.img.classList.contains("loaded") || typeof this.dontenlargeonclick !== "undefined") return;
        const enlarger = typeof this.multiview === "undefined" ? "enlargePhoto" : "enlargeManyPhotos";
        this.$root.$emit(enlarger, { rect: this.$el.getBoundingClientRect(), img: this.$refs.img });
      },
    },
    mounted() {
      const img = this.$refs.img;

      if (typeof this.dontaddtolist === "undefined")
        img.addEventListener(
          "load",
          () =>
            this.$store.commit("vuepack/addphoto", {
              src: this.src,
              srcset: this.srcset,
              ratio: img.naturalWidth / img.naturalHeight,
            }),
          { once: true }
        );
      this.$store.state.vuepack.observer.observe(img);
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"medium-pack-photo",on:{"click":_vm.enlarge}},[_c('img',{ref:"img",attrs:{"src":_vm.src,"data-srcset":_vm.srcset,"sizes":_vm.sizes,"alt":_vm.alt,"data-observerhandler":"photo"}}),_c('span',{staticClass:"cross"})])};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  var Mixin = {
    mounted() {
      this.$root.$on(this.trigger, ({ img, rect }) => {
        const ref = this.$refs.img;
        ref.style.cssText = `top: ${rect.y}px; left: ${rect.x}px; width: ${img.offsetWidth}px; height: ${img.offsetHeight}px;`;
        ref.onload = () => {
          this.$el.classList.add("photo-viewer-open");
          const { w, h } = this.getdimensions(img.naturalWidth / img.naturalHeight);
          ref.style.setProperty("--enlarged-photo-w", w);
          ref.style.setProperty("--enlarged-photo-h", h);
        };
        ref.srcset = img.dataset.srcset;
      });
    },
    methods: {
      close() {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log("transitionend");
            this.$el.classList.remove("photo-viewer-close", "photo-viewer-open");
            this.$refs.img.removeAttribute("style");
            resolve();
          }, 400);
          this.$el.classList.add("photo-viewer-close");
        });
      },
      getdimensions(aspectR) {
        if (window.innerWidth / window.innerHeight > aspectR) return { w: 95 * aspectR + "vh", h: "95vh" };
        else return { w: "95vw", h: 95 * (1 / aspectR) + "vw" };
      },
    },
  };

  //
  var script$1 = {
    mixins: [Mixin],
    name: "PhotoViewer",
    data: () => ({ trigger: "enlargePhoto" }),
  };

  /* script */
  const __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"photo-viewer",on:{"click":_vm.close}},[_c('img',{ref:"img",staticClass:"viewed-photo"})])};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  class default_1 {
      init() {
          this.slideNext(this.settings.initialSlide, 0);
      }
      base(dist, dur) {
          return new Promise((resolve) => {
              this.counter -= dist;
              if (this.counter > 0)
                  this.counter = 0;
              if (this.counter < -1 * (this.slides.length - this.slideDisplay))
                  this.counter = -1 * (this.slides.length - this.slideDisplay);
              this.container.style.transition = "transform " + dur + "ms";
              this.transform(this.counter);
              setTimeout(() => {
                  this.container.style.transition = "initial";
                  resolve();
              }, dur);
          });
      }
      slideNext(dist = Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth), dur = this.settings.transitionSpeed) {
          return this.base(dist, dur);
      }
      slidePrev(dist = Math.floor((this.pos.start - this.getTransX()) / this.slideWidth), dur = this.settings.transitionSpeed) {
          return this.base(dist, dur);
      }
      slideTo(to = 0) {
          return this.slideBy(to - Math.abs(this.counter));
      }
      slideBy(dist = 0) {
          if (dist === 0)
              return new Promise((resolve) => resolve());
          if (dist > 0)
              return this.slideNext(dist);
          else
              return this.slidePrev(dist);
      }
  }
  default_1.carousel = false;

  class Slidehander {
      init() {
          this.container.addEventListener("pointerdown", (pEvent) => pointerDown.call(this, pEvent), {
              once: true,
          });
          /** remove the pointer down event listener when destroying */
          this.container.addEventListener("destroy", () => {
              this.container.removeEventListener("pointerdown", (pEvent) => pointerDown.call(this, pEvent));
          });
      }
  }
  function pointerDown(pEvent) {
      this.pos.start = this.getTransX();
      this.pos.x2 = pEvent.clientX;
      switch (pEvent.pointerType) {
          case "mouse":
              document.onmousemove = (mEvent) => mouseMove.call(this, mEvent);
              document.onmouseup = () => dragstop.call(this);
              break;
          case "touch":
              document.ontouchmove = (tEvent) => touchMove.call(this, tEvent);
              document.ontouchend = () => dragstop.call(this);
              break;
      }
  }
  function mouseMove(mEvent) {
      this.pos.x1 = this.pos.x2 - mEvent.clientX;
      this.pos.x2 = mEvent.clientX;
      this.transformAbsolute(this.getTransX() - this.pos.x1);
      this.container.dispatchEvent(new CustomEvent("moving"));
  }
  function touchMove(tEvent) {
      this.pos.x1 = this.pos.x2 - tEvent.touches[0].clientX;
      this.pos.x2 = tEvent.touches[0].clientX;
      this.pos.y1 = this.pos.y2 - tEvent.touches[0].clientY;
      this.pos.y2 = tEvent.touches[0].clientY;
      /** run only if the finger is moving roughly horizontally */
      if (Math.abs(this.pos.y1) < Math.abs(this.pos.x1))
          this.transformAbsolute(this.getTransX() - this.pos.x1);
      this.container.dispatchEvent(new CustomEvent("moving"));
  }
  async function dragstop() {
      document.onmousemove = null;
      document.ontouchmove = null;
      document.ontouchend = null;
      document.onmouseup = null;
      this.container.dispatchEvent(new CustomEvent("dragstop", {}));
      this.container.onpointerdown = null;
      if (this.pos.start != this.getTransX()) {
          if (this.pos.start > this.getTransX())
              await this.slideNext();
          else
              await this.slidePrev();
      }
      this.container.onpointerdown = (pEvent) => pointerDown.call(this, pEvent);
      this.container.dispatchEvent(new CustomEvent("transitionend", {}));
  }

  var buttons = (options) => function buttons() {
      const nextBtn = document.querySelector(options.nextBtn);
      const prevBtn = document.querySelector(options.prevBtn);
      nextBtn.onclick = btnAct.bind(this, { btn: nextBtn, dist: 1 });
      prevBtn.onclick = btnAct.bind(this, { btn: prevBtn, dist: -1 });
      /** clear event listeners when destroying */
      this.container.addEventListener("destroy", () => {
          nextBtn.onclick = null;
          prevBtn.onclick = null;
      }, { once: true });
      return { prevBtn, nextBtn };
  };
  async function btnAct(params) {
      params.btn.onclick = null;
      this.container.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "mouse" }));
      document.dispatchEvent(new TouchEvent("touchend", {}));
      document.dispatchEvent(new MouseEvent("mouseup", {}));
      await this.slideBy(params.dist);
      params.btn.onclick = btnAct.bind(this, params);
  }

  var lazyloading = (addClass = "loaded", options = { rootMargin: "0px", threshold: 0.5 }) => function lazyloading() {
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.intersectionRatio <= 0)
                  return;
              const img = entry.target;
              if (!img.dataset.srcset)
                  img.src = img.dataset.src;
              else
                  img.srcset = img.dataset.srcset;
              observer.unobserve(img);
              img.addEventListener("load", () => img.classList.add(addClass));
          });
      }, options);
      this.container.querySelectorAll(".ms-lazy").forEach(img => observer.observe(img));
  };

  const defaults = {
      transitionSpeed: 300,
      initialSlide: 0,
      container: "",
      plugins: []
  };
  function extend(options) {
      const extended = Object.assign({}, defaults);
      for (const counter in defaults) {
          if (options[counter]) {
              extended[counter] = options[counter];
          }
      }
      return extended;
  }

  /** import default settings + types */
  /** copies methods and properties from mixin classes to the derived class
   * it is a modified version of the function here: {@link https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern}
   */
  function setup(...constructors) {
      const base = getBase();
      base.prototype.inits = [];
      base.prototype.destroys = [];
      constructors.forEach(baseCtor => {
          /** copy the init functions to the inits array */
          if (Object.hasOwnProperty.call(baseCtor.prototype, "init")) {
              base.prototype.inits.push(baseCtor.prototype.init);
          }
          /** copy methods */
          Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
              Object.defineProperty(base.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
          });
      });
      return base;
  }
  function getBase() {
      return class {
          constructor(settings) {
              this.pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
              this.plugins = {};
              this.counter = 0;
              this.settings = extend(settings);
              this.container = document.getElementById(settings.container);
              this.slides = this.container.children;
              this.container.style.setProperty("--number-of-slides", this.slides.length);
              this.slideWidth = this.calcSlideWidth();
              this.slideDisplay = this.getSlidesPerView();
              window.addEventListener("resize", () => {
                  this.slideWidth = this.calcSlideWidth();
                  this.slideDisplay = this.getSlidesPerView();
              });
              /** initiate mixins */
              for (const init of this.inits)
                  init.call(this);
              /** reset counter after initialization */
              this.counter = 0;
              /** initiate plugins */
              for (const plugin of this.settings.plugins)
                  this.plugins[plugin.name] = plugin.call(this);
          }
          /** updating utilities */
          getTransX() {
              return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
          }
          getProperty(el, elProp) {
              return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
          }
          calcSlideWidth() {
              return (this.slides[0].offsetWidth +
                  this.getProperty(this.slides[0], "margin-left") +
                  this.getProperty(this.slides[0], "margin-right"));
          }
          getSlidesPerView() {
              const slidesPerView = this.getProperty(this.container.parentElement, "--slides-per-view");
              return !isNaN(slidesPerView) ? slidesPerView : this.getProperty(document.documentElement, "--slides-per-view");
          }
          /**
           * a utility for transforming the container by the length of one slide mulitplied by @param dist
           * mainly used for transforming to another slide
           */
          transform(dist) {
              this.container.style.transform = "translate3d(" + this.slideWidth * dist + "px,0,0)";
          }
          /**
           * a utility for transforming the container by an absolute number of px specified by @param Absolutedist
           * mainly used for handling touch/mouse events
           */
          transformAbsolute(Absolutedist) {
              this.container.style.transform = "translate3d(" + Absolutedist + "px,0,0)";
          }
          destroy() {
              this.container.dispatchEvent(new CustomEvent("destroy"));
              this.transform(0);
          }
      };
  }

  //

  const Slider = setup(Slidehander, default_1);
  var script = {
    mixins: [Mixin],
    name: "PhotoMultiViewer",
    data: () => ({
      svgPath:
        "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z",
      trigger: "enlargeManyPhotos",
      imgs: [],
      slider: null,
    }),
    async mounted() {
      this.$root.$on(this.trigger, ({ img }) => {
        this.imgs = this.$store.state.vuepack.photolist.filter(x => {
          const { w, h } = this.getdimensions(x.ratio);
          x.width = w;
          x.height = h;
          return x.src !== img.src;
        });
        setTimeout(() => {
          this.slider = new Slider({
            container: "photo-slider",
            transitionSpeed: 500,
            plugins: [lazyloading(), buttons({ prevBtn: "#multi-viewer-prev", nextBtn: "#multi-viewer-next" })],
          });
        }, 400);
      });
    },
    methods: {
      async closeviewer() {
        await this.close();
        this.slider.slideTo(0);
        this.slider.destroy();
        this.$refs.img.removeAttribute("style");
      },
    },
  };

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"photo-multi-viewer photo-viewer ms-outer-con width-in-percentage"},[_c('div',{staticClass:"photo-slider ms-inner-con",attrs:{"id":"photo-slider"}},[_c('div',{staticClass:"first-slide"},[_c('img',{ref:"img",staticClass:"viewed-photo"})]),_vm._l((_vm.imgs),function(img){return _c('div',{key:img.src,staticClass:"other-slides"},[_c('div',{staticClass:"wrapper"},[_c('div',{staticClass:"medium-pack-photo no-hover",style:({ '--enlarged-photo-w': img.width, '--enlarged-photo-h': img.height })},[_c('img',{staticClass:"ms-lazy",attrs:{"src":img.src,"data-srcset":img.srcset}})])])])})],2),_c('button',{attrs:{"id":"multi-viewer-prev"}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"12","height":"24","viewBox":"0 0 12 24"}},[_c('path',{attrs:{"d":_vm.svgPath}})])]),_c('button',{attrs:{"id":"multi-viewer-next"}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"12","height":"24","viewBox":"0 0 12 24"}},[_c('path',{attrs:{"d":_vm.svgPath}})])]),_c('button',{attrs:{"id":"close-multi-viewer"},on:{"click":_vm.closeviewer}})])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  class VuePackClass {
      constructor() {
          /** set up a new IntersectionObserver if in the browser */
          this.observer = typeof window === "undefined"
              ? {}
              : new IntersectionObserver(this.callback.bind(this), { rootMargin: "0px", threshold: 0.05 });
          /** handler for different needs */
          this.handlers = {
              photo(img) {
                  img.addEventListener("load", () => img.classList.add("loaded"));
                  img.srcset = img.dataset.srcset;
              },
          };
          /** list of photos on the page */
          this.photolist = [];
      }
      /** IntersectionObserver's logic */
      /** handler for the IntersectionObserver */
      async callback(entries, observer) {
          entries.forEach(entry => {
              if (entry.intersectionRatio <= 0)
                  return;
              const target = entry.target;
              this.handlers[target.dataset.observerhandler](target);
              observer.unobserve(target);
          });
      }
  }
  const vuepack = {
      namespaced: true,
      state: new VuePackClass(),
      mutations: {
          addhandler(state, { name, handler }) {
              state.handlers[name] = handler;
          },
          removeHandler(state, name) {
              delete state.handlers[name];
          },
          addphoto(state, payload) {
              if (!state.photolist.map(x => x.src).includes(payload.src))
                  state.photolist.push(payload);
          },
      },
  };

  // What should happen if the user installs the library as a plugin
  function install(Vue) {
      Vue.component("Photo", __vue_component__$2);
      Vue.component("PhotoViewer", __vue_component__$1);
      Vue.component("PhotoMultiViewer", __vue_component__);
  }

  exports.Photo = __vue_component__$2;
  exports.PhotoMultiViewer = __vue_component__;
  exports.PhotoViewer = __vue_component__$1;
  exports.VuePackClass = VuePackClass;
  exports.default = install;
  exports.vuepack = vuepack;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
