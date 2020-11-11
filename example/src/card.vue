<template>
  <div>
    <el-card class="card-tree">
      <div class="card">
        <div class="title-descript">
          我是用来测试的ui（可以更改）
        </div>
        <section class="content">
          <div class="describ">
            <p>
              我是第一条Ui的描述
            </p>
            <p>
              第二条描述
            </p>
            <p>
              展示的ui样式
            </p>
          </div>
          <div class="process">
            <el-progress
              :width="80"
              type="circle"
              :percentage="90"
            ></el-progress>
          </div>
        </section>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TargetCard extends Vue {
  private isTreList = false;
}
</script>
<style>
.card-tree {
  width: 260px;
  height: 180px;
}
.card {
  cursor: pointer;
}
.title-descript {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content > .describ {
  max-width: 70%;
}
.content > .describ p {
  width: 100%;
  min-width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-icon-caret-bottom {
  margin: 0 auto;
  cursor: pointer;
}
</style>
