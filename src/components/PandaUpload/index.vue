<template>
  <div class="clearfix">
    <a-upload
    v-if="!draggable"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :list-type="listType"
      v-model:file-list="fileList"
      :multiple="multiple"
      :accept="accept"
      :show-upload-list="showList"
      @preview="handlePreview"
      @before-upload="beforeUpload"
      @change="handleChange"
    >
      <div v-if="listType== 'picture-card'">
        <plus-outlined />
        <div class="ant-upload-text">上传</div>
      </div>
      <a-button v-else>
        <upload-outlined></upload-outlined>
        上传
    </a-button>
    </a-upload>
    <a-upload-dragger
        v-else
        style="width: 50%"
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange">
        <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击/拖拽上传</p>
    </a-upload-dragger>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { FileInfo, FileItem, uploadContainerProps } from './props'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default defineComponent({
    props: uploadContainerProps,
    components: {
        PlusOutlined,
        UploadOutlined,
        InboxOutlined
    },
  setup(props) {
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>('');
    const fileList = ref<FileItem[]>(props.fileList);

    const handleCancel = () => {
      previewVisible.value = false;
    };

    const beforeUpload = (file: FileItem) => {
    //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //   if (!isJpgOrPng) {
    //     message.error('You can only upload JPG file!');
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     message.error('Image must smaller than 2MB!');
    //   }
    return new Promise((res,rej)=>{
        return rej(file)
    })
    };
    
    const handlePreview = async (file: FileItem) => {
    //   if (!file.url && !file.preview) {
    //     file.preview = (await getBase64(file.originFileObj)) as string;
    //   }
    //   previewImage.value = file.url || file.preview;
    //   previewVisible.value = true;
    };
    const handleChange = (info: FileInfo) => {

        console.log(info)

    //   fileList.value = newFileList;
    };

    return {
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      handleChange,
      beforeUpload,
    };
  },
});
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
