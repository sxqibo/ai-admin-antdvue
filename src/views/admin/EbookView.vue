<template>
  <a-layout>
    <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <a-table
          :columns="columns"
          :row-key="record => record.id"
          :data-source="ebooks"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'cover'">
            <img :src="record.cover" :alt="record.name"/>
          </template>

          <template  v-else-if="column.key === 'action'">
            <a-space size="small">
              <a-space size="small">
                <a-button type="primary" @click="showModal">
                  编辑
                </a-button>
                <a-button type="primary" danger>
                  删除
                </a-button>
              </a-space>
            </a-space>
          </template>

        </template>

      </a-table>
    </a-layout-content>
  </a-layout>

  <a-modal
      v-model:open="open"
      title="Title"
      :confirm-loading="confirmLoading"
      @ok="handleOk">
    <p>{{ modalText }}</p>
  </a-modal>
</template>

<script setup lang="ts">
/**
 * 1、依赖部分
 */
import {onMounted, ref} from 'vue';
import axios from 'axios';

/**
 * 2、定义部分
 */
// 列表
const ebooks = ref();
// 分页
const pagination = ref({
  current: 1,
  pageSize: 4,
  total: 0
});
// 加载
const loading = ref(false);
// 列数据
const columns = [
  {
    name: '封面',
    dataIndex: 'cover',
    key: 'cover',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分类一',
    dataIndex: 'category1_id',
    key: 'category1_id',
  },
  {
    title: '分类二',
    dataIndex: 'category2_id',
    key: 'category2_id',
  },
  {
    title: '文档数',
    dataIndex: 'doc_count',
    key: 'doc_count',
  },
  {
    title: '投票数',
    dataIndex: 'vote_count',
    key: 'vote_count',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
  },
]
// 编辑表单
const modalText = ref<string>('Content of the modal');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

/**
 * 3、逻辑部分
 */
// 初始加载
onMounted(() => {
  handleQuery({
    page: 1,
    size: pagination.value.pageSize
  });
});

/**
 * 数据查询
 */
const handleQuery = (params: any) => {
  loading.value = true;
  axios.get("/api/ebook/list", {
    params: {
      page: params.page,
      size: params.size,
    }
  }).then((response) => {
    loading.value = false;
    const data = response.data;
    ebooks.value = data.content.list;
    // 重置分页按钮
    pagination.value.current = params.page;
    pagination.value.total = data.content.total;
  });
};

/**
 * 表格点击页码时触发
 */
const handleTableChange = (pagination: any) => {
  console.log("看看自带的分页参数都有啥：" + pagination);
  handleQuery({
    page: pagination.current,
    size: pagination.pageSize
  });
};

/**
 * 编辑-显示模态框
 */
const showModal = () => {
  open.value = true;
};

/**
 * 表单
 */
const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds';
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>