<template>
  <div class="menu">
    <div class="menu_left">
    <img alt="logo" class="logo" src="/@/assets/logo.png" />
    <a-menu
      style="height: 100vh;border: none"
      :default-selected-keys="[$route.path]"
      :default-open-keys="[]"
      mode="inline"
      theme="light"
      :inline-collapsed="isOpenSidebar"
    >
    <template v-for="menu in menuArry">
      <a-menu-item :style="{'min-width': isOpenSidebar ? '0px' : '180px' }" @click="setCurrentMenu(menu.path)" v-if="menu.children.length == 0"  :key="menu.path">
        <ProjectOutlined v-if="menu.icon === 'project'"/>
        <TeamOutlined v-if="menu.icon === 'user'"/>
        <span>{{menu.title}}</span>
      </a-menu-item>
      <sub-menu v-else :menuItem="menu" :key="menu.path"/>
    </template>

    </a-menu>
    </div>
    <div class="menu_right">
      <div>
          <Nav @toggleCollapsed="toggleCollapsed"/>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import SubMenu from '/@/components/SubMenu/index.vue'
import Nav from '/@/components/Nav/index.vue';
import { ProjectOutlined, TeamOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Menu',
  components:{
    SubMenu,
    Nav,
    ProjectOutlined,
    TeamOutlined
  },
  setup() {
    const router = useRouter()
    let isOpenSidebar = ref(false)
    const state = reactive({
      currentMenu: '',
      menuArry: [{title: 'menu',icon: 'project',path: '/project',children: []},
                  {title: 'user',icon: 'user',path: '/user', children: []},],
    });
    const setCurrentMenu = (path: string) =>{
      router.push(path)
    }
    const toggleCollapsed= (sidebarStatus: { value: boolean; }) =>{
      isOpenSidebar.value = sidebarStatus.value
    }
    return {
      ...toRefs(state),
      isOpenSidebar,
      setCurrentMenu,
      toggleCollapsed
    }
  },
})
</script>

<style lang="scss">
  .menu{
    display: flex;
    align-items:center;
    justify-content: flex-start;
    .menu_left{
      height: 100vh;
      border-right: solid 1px #ebebeb;
      display: flex;
      align-items:center;
      justify-content: center;
      flex-direction: column;
    }
    .logo{
      margin: 20px 0 10px 0;
      width: 60px;
    }
    .menu_right{
      height: 100vh;
      width: 100%;
    }
  }
</style>