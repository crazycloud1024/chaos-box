export default {
  path: "/experiments",
  redirect: "/experiments",
  meta: {
    icon: "informationLine",
    title: "混沌实验",
    rank: 2
  },
  children: [
    {
      path: "/experiments/list",
      name: "experiments",
      component: () => import("@/views/experiment/experiments.vue"),
      meta: {
        title: "实验历史"
      }
    },
    {
      path: "/experiments/new",
      name: "newexperiments",
      component: () => import("@/views/experiment/experiments.vue"),
      meta: {
        title: "新的实验"
      }
    }
  ]
} as RouteConfigsTable;
