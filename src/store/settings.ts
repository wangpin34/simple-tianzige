import { reactive } from "vue";

export const settingsStore = reactive<{
  value: {
    tianzige: {
      colsNum: number;
    };
  };
}>({
  value: {
    tianzige: {
      colsNum: 5,
    },
  },
});
