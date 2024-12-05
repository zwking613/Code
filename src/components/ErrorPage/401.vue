<template>
  <div id="401-page" class="bg-white w-full h-full box-border">
    <div class="errPage-container">
      <el-button icon="arrow-left" class="pan-back-btn" @click="back">
        返回
      </el-button>
      <el-row class="errPage-row">
        <el-col :span="12" class="text-section">
          <h1 class="text-jumbo">401错误!</h1>
          <h2>您没有访问权限！</h2>
          <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
          <ul class="list-unstyled">
            <li class="link-type">
              <router-link to="/">回首页</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="12" class="image-section">
          <img :src="errGif" class="pan-img" alt="Girl has dropped her ice cream." />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import errImage from "@assets/images/401.gif";

let { proxy } = getCurrentInstance();

const errGif = ref(errImage + "?" + +new Date());

function back() {
  if (proxy.$route.query.noGoBack) {
    proxy.$router.push({ path: "/" });
  } else {
    proxy.$router.go(-1);
  }
}
</script>

<style lang="less" scoped>
#401-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 确保页面至少占满整个视口高度 */
  overflow: hidden; /* 隐藏滚动条 */
}

.errPage-container {
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 20px; /* 添加内边距 */
  border-radius: 10px;
  background-color: #ffffff;
  margin: auto;
}

.pan-back-btn {
  background: #008489;
  color: #fff;
  border: none !important;
  margin-bottom: 20px; /* 添加底部间距 */
}

.errPage-row {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.text-section {
  padding-right: 20px; /* 添加右侧间距 */
}

.text-jumbo {
  font-size: 48px; /* 调整字体大小 */
  font-weight: 700;
  color: #484848;
  margin-bottom: 10px; /* 添加底部间距 */
}

.list-unstyled {
  font-size: 14px;
  li {
    padding-bottom: 5px;
  }
  a {
    color: #008489;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.image-section {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.pan-img {
  max-width: 100%; /* 确保图片不超出容器 */
  height: auto; /* 保持图片比例 */
}
</style>