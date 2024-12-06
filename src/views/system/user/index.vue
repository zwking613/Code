<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-12-04 14:09:56
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-06 11:20:33
 * @FilePath: \vue_admin\src\views\system\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    class="p-4 bg-white rounded-lg demo-ruleForm"
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    label-width="auto"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item label="选择图标" prop="icon">
          <el-popover placement="bottom" width="420px" trigger="click">
            <template #reference>
              <el-input v-model="ruleForm.icon" placeholder="请输入图标名称" readonly>
                <template #prefix>
                  <svg-icon :icon-class="ruleForm.icon" font-size="20px"/>
                </template>
              </el-input>
            </template>
            <IconSelect @select="handleSelect" :activeName="ruleForm.icon" />
          </el-popover>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import IconSelect from "@components/IconSelect/index.vue";
const ruleForm = ref({
  icon: "",
});
const resetForm = () => {
  console.log(ruleForm.value);
};
const handleSelect = (name: string) => {
  console.log(name);
  ruleForm.value.icon = name;
};
</script>

<style scoped lang="less"></style>
