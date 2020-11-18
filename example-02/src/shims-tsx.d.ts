import Vue, { VNode } from "vue";

declare global {
  interface Window {
    UASM_URL: string;
    h5sdk: {
      ready: (callback: () => any) => any;
      biz: {
        util: {
          openLink: (options: Record<any, any>) => {};
          getAppLanguage: (options: Record<any, any>) => {};
        };
      };
      ResizeObserver: any;
    };
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = Vue;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
