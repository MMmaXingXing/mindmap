<template>
  <div class="draw-area" id="treeContent" ref="treeContent">
    <div v-for="(arr, index) in levels" :key="index">
      <template v-for="(v, index) in arr">
        <div
          v-if="!v.parent || v.parent.open"
          class="vnode"
          v-bind:class="{ pnode: v.children && v.children.length > 0 }"
          :key="index"
          :style="'left:' + v.left + 'px; top:' + v.top + 'px'"
          @click="toggle(v)"
        >
          <div class="text">
            <div class="node_title">
              <span :class="v.tlevel == '0' ? 'pink' : 'blue'" class="OKR">
                {{ v.tlevel == "0" ? "C" : "L" }}
              </span>
              <span class="label">
                {{ v.nathis }}
              </span>
            </div>
            <div class="node_des">
              <div>{{ v.content }}</div>
            </div>
            <div class="node_progress">
              {{ v.des }}
            </div>
            <!-- <div class="showTips">
              <a
                target="_blank"
                href="https://www.cnblogs.com/calamus"
                class="tips_icon icon_edit "
              >
                B
              </a>
              <a
                target="_blank"
                href="https://www.calamus.xyz"
                class="tips_icon icon_edit "
              >
                C
              </a>
              <a
                target="_blank"
                href="https://github.com/calamus0427"
                class="tips_icon icon_edit "
              >
                G
              </a>
            </div> -->
          </div>
        </div>
      </template>
    </div>
    <svg :id="svgId" v-if="curveness">
      <!-- 直线 -->
      <template v-for="(link, index) in list">
        <line
          class="link"
          :key="index"
          v-if="link.deep > 0 && link.parent.open"
          :x1="link.left + 90"
          :y1="link.top"
          :x2="link.parent.left + 105"
          :y2="link.parent.top + 150"
          :stroke="link.color ? link.color : '#aaa'"
          :stroke-width="link.strokeWidth ? link.strokeWidth : '1px'"
        ></line>
      </template>
    </svg>

    <svg :id="svgId" v-if="!curveness">
      <template v-for="(link, index) in list">
        <path
          class="link"
          :key="index"
          v-if="link.deep > 0 && link.parent.open"
          :d="link.path"
          :stroke="link.color ? link.color : '#aaa'"
          :stroke-width="link.strokeWidth ? link.strokeWidth : '1px'"
        ></path>
      </template>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
// import dataLearn from "../public/learn.json";
// import VueSvgTree from "vue-svg-tree";
// import SuperFlow from "vue-super-flow";
// import "vue-super-flow/lib/index.css";
const width = 800;
const height = 600;
const blockHeight = 50;
const blockWidth = 300;

@Component
export default class VueSvgTree extends Vue {
  private rules = {
    min: 200,
    max: 350
  };
  private delayRules = {
    min: 10,
    max: 300
  };
  private root: any = null;
  private list: any = null;
  private levels: any = null;

  @Prop({ default: [] }) treeData?: Array<any>;
  @Prop({ default: "row" }) direction?: string;
  @Prop({ default: "svg" }) svgId?: string;
  @Prop({ default: false }) curveness?: boolean;

  @Watch("treeData")
  treeDataChange(val: any) {
    if (val && val.length > 0) {
      this.initData(JSON.parse(JSON.stringify(val)));
    }
  }

  mounted() {
    if (this.treeData && this.treeData.length > 0) {
      this.initData(JSON.parse(JSON.stringify(this.treeData)));
    }
  }

