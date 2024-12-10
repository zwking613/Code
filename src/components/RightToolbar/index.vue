<template>
  <div :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button  circle icon="search" @click="toggleSearch" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button  circle icon="refresh" @click="refresh" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button  circle icon="menu" @click="showColumn" v-if="showColumnsType === 'transfer'" />
        <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 12px" v-if="showColumnsType === 'checkbox'">
          <el-button  circle icon="menu" />
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in columns" :key="item.key">
              <el-dropdown-item>
                <el-checkbox :checked="item.visible" @change="checkboxChange($event, item.label)" :label="item.label" />
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-transfer
          :titles="['显示', '隐藏']"
          v-model="value"
          :data="columns"
          @change="dataChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
  name: "RightToolbar",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
    },
    search: {
      type: Boolean,
      default: true,
    },
    showColumnsType: {
      type: String,
      default: "checkbox",
    },
    gutter: {
      type: Number,
      default: 10,
    },
  },
  setup(props,{emit}) {
    const value = ref([]);
    const title = "显示/隐藏";
    const open = ref(false);

    const style = computed(() => {
      const ret = {};
      if (props.gutter) {
        ret.marginRight = `${props.gutter / 2}px`;
      }
      return ret;
    });

    onMounted(() => {
      if (props.showColumnsType === 'transfer') {
        // 显隐列初始默认隐藏列
        props.columns.forEach((item, index) => {
          if (item.visible === false) {
            value.value.push(index);
          }
        });
      }
    });

    const toggleSearch = () => {
      emit("changeShowSearch");
    };

    const refresh = () => {
      emit("queryTable");
    };

    const dataChange = (data) => {
      props.columns.forEach((item, index) => {
        const key = item.key;
        item.visible = !data.includes(key);
      });
    };

    const showColumn = () => {
      open.value = true;
    };

    const checkboxChange = (event, label) => {
      const item = props.columns.find(item => item.label === label);
      if (item) {
        item.visible = event;
      }
    };

    return {
      value,
      title,
      open,
      style,
      toggleSearch,
      refresh,
      dataChange,
      showColumn,
      checkboxChange,
    };
  },
});
</script>

<style lang="less" scoped>
:deep .el-transfer__button {
  border-radius: 50%;
  padding: 12px;
  display: block;
  margin-left: 0px;
}
:deep .el-transfer__button:first-child {
  margin-bottom: 10px;
}
</style>