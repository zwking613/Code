<template>
  <div class="w-full h-full">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="mb-4 sm:mb-0">
          <!-- 个人信息卡片头部 -->
          <template #header>
            <div class="flex items-center">
              <span class="text-gray-700">个人信息</span>
            </div>
          </template>

          <!-- 个人信息卡片内容 -->
          <div>
            <div class="flex justify-center mb-6">
              <UserAvatar :avatar="userInfo.avatar"/>
            </div>
            <ul class="space-y-1">
              <!-- 用户名称 -->
              <li class="flex items-center justify-between py-3 border-t border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <svg-icon icon-class="user" class="text-gray-500" />
                  <span class="text-sm text-gray-600">用户名称</span>
                </div>
                <span class="text-sm text-gray-700">{{ userInfo.nickname }}</span>
              </li>

              <!-- 手机号码 -->
              <li class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <svg-icon icon-class="phone" class="text-gray-500" />
                  <span class="text-sm text-gray-600">手机号码</span>
                </div>
                <span class="text-sm text-gray-700">{{ userInfo.phone }}</span>
              </li>

              <!-- 用户邮箱 -->
              <li class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <svg-icon icon-class="email" class="text-gray-500" />
                  <span class="text-sm text-gray-600">用户邮箱</span>
                </div>
                <span class="text-sm text-gray-700">{{ userInfo.email }}</span>
              </li>

              <!-- 所属部门 -->
              <li class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <svg-icon icon-class="tree" class="text-gray-500" />
                  <span class="text-sm text-gray-600">所属部门</span>
                </div>
                <span class="text-sm text-gray-700">{{ userInfo.deptName }}</span>
              </li>

              <!-- 所属角色 -->
              <li class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <svg-icon icon-class="peoples" class="text-gray-500" />
                  <span class="text-sm text-gray-600">所属角色</span>
                </div>
                <span class="text-sm text-gray-700">{{ userInfo.roleNames }}</span>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>

      <!-- 基本资料卡片 -->
      <el-col :span="18" :xs="24">
        <el-card>
          <template #header>
            <div class="flex items-center">
              <span class="text-gray-700">基本资料</span>
            </div>
          </template>

          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <BasicInformation />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <Password />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Password from "./components/Password.vue"
import BasicInformation from "./components/BasicInformation.vue"
import UserAvatar from "./components/UserAvatar.vue"
import useAppStore from "@modules/app"
import { storeToRefs } from "pinia"

const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const activeTab = ref('userinfo')
</script>