<template>
    <a-sub-menu :key="props.menuItem.path">
          <span>
            <ProjectOutlined v-if="props.menuItem.icon === 'project'"/>
            <TeamOutlined v-if="props.menuItem.icon === 'user'"/>
            <span>{{ props.menuItem.title }}</span>
          </span>
          <template v-for="item in props.menuItem.children">
            <a-menu-item v-if="item.children.length === 0" :key="item.path">
              {{ item.title }}
            </a-menu-item>
            <sub-menu v-else :menuItem="item" :key="item.path"/>
          </template>
      </a-sub-menu>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from 'vue';
    import { ProjectOutlined,TeamOutlined  } from '@ant-design/icons-vue';

    export default defineComponent({
        name: 'SubMenu',
        components:{
          ProjectOutlined,
          TeamOutlined,
        },
        props: {
          menuItem: {
            type: Array,
          }
        },
        setup(props) {
          onMounted(()=>{
            console.log(props)
          })
        }
    })
</script>