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
        };
    }

    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
