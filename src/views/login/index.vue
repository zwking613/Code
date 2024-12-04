<template>
  <div class="flex w-full">
    <!-- 左侧蓝色区域：修改高度设置，添加 min-h-screen -->
    <div class="hidden lg:flex lg:w-1/3 bg-[#1850C5] min-h-screen items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="text-white text-4xl font-bold tracking-[0.2em] relative overflow-hidden group">
          <span class="inline-block transition-transform duration-300 hover:scale-110">R</span>
          <span class="inline-block transition-transform duration-300 hover:scale-110">O</span>
          <span class="inline-block transition-transform duration-300 hover:scale-110">B</span>
          <span class="inline-block transition-transform duration-300 hover:scale-110">O</span>
          <span class="inline-block transition-transform duration-300 hover:scale-110">T</span>
          <span class="inline-block mx-3 w-2 h-2 bg-white rounded-full"></span>
          <span class="text-cyan-300">
            <span class="inline-block transition-transform duration-300 hover:scale-110">A</span>
            <span class="inline-block transition-transform duration-300 hover:scale-110">D</span>
            <span class="inline-block transition-transform duration-300 hover:scale-110">M</span>
            <span class="inline-block transition-transform duration-300 hover:scale-110">I</span>
            <span class="inline-block transition-transform duration-300 hover:scale-110">N</span>
           </span>
          <div class="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent via-white/50"></div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单：添加 min-h-screen -->
    <div class="flex justify-center items-center p-8 w-full min-h-screen lg:w-2/3 sm:p-12">
      <div class="w-full max-w-[400px]">
        <div class="mb-10">
          <!-- 标题部分 -->
          <div class="relative mb-3">
            <h1 class="text-3xl font-bold text-gray-800">
              欢迎登录
              <span class="text-[#1850C5]">Robot Admin</span>
            </h1>
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1850C5] rounded-full"></div>
          </div>

          <!-- 副标题 -->
          <div class="flex flex-col gap-1">
            <p class="text-gray-500">请使用您的管理员账号登录系统</p>
            <div class="flex gap-2 items-center text-sm">
              <span class="text-gray-400">如需帮助，请</span>
              <a
                  href="#"
                  class="text-[#1850C5] hover:text-[#1545A5] font-medium transition-colors duration-300 flex items-center gap-1"
              >
                联系系统管理员
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
          </div>
        </div>
        </div>
       <LoginForm/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import LoginForm from "./components/LoginForm.vue";

const formRef = ref(null)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const rules = {
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    // TODO: 实现登录逻辑
    console.log('Form submitted:', form)
    ElMessage.success('Login successful')
  } catch (error) {
    console.error('Validation failed:', error)
    ElMessage.error('Please check your input')
  }
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: white;
}

:deep(.el-button--primary) {
  background-color: #1850C5;
}

:deep(.el-button--primary:hover) {
  background-color: #1545A5;
}
</style>