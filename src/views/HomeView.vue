<template>

  <a-layout>
    <!--左侧-->
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <template #title>
              <span>
                <user-outlined/>
                subnav 1
              </span>
          </template>
          <a-menu-item key="1">option1</a-menu-item>
          <a-menu-item key="2">option2</a-menu-item>
          <a-menu-item key="3">option3</a-menu-item>
          <a-menu-item key="4">option4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
              <span>
                <laptop-outlined/>
                subnav 2
              </span>
          </template>
          <a-menu-item key="5">option5</a-menu-item>
          <a-menu-item key="6">option6</a-menu-item>
          <a-menu-item key="7">option7</a-menu-item>
          <a-menu-item key="8">option8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
              <span>
                <notification-outlined/>
                subnav 3
              </span>
          </template>
          <a-menu-item key="9">option9</a-menu-item>
          <a-menu-item key="10">option10</a-menu-item>
          <a-menu-item key="11">option11</a-menu-item>
          <a-menu-item key="12">option12</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <!--右侧-->
    <a-layout style="padding: 0 24px 24px">

      <!--面包屑-->
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>

      <!--内容-->
      <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-list item-layout="vertical" :pagination="pagination"  :grid="{ gutter: 16, column: 3 }" :data-source="ebooks">

          <template #renderItem="{ item }">
            <a-list-item key="item.title">
              <!--图标-->
              <template #actions>
                <span v-for="{ icon, text } in actions" :key="icon">
                  <component :is="icon" style="margin-right: 8px"/>
                  {{ text }}
                </span>
              </template>
              <!--主内容-->
              <a-list-item-meta :description="item.description">
                <template #title>
                  {{ item.name }}
                </template>
                <template #avatar>
                  <a-avatar :src="item.cover"/>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

      </a-layout-content>
    </a-layout>
  </a-layout>

</template>


<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'
import {StarOutlined, LikeOutlined, MessageOutlined} from '@ant-design/icons-vue';

const ebooks = ref([])

// ajax获取
axios.get('/api/ebook/list')
    .then(res => {
      console.log(res)
      ebooks.value = res.data.content
    })
    .catch(err => {
      console.log(err)
    })

// 分页
const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 6,
};

// 图标
const actions: Record<string, any>[] = [
  {icon: StarOutlined, text: '156'},
  {icon: LikeOutlined, text: '156'},
  {icon: MessageOutlined, text: '2'},
];
</script>


<style scoped>
.ant-avatar {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 8%;
  margin: 5px 0;
}
</style>
