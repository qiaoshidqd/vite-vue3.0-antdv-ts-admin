import type { PropType } from 'vue';
type ListType = 'picture-card' | 'picture'

export interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
  }
  
  export interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

export const basicProps = {
    fileList: {
        type: Array as PropType<FileItem[]>,
        default: () => [],
    },
    showList:{
        type: Boolean as PropType<boolean>,
        default: true,
      },
      draggable:{
        type: Boolean as PropType<boolean>,
        default: false,
      },
      
  listType: {
    type: String as PropType<ListType>,
    default: 'picture-card',
  },
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  // 文件最大多少MB
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  // 最大数量的文件，Infinity不限制
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  // 根据后缀，或者其他
  accept: {
    type: String as PropType<string>,
    default: '',
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  uploadParams: {
    type: Object as PropType<any>,
    default: {},
  },
  api: {
    type: Function,
    default: null,
    required: true,
  },
};

export const uploadContainerProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  ...basicProps,
  showPreviewNumber: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  emptyHidePreview: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};