import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type ExperimentsResult = {
  /** 是否请求成功 */
  success: boolean;
  data: {
    namespace: string;
    name: string;
    kind: string;
    uid: string;
    created_at: string;
    status: string;
  };
};

/** 获取混沌实验接口 */
export const getExperiments = (params?: object) => {
  return http.request<ExperimentsResult>("get", baseUrlApi("experiments"), {
    params
  });
};
