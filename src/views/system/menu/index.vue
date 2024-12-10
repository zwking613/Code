<template>
  <div id="sys_menu">

    <el-card>
<!--  查询    -->
      <el-form :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
              v-model="queryParams.menuName"
              style="width: 180px"
              placeholder="请输入菜单名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select style="width: 180px;" v-model="queryParams.status" placeholder="菜单状态" clearable>
            <el-option
                v-for="dict in statusOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="plus"
              @click="handleAdd"
          >新增
          </el-button>

        </el-col>
        <el-col :span="1.5">
          <el-button
              type="info"
              plain
              icon="sort"
              @click="toggleExpandAll"
          >展开/折叠
          </el-button>
        </el-col>
        <el-col :span="1.5" class="right-toolbar">
          <right-toolbar @changeShowSearch="changeShowSearch" :showSearch="showSearch"
                         @queryTable="getList"></right-toolbar>
        </el-col>
      </el-row>

      <el-table
          v-if="refreshTable"
          v-loading="loading"
          :data="sysMenuList"
          style="width: 100%"
          row-key="id"
          :default-expand-all="isExpandAll"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="menuName" label="菜单名称" width="160"></el-table-column>
        <el-table-column prop="icon" label="图标" width="80">
          <template #default="{ row }">
            <svg-icon :icon-class="row.icon"/>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="60" align="center"></el-table-column>
        <el-table-column prop="perms" label="权限标识" align="center" width="160"></el-table-column>
        <el-table-column prop="component" label="组件路径" align="center" width="160"></el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status =='0' ? 'primary' : 'danger'">{{ row.status == '0' ? '正常' : '停用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="200"></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" min-width="200">
          <template #default="{ row }">
            <el-button
                size="small"
                icon="edit"
                type="primary"
                link
                @click="handleUpdate(row)"
            >修改
            </el-button>
            <el-button
                size="small"
                type="primary"
                link
                icon="plus"
                @click="handleAdd(row)"
            >新增
            </el-button>
              <el-popconfirm title="确定删除?" @confirm="handleDelete(row)" cancel-button-text="取消" confirm-button-text="确认">
                <template #reference>
                  <el-button
                      size="small"
                      type="danger"
                      link
                      icon="delete"
                  >删除
                  </el-button>
                </template>
              </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <!-- 添加或修改菜单对话框 -->
      <el-dialog :title="title" v-model="open" width="700px" style="padding: 30px 20px"  append-to-body destroy-on-close>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级菜单" prop="parentId">
                <el-tree-select
                    v-model="form.parentId"
                    :data="menuOptions"
                    clearable
                    :render-after-expand="false"
                    check-strictly
                    check-on-click-node
                    :props="{
                      label: 'name',
                      value:'id',
                      children: 'children',
                    }"
                    placeholder="选择上级菜单"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单类型" prop="menuType">
                <el-radio-group v-model="form.menuType">
                  <el-radio value="M">目录</el-radio>
                  <el-radio value="C">菜单</el-radio>
                  <el-radio value="F">按钮</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="form.menuType != 'F'">
              <el-form-item label="菜单图标" prop="icon">
                <el-popover placement="bottom" width="460px" trigger="click">
                  <template #reference>
                    <el-input v-model="form.icon" placeholder="请输入图标名称" readonly>
                      <template #prefix>
                        <svg-icon :icon-class="form.icon" font-size="20px" style="width: 25px;"/>
                      </template>
                    </el-input>
                  </template>
                  <IconSelect @select="selected" :activeName="form.icon"/>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序" prop="orderNum">
                <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType != 'F'">
              <el-form-item prop="isFrame">
                <template #label>
              <span>
                <el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                是否外链
              </span>
                </template>

                <el-radio-group v-model="form.isFrame">
                  <el-radio value="0">是</el-radio>
                  <el-radio value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType != 'F'">
              <el-form-item prop="path">
                <template #label>
                 <span>
                <el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                路由地址
              </span>
                </template>
                <el-input v-model="form.path" placeholder="请输入路由地址"/>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item prop="component">
                <template #label>
                 <span>
                <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                组件路径
              </span>
                </template>

                <el-input v-model="form.component" placeholder="请输入组件路径"/>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType != 'M'">
              <el-form-item prop="perms">
                <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100"/>
                <template #label>
                 <span>
                 <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                             placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                权限字符
              </span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item prop="query">
                <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255"/>
                <template #label>
                 <span>
                 <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                路由参数
              </span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item prop="isCache">
                <template #label>
              <span>
                <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                是否缓存
              </span>
                </template>
                <el-radio-group v-model="form.isCache">
                  <el-radio value="0">缓存</el-radio>
                  <el-radio value="1">不缓存</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType != 'F'">
              <el-form-item prop="visible">
                <template #label>
              <span>
                <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                显示状态
              </span>
                </template>
                <el-radio-group v-model="form.visible">
                  <el-radio value="0">显示</el-radio>
                  <el-radio value="1">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="status">
                <template #label>
                 <span>
                <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
                菜单状态
              </span>
                </template>

                <el-radio-group v-model="form.status">
                  <el-radio
                      v-for="dict in statusOptions"
                      :key="dict.value"
                      :value="dict.value"
                  >{{ dict.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>

</template>

<script setup lang="ts">
import useMenuStore from '@stores/modules/menu'
import { storeToRefs } from "pinia";
import IconSelect from "@components/IconSelect/index.vue";
import {ReqSysMenuDetail} from '@stores/interface/menu.ts'
const menuStore = useMenuStore();
const {sysMenuList} = storeToRefs(menuStore);
const {getSystemMenuList,getMenuInfo,deleteMenu,getMenuTreeSelect,systemMenuEdit,systemMenuAdd} = menuStore;

const loading = ref(true);
const showSearch = ref(true);
const menuOptions = ref();
const title = ref("");
const open = ref(false);
const isExpandAll = ref(false);
const refreshTable = ref(true);
const queryParams = ref({
  menuName: undefined,
  status: undefined
});

let form = ref({
  id: undefined,
  parentId: 0,
  menuName: undefined,
  icon: '',
  menuType: "M",
  orderNum: undefined,
  isFrame: "1",
  isCache: "0",
  visible: "0",
  status: "0",
  path:undefined,
  component: undefined,
  query: undefined,
  perms: undefined,});

const queryForm = ref()
const formRef = ref()
const statusOptions = [
  {
    value: '0',
    label: '正常',
  },
  {
    value: '1',
    label: '停用',
  }
]
const rules = {
  menuName: [
    {required: true, message: "菜单名称不能为空", trigger: "blur"}
  ],
  orderNum: [
    {required: true, message: "菜单顺序不能为空", trigger: "blur"}
  ],
  path: [
    {required: true, message: "路由地址不能为空", trigger: "blur"}
  ]
};

/** 选择图标 */
const selected = (name:string) => {
  form.value.icon = name;
};

const getList = async () => {
  loading.value = true;
  await getSystemMenuList(queryParams.value, () => {
    loading.value = false;
  })
};

/** 搜索按钮操作 */
const handleQuery = () => {
  getList();
}
/** 重置按钮操作 */
const resetQuery = () => {
  queryForm.value.resetFields()
  handleQuery();
}

const changeShowSearch = () => {
  showSearch.value = !showSearch.value;
}

/** 展开/折叠操作 */
const toggleExpandAll = () => {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  })
}

