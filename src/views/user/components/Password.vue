<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-12-02 08:53:20
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-04 11:14:00
 * @FilePath: \vue_admin\src\views\user\components\Password.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="passwordForm" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input autocomplete="new-password" v-model="passwordForm.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input autocomplete="new-password" v-model="passwordForm.newPassword" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input autocomplete="new-password" v-model="passwordForm.confirmPassword" placeholder="请确认新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="updatePassword(form)">保存</el-button>
      <el-button type="danger" size="small" >关闭</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { FormRules,FormInstance } from 'element-plus'
import useAppStore from "@modules/app";
const appStore = useAppStore()
const form = ref<FormInstance>()
const passwordForm = reactive({
  newPassword: '',
  oldPassword: '',
  confirmPassword: '',
})
const rules = reactive<FormRules>({
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
  ],
  oldPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
  ],
  confirmPassword: [
    {required: true, message: '请输入确认密码', trigger: 'blur'},
  ],
});

const updatePassword = (form:FormInstance | undefined)=>{
  if (!form) return
  form.validate((valid) => {
    if (valid) {
      if(passwordForm.newPassword!==passwordForm.confirmPassword){
        ElMessage('新密码与确认密码不相同，请确认之后在输入！')
      }
      else{
        appStore.updatePassword(passwordForm)
      }
    } else {
      console.log('error submit!')
    }
  })
}

</script>
<style scoped lang="less">

</style>