import { create } from "zustand";

export const useIdsCheckedStore = create((set) => ({
  checkedIds: [],
  toggleChecked: (id, e) =>
    set((state) => {
      const {checked} = e.target;
      if (checked) {
        // 체크 ON → 배열에 추가
        if (!state.checkedIds.includes(id)) {
          return { checkedIds: [...state.checkedIds, id] };
        }
      } else {
        // 체크 OFF → 배열에서 제거
        return { checkedIds: state.checkedIds.filter((item) => item !== id) };
      }
    }),
  clearChecked: () => set({ checkedIds: [] }), // 전체 해제
  setAllChecked: (ids) => set({ checkedIds: ids }),
}));
