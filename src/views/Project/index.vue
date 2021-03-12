<template>
    <div class="project">
        <div class="project_header">
            <a-button @click="addProject" type="primary">
                <template #icon>
                    <PlusOutlined />
                </template>
                添加
            </a-button>
        </div>
        <a-table style="width: 100%" :columns="columns" :data-source="data">
            <template #action>
            <span>
                <a>编辑</a>
                <a-divider type="vertical" />
                <a>发布</a>
                <a-divider type="vertical" />
                <a>删除</a>
                <a-divider type="vertical" />
                <a>查看角色</a>
            </span>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    components:{
        PlusOutlined,
    },
    setup() {
        const router = useRouter()
        const state = reactive(
            {
                columns: [
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: '项目名',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '开发者',
                        dataIndex: 'creater',
                        key: 'creater',
                    },
                    {
                        title: '更新时间',
                        key: 'time',
                        dataIndex: 'time',
                    },
                    {
                        title: '版本号',
                        key: 'version',
                        dataIndex: 'version',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        slots: { customRender: 'action' },
                    },
                ],
                data:[
                        {
                            id: '1',
                            name: 'John Brown',
                            time: '2020-12-01',
                            creater: 'creater',
                            version: '0301'
                        }
                    ],
                            
            }
        )
        const addProject = ()=>{
            router.push('/project/add')
        }
        return {
            ...state,
            addProject
        }
    },
})
</script>

<style lang="scss" scoped>
    .project{
        height: 100%;
        width: 100%;
        .project_header{
            display: flex;
            align-content: center;
            justify-content: flex-start;
            padding: 10px;
        }
    }
</style>