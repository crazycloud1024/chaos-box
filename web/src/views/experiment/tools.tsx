import { clone, delay } from "@pureadmin/utils";
import { getExperiments } from "@/api/experiments";
import { ref, onMounted, reactive, watchEffect } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const hideVal = ref("nohide");
  const tableSize = ref("default");
  const paginationSmall = ref(false);
  const paginationAlign = ref("right");
  const columns: TableColumnList = [
    {
      label: "UID",
      prop: "uid",
      hide: () => (hideVal.value === "hideUid" ? true : false)
    },
    {
      label: "状态",
      prop: "status",
      hide: () => (hideVal.value === "hideStatus" ? true : false)
    },
    {
      label: "命名空间",
      prop: "namespace",
      hide: () => (hideVal.value === "hideNamespace" ? true : false)
    },
    {
      label: "名称",
      prop: "name",
      hide: () => (hideVal.value === "hideName" ? true : false)
    },
    {
      label: "混沌类型",
      prop: "kind",
      hide: () => (hideVal.value === "hideKind" ? true : false)
    },
    {
      label: "创建时间",
      prop: "created_at",
      hide: () => (hideVal.value === "hideCreated_at" ? true : false)
    }
  ];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 15, 20],
    total: 0,
    align: "right",
    background: true,
    small: false
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加载第一页...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });

  function onChange(val) {
    pagination.small = val;
  }

  function onSizeChange(val) {
    console.log("onSizeChange", val);
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }

  watchEffect(() => {
    pagination.align = paginationAlign.value as Align;
  });

  async function getExperimentList() {
    const result = await getExperiments({ namespace: "default" });
    console.log(result);
    const newList = [];
    newList.push(clone(result, true));
    dataList.value = newList.flat(Infinity);
    pagination.total = dataList.value.length;
    loading.value = false;
    return result;
  }

  onMounted(() => {
    delay(600).then(() => {
      getExperimentList();
    });
  });

  return {
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
  };
}
