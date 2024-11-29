<template>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          show-password
          autocomplete="new-password"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-row>
        <el-col :span="16">
          <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="Compass"></el-input>
        </el-col>
        <el-col :span="8">
          <img :src="logo" style="width: 100%;height:32px" alt="captcha" @click="refreshCaptcha" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import type {  FormInstance, FormRules } from 'element-plus'
import {useRouter} from 'vue-router'
import {login,getCaptchaImage} from "@api/modules/login/login.ts";
import logo from "@/assets/images/logo.png";

const router = useRouter();

const form = ref({
  username: '',
  password: '',
  code:""
});
const ruleFormRef = ref<FormInstance>()
const captchaImage = ref<string>('');
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
  router.push('/dashboard');
  return
  if (!ruleFormRef)return;
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      const result = await login(form.value)
      console.log(result)
      ElMessage.success('提交成功');
    } else {
      ElMessage.success('提交失败');
      console.log('error submit!!');
    }
  });

};
const refreshCaptcha = async ()=>{
  const result = await getCaptchaImage()
  captchaImage.value = '123';
  console.log(result)
}
onMounted( ()=>{
  refreshCaptcha()
})
</script>

<style scoped>
/* 在这里添加你的样式 */
</style>
