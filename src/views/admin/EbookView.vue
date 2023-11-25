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
                <a-button type="primary">
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
const ebooks = ref();
const pagination = ref({
  current: 1,
  pageSize: 2,
  total: 0
});
const loading = ref(false);


// 列表
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
];

/**
 * 3、逻辑部分
 */
// 初始加载
onMounted(() => {
  handleQuery({});
});

/**
 * 数据查询
 **/
const handleQuery = (params: any) => {
  loading.value = true;
  axios.get("/api/ebook/list", params).then((response) => {
    loading.value = false;
    const data = response.data;
    ebooks.value = data.content;
    // 重置分页按钮
    pagination.value.current = params.page;
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

</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>