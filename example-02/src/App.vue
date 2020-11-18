<template>
  <v-app>
    <v-main>
      <div>
        <MindMap />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import dataLearn from "../public/learn.json";
import MindMap from "./components/MindMap.vue";
import html2canvas from "html2canvas";
// import "vue-super-flow/lib/index.css";

@Component({ components: { MindMap } })
export default class App extends Vue {
  private treeData = [
    {
      id: 1000,
      name: "Calamus",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      delay: 120,
      fatherId: 0,
      tlevel: 3
    },
    {
      id: 100,
      name: "Calamus",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      delay: 120,
      fatherId: 1000,
      tlevel: 1
    },
    {
      id: 101,
      name: "Calamus1",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 0,
      fatherId: 100,
      tlevel: 1
    },
    {
      id: 102,
      name: "Calamus2",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 100,
      fatherId: 100,
      tlevel: 0
    },
    {
      id: 103,
      name: "Calamus3",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 100,
      tlevel: 0
    },
    {
      id: 104,
      name: "Calamus4",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 200,
      fatherId: 100,
      tlevel: 0
    },
    {
      id: 105,
      name: "Calamus5",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 101,
      tlevel: 0
    },
    {
      id: 106,
      name: "Calamus6",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 107,
      name: "Calamus7",
      des: "www.calamus.xyz",
      color: "#E1244E",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 108,
      name: "Calamus8",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 109,
      name: "Calamus9",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 110,
      name: "Calamus10",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 111,
      name: "Calamus11",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 102,
      tlevel: 0
    },
    {
      id: 112,
      name: "Calamus12",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 300,
      fatherId: 103,
      tlevel: 0
    },
    {
      id: 113,
      name: "Calamus13",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 103,
      tlevel: 0
    },
    {
      id: 114,
      name: "Calamus14",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 108,
      tlevel: 0
    },
    {
      id: 116,
      name: "Calamus15",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 108,
      tlevel: 0
    },
    {
      id: 117,
      name: "Calamus16",
      des: "www.calamus.xyz",
      color: "#aaa",
      content: "你可以选择爱我或者不爱我，而我只能选择爱你或者更爱你",
      value: 123,
      fatherId: 108,
      tlevel: 0
    }
  ];

  mounted() {
    setTimeout(function() {
      if (document.getElementById("showSvgTree")) {
        const shareContent = document.getElementById("showSvgTree"), //需要截图的包裹的（原生的）DOM 对象
          width = shareContent.scrollWidth, //shareContent.offsetWidth; //获取dom 宽度
          height = shareContent.scrollHeight, //shareContent.offsetHeight; //获取dom 高度
          canvas = document.createElement("canvas"), //创建一个canvas节点
          scale = 1; //定义任意放大倍数 支持小数
        console.log(shareContent.scrollWidth);
        console.log(shareContent.scrollHeight);
        console.log(shareContent);
        shareContent.scrollTop = 0;
        shareContent.scrollLeft = 0;
        canvas.width = 3600 * scale; //定义canvas 宽度 * 缩放
        canvas.height = 1136 * scale; //定义canvas高度 *缩放
        canvas.style.width = shareContent.clientWidth + "px";
        canvas.style.height = shareContent.clientHeight + "px";
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        const opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          logging: false, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          useCORS: true, // 【重要】开启跨域配置
          allowTaint: true,
        };
        html2canvas(shareContent, opts).then(function(canvas) {
          document.body.appendChild(canvas);
        });
      }
    }, 10000);
  }
}
</script>

<style></style>
