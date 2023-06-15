<template>
  <el-dialog
    v-model="props.dialog.editDialogVisible"
    title="修改菜单"
    draggable
    width="60%"
    :close-on-click-modal="false"
    @open="() => {
      updateForm.data = { ...props.updateRow }
      iconPopover.preIcon = updateForm.data.icon ? updateForm.data.icon : 'Search'
    }"
    @close="this.$refs.updateFormRef.resetFields()"
  >
    <!-- 目录 -->
    <el-form
      v-if="updateForm.data.type === 1"
      :model="updateForm.data"
      ref="updateFormRef"
      label-position="right"
      label-width="80px"
    >
      <el-form-item
        label="上级菜单"
        prop="parentId"
      >
        <el-tree-select
          :data="props.menus"
          v-model="updateForm.data.parentId"
          placeholder="请选择上级菜单"
          show-checkbox
          check-strictly
          clearable
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
        />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-input
              v-model="updateForm.data.name"
              placeholder="请输入名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="权限编码"
            prop="permission"
          >
            <el-input
              v-model="updateForm.data.permission"
              placeholder="请输入权限编码"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="图标"
        prop="icon"
      >
        <el-popover
          v-model:visible="iconPopover.visible"
          placement="bottom"
          width="100%"
          trigger="click"
          :teleported="false"
        >
          <template #reference>
            <el-input
              v-model="updateForm.data.icon"
              :prefix-icon="iconPopover.preIcon"
              clearable
              placeholder="请选择图标"
              @clear="iconPopover.preIcon = 'Search'"
            />
          </template>

          <template
            v-for="icon in selectIcons.data"
            :key="icon"
          >
            <div
              @click="pickIcon(icon)"
              class="icon-picker"
            >
              <el-icon>
                <component :is="icon.name" />
              </el-icon>
              <div> {{ icon.name }} </div>
            </div>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group v-model="updateForm.data.type">
          <el-radio :label=1>目录</el-radio>
          <el-radio :label=2>菜单</el-radio>
          <el-radio :label=3>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="updateForm.data.flag">
          <el-radio label='Y'>正常</el-radio>
          <el-radio label='N'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="排序号"
        prop="orderNum"
      >
        <el-input-number
          v-model="updateForm.data.orderNum"
          :min="1"
          label="排序号"
        >1</el-input-number>
      </el-form-item>
    </el-form>

    <!-- 菜单 -->
    <el-form
      v-if="updateForm.data.type === 2"
      :model="updateForm.data"
      ref="updateFormRef"
      label-position="right"
      label-width="80px"
    >
      <el-form-item
        label="上级菜单"
        prop="parentId"
      >
        <el-tree-select
          :data="props.menus"
          v-model="updateForm.data.parentId"
          placeholder="请选择上级菜单"
          show-checkbox
          check-strictly
          clearable
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
        />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-input
              v-model="updateForm.data.name"
              placeholder="请输入名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="权限编码"
            prop="permission"
          >
            <el-input
              v-model="updateForm.data.permission"
              placeholder="请输入权限编码"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="菜单路径"
            prop="path"
          >
            <el-input
              v-model="updateForm.data.path"
              placeholder="请输入菜单路径"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组件"
            prop="component"
          >
            <el-input
              v-model="updateForm.data.component"
              placeholder="请输入组件"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="图标"
        prop="icon"
      >
        <el-popover
          v-model:visible="iconPopover.visible"
          placement="bottom"
          width="100%"
          trigger="click"
          :teleported="false"
        >
          <template #reference>
            <el-input
              v-model="updateForm.data.icon"
              :prefix-icon="iconPopover.preIcon"
              clearable
              placeholder="请选择图标"
              @clear="iconPopover.preIcon = 'Search'"
            />
          </template>

          <template
            v-for="icon in selectIcons.data"
            :key="icon"
          >
            <div
              @click="pickIcon(icon)"
              class="icon-picker"
            >
              <el-icon>
                <component :is="icon.name" />
              </el-icon>
              <div> {{ icon.name }} </div>
            </div>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group v-model="updateForm.data.type">
          <el-radio :label=1>目录</el-radio>
          <el-radio :label=2>菜单</el-radio>
          <el-radio :label=3>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="updateForm.data.flag">
          <el-radio label='Y'>正常</el-radio>
          <el-radio label='N'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="排序号"
        prop="orderNum"
      >
        <el-input-number
          v-model="updateForm.data.orderNum"
          :min="1"
          label="排序号"
        >1</el-input-number>
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <el-form
      v-if="updateForm.data.type === 3"
      :model="updateForm.data"
      ref="updateFormRef"
      label-position="right"
      label-width="80px"
      style="width: 80%; margin: 0 auto;"
    >
      <el-form-item
        label="菜单名称"
        prop="name"
      >
        <el-input
          v-model="updateForm.data.name"
          placeholder="请输入名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="权限编码"
        prop="permission"
      >
        <el-input
          v-model="updateForm.data.permission"
          placeholder="请输入权限编码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group v-model="updateForm.data.type">
          <el-radio :label=1>目录</el-radio>
          <el-radio :label=2>菜单</el-radio>
          <el-radio :label=3>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="updateForm.data.flag">
          <el-radio label='Y'>正常</el-radio>
          <el-radio label='N'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="排序号"
        prop="orderNum"
      >
        <el-input-number
          v-model="updateForm.data.orderNum"
          :min="1"
          label="排序号"
        >1</el-input-number>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button
          type="info"
          @click="props.dialog.editDialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="updateMenu"
        >
          确 认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getCurrentInstance, inject, reactive, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useStore } from 'vuex'

