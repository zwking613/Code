<template>
  <div id="not_found" class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="relative w-[1200px] px-[50px] overflow-hidden">
      <!-- 404图片部分 -->
      <div class="relative float-left w-[600px] overflow-hidden">
        <img class="w-full" src="@assets/images/404.png" alt="404">
        <img
            class="absolute w-[80px] top-[17px] left-[220px] opacity-0 animate-cloudLeft"
            src="@assets/images/404_cloud.png"
            alt="404"
        >
        <img
            class="absolute w-[46px] top-[10px] left-[420px] opacity-0 animate-cloudMid"
            src="@assets/images/404_cloud.png"
            alt="404"
        >
        <img
            class="absolute w-[62px] top-[100px] left-[500px] opacity-0 animate-cloudRight"
            src="@assets/images/404_cloud.png"
            alt="404"
        >
      </div>

      <!-- 文字内容部分 -->
      <div class="relative float-left w-[300px] py-[30px] overflow-hidden">
        <div class="text-[32px] font-bold leading-[40px] text-[#1482f0] opacity-0 mb-5 animate-slideUp">
          404错误!
        </div>
        <div class="text-[20px] leading-6 text-[#222] font-bold opacity-0 mb-[10px] animate-[slideUp_0.5s_0.1s_forwards]">
          {{ message }}
        </div>
        <div class="text-[13px] leading-[21px] text-gray-500 opacity-0 mb-[30px] animate-[slideUp_0.5s_0.2s_forwards]">
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        </div>
        <router-link
            to="/"
            class="block float-left w-[110px] h-[36px] bg-[#1482f0] rounded-full text-center text-white opacity-0 text-[14px] leading-[36px] cursor-pointer hover:bg-[#1467c5] transition-colors duration-300 animate-[slideUp_0.5s_0.3s_forwards]"
        >
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const message = computed(() => '找不到网页！')
</script>

<style scoped>
#not_found{
  @keyframes cloudLeft {
    0% {
      top: 17px;
      left: 220px;
      opacity: 0;
    }
    20% {
      top: 33px;
      left: 188px;
      opacity: 1;
    }
    80% {
      top: 81px;
      left: 92px;
      opacity: 1;
    }
    100% {
      top: 97px;
      left: 60px;
      opacity: 0;
    }
  }

  @keyframes cloudMid {
    0% {
      top: 10px;
      left: 420px;
      opacity: 0;
    }
    20% {
      top: 40px;
      left: 360px;
      opacity: 1;
    }
    70% {
      top: 130px;
      left: 180px;
      opacity: 1;
    }
    100% {
      top: 160px;
      left: 120px;
      opacity: 0;
    }
  }

  @keyframes cloudRight {
    0% {
      top: 100px;
      left: 500px;
      opacity: 0;
    }
    20% {
      top: 120px;
      left: 460px;
      opacity: 1;
    }
    80% {
      top: 180px;
      left: 340px;
      opacity: 1;
    }
    100% {
      top: 200px;
      left: 300px;
      opacity: 0;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-cloudLeft {
    animation: cloudLeft 2s linear 1s forwards;
  }

  .animate-cloudMid {
    animation: cloudMid 2s linear 1.2s forwards;
  }

  .animate-cloudRight {
    animation: cloudRight 2s linear 1s forwards;
  }

  .animate-slideUp {
    animation: slideUp 0.5s forwards;
  }

}

</style>