  compare(v1: any, v2: any): any {
    if (v1.deep !== v2.deep) {
      return v1.deep - v2.deep;
    }

    if (v1.parent === v2.parent) {
      return v1.id - v2.id;
    }

    return this.compare(v1.parent, v2.parent);
  }
  // 初始化数据： 计算deep等
  initData(data: any) {
    const keys: any = {};
    let root: any = null;
    const levels: any = [];

    if (!data && !(data.length > 0)) {
      return;
    }

    data.forEach((v: any) => {
      keys[v.id] = v;
      v.deep = 0;
      v.top = 0;
      v.height = 0;
      v.width = 0;
      v.path = "";
      v.left = 0;
      v.prev = null; // 前一个节点
    });
    data.forEach((v: any) => {
      if (v.fatherId || v.fatherId > 0) {
        const p = keys[v.fatherId];
        p.children = p.children || [];
        p.children.push(v);
        v.parent = p;
        v.deep = p.deep + 1;
        // v.left = v.deep * 150 + 10;
        v.left = this.direction == "col" ? v.deep * 300 + 10 : 0;
        v.top = this.direction == "row" ? v.deep * 250 + 5 : 0;
        v.open = true;
        v.show = true;
      } else {
        root = v;
        v.open = true;
        v.show = true;
      }
    });
    data.sort(this.compare);
    data.forEach((v: any) => {
      levels[v.deep] = levels[v.deep] || [];
      levels[v.deep].push(v);
      v.prev = levels[v.deep][levels[v.deep].length - 2];
    });

    debugger;

    this.root = root;
    this.list = data;
    console.log("daya", data);
    this.levels = levels;
    if (this.direction == "col") {
      this.calcHeight(root);
      this.calcTop();
      this.calSvg();
    } else {
      //default
      this.calWidth(root);
      this.calcLeft();
      this.calSvgVer();
    }
  }
  // 计算所有节点占用的高度和宽度是否展示
  calcHeight(vnode: any) {
    let height = 0;
    if (vnode.parent && !vnode.parent.open) {
      // 存在父节点并且父节点不展开
      vnode.height = 0;
      vnode.open = false;
    } else if (!vnode.open) {
      vnode.height = blockHeight;
    }

    if (vnode.children && vnode.children.length > 0) {
      vnode.children.forEach((v: any) => {
        this.calcHeight(v);
        height += v.height;
      });
    }

    if (vnode.open) {
      vnode.height = height || blockHeight;
    }
  }
  calWidth(vnode: any) {
    let width = 0;
    if (vnode.parent && !vnode.parent.open) {
      // 存在父节点并且父节点不展开
      vnode.height = 0;
      vnode.width = 0;
      vnode.open = false;
    } else if (!vnode.open) {
      vnode.width = blockWidth;
    }
    if (vnode.children && vnode.children.length > 0) {
      vnode.children.forEach((v: any) => {
        this.calWidth(v);
        width += v.width;
      });
    }
    if (vnode.open) {
      vnode.width = width || blockWidth;
    }
  }
  //计算svg的大小
  calSvg() {
    this.$nextTick(() => {
      const maxHeight = this.levels
        .flat(Infinity)
        .filter((item: any) => {
          return item.show;
        })
        .sort((a: any, b: any) => {
          return b.top - a.top;
        })[0].top;
      const svg: any = document.getElementById(this.svgId || "");
      svg.setAttribute("height", "500");
      svg.setAttribute("width", "700");
      const treeContent: any = this.$refs.treeContent;
      this.$emit("toggle", treeContent?.scrollWidth, this.root.height);
    });
  }
  calSvgVer() {
    this.$nextTick(() => {
      const maxHeight = this.levels
        .flat(Infinity)
        .filter((item: any) => {
          return item.show;
        })
        .sort((a: any, b: any) => {
          return b.top - a.top;
        })[0].top;
      // let svg = docuthisnt.getElethisntById('svg')
      const treeContent: any = this.$refs.treeContent;
      const svg: any = document.getElementById(this.svgId || "");
      svg.setAttribute("height", treeContent?.scrollHeight);
      svg.setAttribute("width", this.root.width);
      this.$emit("toggle", {
        width: this.root.width,
        height: treeContent?.scrollHeight,
      });
    });
  }
  // 计算节点top的位置
  calcTop(vnode?: any, prevHeight?: any) {
    if (!vnode) {
      vnode = this.root;
    }
    prevHeight = prevHeight || 0;
    vnode.top = prevHeight + vnode.height / 2;
    if (vnode.children && vnode.children.length > 0) {
      for (let i = 0; i < vnode.children.length; i++) {
        const height = vnode.children[i].height;
        this.calcTop(vnode.children[i], prevHeight);
        prevHeight += height;
      }
    }
    if (vnode.parent) {
      const pLeft = vnode.parent.left + blockWidth - 40;
      const pTop = vnode.parent.top;
      const mLeft = (vnode.left + pLeft) / 2;
      const mTop = (vnode.top + pTop) / 2;
      vnode.path =
        "M" +
        vnode.left +
        "," +
        vnode.top +
        " C " +
        mLeft +
        " " +
        vnode.top +
        "," +
        mLeft +
        " " +
        pTop +
        "," +
        pLeft +
        " " +
        pTop +
        "L " +
        (vnode.parent.left + 10) +
        "," +
        pTop;
    }
  }
  // 节点左边位置
  calcLeft(vnode?: any, prevWidth?: number) {
    if (!vnode) {
      vnode = this.root;
    }
    prevWidth = prevWidth || 0;
    vnode.left = prevWidth + vnode.width / 2;
    if (vnode.children && vnode.children.length > 0) {
      for (let i = 0; i < vnode.children.length; i++) {
        const width = vnode.children[i].width;
        this.calcLeft(vnode.children[i], prevWidth);
        prevWidth += width;
      }
    }
    if (vnode.parent) {
      const pLeft = vnode.parent.left + 115;
      const pTop = vnode.parent.top + 150;
      const vLeft = vnode.left + 115;
      const vTop = vnode.top;
      const mLeft = (pLeft + vLeft) / 2;
      const mTop = (pTop + vTop) / 2;
      const x1 = vLeft > pLeft ? vLeft + 5 : vLeft - 5;
      if (vLeft == pLeft) {
        vnode.path =
          "M" + vLeft + "," + vTop + " " + " L " + pLeft + "," + pTop;
      } else {
        vnode.path =
          "M" +
          vLeft +
          "," +
          vTop +
          " Q " +
          x1 +
          "," +
          (vTop - 30) +
          " " +
          mLeft +
          "," +
          (vTop - 30) +
          " T " +
          pLeft +
          "," +
          pTop;
      }
    }
  }
  // 收缩和展开
  toggle(vnode: any) {
    vnode.open = !vnode.open;
    console.log("vnode", vnode);
    if (vnode.children) {
      vnode.children.map((child: any) => {
        child.show = !child.show;
      });
    }
    if (this.direction == "col") {
      this.calcHeight(this.root);
      this.calcTop();
      this.calSvg();
    } else {
      this.calWidth(this.root);
      this.calcLeft();
      this.calSvgVer();
    }
    console.log("toggle:", vnode, vnode.open);
  }
  //自定义事件
  showDetail(data: any) {
    delete data.children;
    this.$emit("detail", data);
  }
  addTarget(data: any) {
    delete data.children;
    console.log("1111111", data);
    this.$emit("add", data);
  }
  editTarget(data: any) {
    delete data.children;
    console.log("2222222", data);
    this.$emit("edit", data);
  }
  detailTarget(data: any) {
    delete data.children;
    this.$emit("detail", data);
  }
  refreshTarget(data: any) {
    delete data.children;
    console.log("3333333", data);
    this.$emit("refresh", data);
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 14px;
}
.draw-area {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  margin: 40px auto;
  overflow: auto;
}
svg {
  z-index: 0;
}
.vnode {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 10px;
  height: 160px;
  margin: 0;
  margin-top: -10px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 3px;
  background: #ffffff;
  box-shadow: 1px 2px 10px 3px rgba(0, 0, 0, 0.08);
  transition: top 0.3s;
  cursor: pointer;
  width: auto;
  /* width: 230px;
        overflow:hidden; */
}
.vnode .text {
  padding: 0 10px;
}
.pnode::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 216px;
  height: 1px;
  background: #e1244e;
}
.link {
  fill-opacity: 0;
}
.tip {
  z-index: 999;
  display: block;
  padding: 5px;
  border: 1px solid #eee;
  line-height: 20px;
  border-radius: 5px;
  background: transparent;
}
.vnode:hover {
  z-index: 999;
}
.vnode:hover .tip {
  display: block;
}