export default {
  name: 'MenuEdit',
  props: ['menus', 'dialog', 'updateRow'],
  setup(props, context) {
    const axios = inject('axios')
    const { proxy } = getCurrentInstance()
    const store = useStore()

    const icons = []
    for (const [, component] of Object.entries(ElementPlusIconsVue)) {
      if (component.name === 'Menu') {
        component.name = component.name + 'Icon'
      }

      icons.push(component)
    }

    let updateForm = reactive({
      data: {}
    })

    let iconPopover = reactive({
      visible: false,
      preIcon: 'Search'
    })

    let selectIcons = reactive({
      data: []
    })
    selectIcons.data = icons

    function pickIcon(icon) {
      if (icon.name === 'Menu') {
        updateForm.data.icon = icon.name + 'Icon'
        iconPopover.preIcon = icon.name + 'Icon'
      } else {
        updateForm.data.icon = icon.name
        iconPopover.preIcon = icon.name
      }

      iconPopover.visible = false
    }

    function updateMenu() {
      axios.put('/fan-web/sys/menu/updateMenu', updateForm.data).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.editDialogVisible = false
          context.emit('listMenus')
          proxy.refreshNavMenus()
          proxy.refreshTabs(updateForm.data)
          store.state.navMenus.isRoute = false
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }

    watch([() => updateForm.data.icon], () => {
      if (updateForm.data.icon && updateForm.data.icon.length > 0) {
        selectIcons.data = icons.filter(createFilter(updateForm.data.icon))
      } else {
        selectIcons.data = icons
      }
    })

    function createFilter(queryString) {
      return (item) => {
        return (
          item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        )
      }
    }

    return {
      props, updateForm, selectIcons, iconPopover
      , pickIcon, updateMenu
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 45%;
}
:deep(.el-popover) {
  height: 250px;
  overflow: auto;
}
.icon-picker {
  width: 120px;
  height: 60px;
  display: inline-block;
}
.icon-picker:hover {
  background-color: #222429;
}
.el-icon {
  display: block;
  margin: 0 auto;
  font-size: 15px;
  margin-top: 10px;
}
.icon-picker div {
  margin-top: 5px;
  text-align: center;
}
</style>