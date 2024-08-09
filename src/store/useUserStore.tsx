import { create } from "zustand";

interface UserState {
  zuserId: string | null;
  znickname: string | null;
  isSaved: boolean;
  setUser: (userId: string, nickname: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  zuserId: null,
  znickname: null,
  isSaved: false,

  setUser: (userId, nickname) =>
    set({
      zuserId: userId,
      znickname: nickname,
      isSaved: true,
    }),
  clearUser: () => set({ zuserId: null, znickname: null, isSaved: false }),
}));

export default useUserStore;
