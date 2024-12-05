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
          <el-popover placement="bottom" width="400" trigger="click">
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
