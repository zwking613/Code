<template>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      class="w-full max-w-[400px]"
  >
    <!-- 用户名输入框 -->
    <el-form-item prop="username" class="mb-6">
      <label class="block text-sm font-medium text-gray-600 mb-2">用户名</label>
      <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          prefix-icon="User"
          class="h-[42px]"
          :input-style="{
        height: '42px',
        backgroundColor: 'white',
        fontSize: '14px'
      }"
      />
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password" class="mb-6">
      <label class="block text-sm font-medium text-gray-600 mb-2">密码</label>
      <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          show-password
          autocomplete="new-password"
          class="h-[42px]"
          :input-style="{
        height: '42px',
        backgroundColor: 'white',
        fontSize: '14px'
      }"
      />
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="code" class="mb-8">
      <label class="block text-sm font-medium text-gray-600 mb-2">验证码</label>
      <div class="flex gap-3 w-full">
        <div class="flex-1">
          <el-input
              v-model="form.code"
              placeholder="请输入验证码"
              prefix-icon="Compass"
              class="h-[42px]"
              :input-style="{
            height: '42px',
            backgroundColor: 'white',
            fontSize: '14px'
          }"
          />
        </div>
        <div class="w-[120px] h-[42px] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity shadow-sm">
          <img
              :src="`data:image/png;base64,${captchaImage.img}`"
              class="w-full h-full object-cover"
              alt="验证码"
              @click="getCode"
          />
        </div>
      </div>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button
          size="large"
          type="primary"
          class="w-full h-[44px] !bg-[#1850C5] hover:!bg-[#1545A5] transition-colors duration-300"
          @keydown.enter="submitForm(ruleFormRef)"
          @click="submitForm(ruleFormRef)"
      >
        <span class="text-[15px] font-semibold">登录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type {  FormInstance, FormRules } from 'element-plus'
import useAppStore from "@modules/app";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const { captchaImage } = storeToRefs(appStore)
const { getCode,login } =appStore
const form = ref({
  username: 'admin',
  password: 'admin123',
  code:""
});
const ruleFormRef = ref<FormInstance>()
// let captchaImage = ref();
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
  ],
});

const resetForm = (ruleFormRef:FormInstance | undefined) => {
  if (!ruleFormRef)return;
  ruleFormRef.resetFields();
};

const submitForm =(ruleFormRef:FormInstance | undefined) => {
  if (!ruleFormRef) return;
  ruleFormRef.validate( (valid) => {
    if (valid) {
      const data ={
        uuid:captchaImage.value.uuid as string,
        ...form.value
      }
      login(data);
    } else {
      console.log('error submit!!');
    }
  });

};

onMounted( ()=>{
  getCode()
})
</script>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: white !important;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  border: 1px solid #e5e7eb !important;
}

:deep(.el-input__wrapper:hover) {
  border-color: #1850C5 !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(24, 80, 197, 0.1) !important;
  border-color: #1850C5 !important;
}

:deep(.el-form-item__error) {
  color: #dc2626;
}

:deep(.el-button--primary) {
  font-weight: 500;
  letter-spacing: 0.025em;
}
</style>