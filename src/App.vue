<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-card outlined class="fill-height" width="100%">
          <v-sheet class="fill-height">
            <v-row no-gutters class="fill-height">
              <v-col md="9" cols="12" class="d-flex flex-column">
                <div class="d-flex grey lighten-3">
                  <div
                    class="d-flex px-3 title font-weight-regular align-center"
                    style="height: 48px; width: 100%"
                  >
                    <v-btn icon href="https://github.com/hellowuxin/mindmap">
                      <v-icon>mind-github</v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-grow-1">
                  <mindmap
                    v-if="rander"
                    v-model="mmdata"
                    :randerFun="randerFun"
                    :gps="options.gps.value"
                    :fitView="options.fitView.value"
                    :draggable="options.draggable.value"
                    :keyboard="options.keyboard.value"
                    :showNodeAdd="options.showNodeAdd.value"
                    :contextMenu="options.contextMenu.value"
                    :zoomable="options.zoomable.value"
                    :showUndo="options.showUndo.value"
                    :xSpacing="xSpacing"
                    :ySpacing="ySpacing"
                    :strokeWidth="strokeWidth"
                    :download="options.download.value"
                    @updateNodeName="updateNodeName"
                    @click="click"
                  >
                  </mindmap>
                  <v-divider vertical></v-divider>
                </div>
              </v-col>
              <v-col md="3" cols="12">
                <div class="grey lighten-3">
                  <div
                    class="d-flex px-3 title font-weight-regular align-center"
                    style="height: 48px"
                  >
                    Options
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="py-3">
                  <v-col
                    class="pb-0"
                    cols="12"
                    v-for="(opt, key) in options"
                    :key="key"
                  >
                    <v-switch
                      class="mt-0"
                      hide-details
                      inset
                      v-model="opt.value"
                      :label="key"
                    ></v-switch>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="strokeWidth"
                      label="strokeWidth"
                      :thumb-size="20"
                      thumb-label
                      min="1"
                      max="10"
                    ></v-slider>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="xSpacing"
                      label="xSpacing"
                      :thumb-size="20"
                      thumb-label
                    ></v-slider>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="ySpacing"
                      label="ySpacing"
                      :thumb-size="20"
                      thumb-label
                    ></v-slider>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-container>
      <Card v-show="false" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import dataLearn from "../public/learn.json";
import mindmap from "./components/MindMap.vue";
import Card from "./card.vue";
import * as d3 from "./ts/d3";
import { Data, Mdata, FlexNode } from "./ts/index";

@Component({ components: { mindmap, Card } })
export default class App extends Vue {
  showSource = false;
  onboarding = 0;
  length = 3;
  mmdata = dataLearn;
  rander: any = "";
  items = [{ title: "template" }, { title: "script" }];
  options = {
    gps: { value: true },
    fitView: { value: true },
    keyboard: { value: true },
    draggable: { value: true },
    showNodeAdd: { value: true },
    contextMenu: { value: true },
    zoomable: { value: true },
    showUndo: { value: true },
    download: { value: true }
  };
  xSpacing = 50;
  ySpacing = 50;
  strokeWidth = 4;

  mounted() {
    // 获取模版元素的html模版并赋值给rander
    this.rander = document.querySelector(".card-tree");
  }
  // 渲染方法
  randerFun(
    parentElement: d3.Selection<
      SVGForeignObjectElement,
      FlexNode,
      Element,
      FlexNode
    >,
    data: FlexNode
  ) {
    parentElement.each((d, i, n) => {
      const observer = new window.ResizeObserver((l: any) => {
        const t = l[0].target;
        const b1 = getComputedStyle(t).borderTopWidth;
        const b2 = getComputedStyle(t.parentNode as Element).borderTopWidth;
        const spacing = parseInt(b1, 10) + parseInt(b2, 10) || 0;
        // 设置内容宽高为当前元素的宽高
        // const currentContent = foreign.select(".foreignContent");
        // 传入ui渲染自动取ui样式
        if (this.rander) {
          if (this.rander.hasAttribute("id")) {
            this.rander.removeAttribute("id");
          }
          parentElement.html(this.rander.outerHTML);
          const currentForeign = n[i] as Element;
          const trackSvg: any = currentForeign.querySelector(
            "svg path.el-progress-circle__track"
          );
        }
      });
      observer.observe(n[i] as Element);
    });
  }
  updateNodeName(...args: any) {
    console.log("updateNodeName", ...args);
  }
  click(...args: any) {
    console.log("click", ...args);
  }
}
</script>

<style></style>