// 表单重置
const reset = () => {
  form.value = {
    id: undefined,
    parentId: 0,
    menuName: undefined,
    icon: '',
    menuType: "M",
    orderNum: undefined,
    isFrame: "1",
    isCache: "0",
    visible: "0",
    status: "0",
    path:undefined,
    component: undefined,
    query: undefined,
    perms: undefined,
  };
}
// 取消按钮
const cancel = () => {
  open.value = false;
  formRef.value.resetFields();
}
const getTreeSelect=()=> {
      getMenuTreeSelect(( response=> {
        console.log(response)
        menuOptions.value = [];
        const menu = { menuId: 0, name: '主类目', children: response };
        menuOptions.value.push(menu);
      }));
}
/** 新增按钮操作 */
const handleAdd = (row:ReqSysMenuDetail) => {
  reset();
  getTreeSelect()
  if (row != null && row.id) {
    form.value.parentId = row.id;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = "添加菜单";

}
const submitForm = () => {
  if(!formRef.value)return;
  formRef.value.validate((valid:boolean)=>{
    if (valid){
      console.log(form.value)
      if(form.value.id != undefined){
        systemMenuAdd(form.value,()=>{
          getList()
        })
      }
      else {
        systemMenuEdit(form.value,()=>{
          getList()
        })
      }

    }
    else{
      console.log('error submit!')
    }
  })
}
/** 修改按钮操作 */
const handleUpdate = (row:ReqSysMenuDetail) => {
  reset();
  getTreeSelect()
  getMenuInfo(row.id,(response)=>{
    form.value = response as any;
    title.value = "修改菜单";
    open.value = true;
  })
}

/** 删除按钮操作 */
const handleDelete = async (row:ReqSysMenuDetail) => {
  await deleteMenu(row.id,()=>{
    getList();
  })
  // this.$modal.confirm('是否确认删除名称为"' + row.menuName + '"的数据项？').then(function() {
  //   return delMenu(row.menuId);
  // }).then(() => {
  //   this.getList();
  //   this.$modal.msgSuccess("删除成功");
  // }).catch(() => {});
}

onMounted(() => {
  getList();
});
</script>
<style scoped lang="less">
.mb8 {
  margin-bottom: 8px;
}

.right-toolbar {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

</style>