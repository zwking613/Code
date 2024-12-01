<template>
    <el-form ref="form" :model="infoForm" :rules="rules" label-width="80px">
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="infoForm.nickname" maxlength="30" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="infoForm.phone" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="infoForm.email" maxlength="50" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="infoForm.sex">
          <el-radio value="0">男</el-radio>
          <el-radio value="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="updateInfo(form)">保存</el-button>
        <el-button type="danger" size="small">关闭</el-button>
      </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import type { FormRules,FormInstance } from 'element-plus'
import {UserInfoType} from '@stores/interface/app'
import useAppStore from "@modules/app";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const { userInfo } =storeToRefs(appStore)
const form = ref<FormInstance>()
const infoForm = reactive({
  nickname:(userInfo.value as UserInfoType).nickname,
  phone: (userInfo.value as UserInfoType).phone,
  email:(userInfo.value as UserInfoType).email,
  sex: (userInfo.value as UserInfoType).sex
})

const rules = reactive<FormRules>({
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
  ],
});

const updateInfo = (form:FormInstance | undefined)=>{
  if (!form) return
  form.validate( (valid) => {
    if (valid) {
      appStore.updateInfo(infoForm)
    } else {
      console.log('error submit!')
    }
  })
}
</script>
<style scoped lang="less">

</style>