<template>
    <div class="header">
        <div class="header_left">
            <a-button type="primary" @click="toggleCollapsed">
                <MenuUnfoldOutlined v-if="collapsed" />
                <MenuFoldOutlined v-else /> 
            </a-button>
            <a-breadcrumb>
                <template v-for="routeItem in route.matched" :key="routeItem.name">
                <a-breadcrumb-item>
                    <a>{{ routeItem.meta.title }}</a>
                </a-breadcrumb-item>
                </template>
            </a-breadcrumb>
        </div>
        <div class="header_right">
            <span class="header_right_text">欢迎回来~~</span>
            <a-popover placement="bottomRight">
                <template #content>
                    <p class="_logout"><LogoutOutlined /><span @click="logout">退出登录</span></p>
                </template>
                <a-avatar :size="36" icon="user" />
            </a-popover>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { setToken } from '/@/utils/cookies'
import { useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons-vue';
export default defineComponent({
    components:{
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        LogoutOutlined
    },
    setup(props, context) {
        const router = useRouter()
        const route = useRoute()
        let collapsed = ref(false)
        function toggleCollapsed(){
            collapsed.value = !collapsed.value 
            context.emit('toggleCollapsed', collapsed)
        }
        function logout(){
            setToken('')
            router.push('/login')
        }
        return {
            route,
            collapsed,
            toggleCollapsed,
            logout
        }
    },
})
</script>
<style lang="scss">
    ._logout{
        cursor: default;
        margin: 0;
        padding: 0;
        width: auto;
        span{
            margin-right: 5px;
            cursor: pointer;
            color: #666;
        }
    }
</style>
<style lang="scss" scoped>
    .header{
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: solid 1px #ebebeb;
        .header_left{
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .header_right{
            display: flex;
            align-items: center;
            .header_right_text{
                margin-right: 10px;
                color: #666;
            }
        }
    }
</style>