/**ruler部分*/
.ruler-head {
  font-size: 14px;
  text-align: left;
}
.ruler-head span {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.ruler {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
}
.ruler-ruler {
  position: relative;
  right: 10px;
  left: 5px;
  display: inline-block;
  width: 10px;
  height: 100px;
  background: #9a9797;
}
.ruler-deg {
  position: absolute;
  top: 50px;
  left: 0;
  width: 0;
  width: 0;
  height: 10px;
  margin-top: -5px;
  padding-left: 3px;
  border-left: 20px solid #666;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #666;
  background: transparent;
  cursor: row-resize;
  -webkit-user-select: none; /* Chrothis/Safari/Opera */
  -moz-user-select: none; /* Firefox */
  user-select: none;

  -webkit-touch-callout: none; /* iOS Safari */
}
.vnode .text {
  position: relative;
  height: 100%;
  max-width: 230px;
}
.vnode .text .node_title {
  padding: 3px 11px 0px 11px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.vnode .text .node_title .OKR {
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #fff;
  line-height: 35px;
  text-align: center;
  font-size: 1.2rem;
}
.vnode .text .node_title .OKR.pink {
  background-color: #e1244e;
}
.vnode .text .node_title .OKR.blue {
  background-color: #58c2ef;
}
.vnode .text .node_title .label {
  max-width: 130px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  padding-left: 10px;
  font-size: 1rem;
  color: #1f1f1f;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vnode .text .node_title .label button {
  overflow: hidden;
  color: #1f1f1f !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
  display: inline-block;
  line-height: 35px;
  text-align: left;
}
.vnode .text .node_des {
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  height: 60px;
  color: #777777;
  font-size: 12px;
  justify-content: start;
}
.vnode .text .node_des div {
  width: 140px;
  text-align: left;
}
.vnode .text .node_des div:nth-child(2) {
  margin-top: 5px;
}
.vnode .text .node_progress {
  position: absolute;
  width: 200px;
  bottom: 0px;
  height: 40px;
  border-top: 1px solid #d8d8d8;
  line-height: 40px;
}
.vnode .text .node_progress .el-progress {
  display: inline;
}
.vnode .text .node_progress .el-progress .el-progress__text {
  font-size: 12px !important;
  color: #777777 !important;
}
.vnode .text .showTips {
  position: absolute;
  left: 225px;
  top: 0px;
  opacity: 0;
}
.vnode .text .showTips a {
  display: inline-block;
}
.vnode .text .showTips .tips_icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  padding: 3px;
  background: #ffffff;
  box-shadow: 1px 2px 10px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease 0s;
  color: #777777;
}
.vnode .text .showTips .tips_icon:hover {
  color: #58c2ef;
}
.vnode .text:hover .showTips {
  opacity: 1;
}

.el-progress__text {
  font-size: 12px !important;
  color: #777777 !important;
}
</style>
