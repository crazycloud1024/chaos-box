<script setup lang="ts">
import { PureTable } from "@pureadmin/table";

import { useColumns } from "./tools";

const {
  loading,
  columns,
  dataList,
  hideVal,
  tableSize,
  pagination,
  loadingConfig,
  paginationAlign,
  paginationSmall,
  onChange,
  onSizeChange,
  onCurrentChange
} = useColumns();
</script>

<template>
  <div>
    <el-space class="float-right mb-4">
      <p class="text-sm">动态列：</p>
      <el-radio-group v-model="hideVal" size="small">
        <el-radio-button label="nohide">不隐藏</el-radio-button>
        <el-radio-button label="hideUid">隐藏UID</el-radio-button>
        <el-radio-button label="hideStatus">隐藏状态</el-radio-button>
        <el-radio-button label="hideNamespace">隐藏命名空间</el-radio-button>
        <el-radio-button label="hideName">隐藏名称</el-radio-button>
        <el-radio-button label="hideKind">隐藏类型</el-radio-button>
        <el-radio-button label="hideCreated_at">隐藏创建时间</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">表格大小：</p>
      <el-radio-group v-model="tableSize" size="small">
        <el-radio-button label="large">放大</el-radio-button>
        <el-radio-button label="default">正常</el-radio-button>
        <el-radio-button label="small">缩小</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">分页图标大小：</p>
      <el-radio-group v-model="paginationSmall" size="small" @change="onChange">
        <el-radio-button :label="false">大</el-radio-button>
        <el-radio-button :label="true">小</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">分页的对齐方式：</p>
      <el-radio-group v-model="paginationAlign" size="small">
        <el-radio-button label="right">右边</el-radio-button>
        <el-radio-button label="center">中间</el-radio-button>
        <el-radio-button label="left">左边</el-radio-button>
      </el-radio-group>
    </el-space>

    <pure-table
      border
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      :size="tableSize"
      :loading="loading"
      :loading-config="loadingConfig"
      :height="tableSize === 'small' ? 352 : 440"
      :data="
        dataList.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :columns="columns"
      :pagination="pagination"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>
