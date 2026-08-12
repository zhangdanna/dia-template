import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { getUserInfo, login as loginApi, logout as logoutApi, type UserInfo } from '@/api/user';
import { usePermissionStore } from '@/stores/permission';

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken());
  const roles = ref<string[]>([]);
  const userInfo = ref<UserInfo | null>(null);

  async function login(payload: { username: string; password: string }): Promise<void> {
    const { token: tk } = await loginApi(payload);
    token.value = tk;
    setToken(tk);
  }

  async function fetchUserInfo(): Promise<UserInfo> {
    const info = await getUserInfo();
    userInfo.value = info;
    roles.value = info.roles ?? [];
    return info;
  }

  async function logout(): Promise<void> {
    try {
      await logoutApi();
    } finally {
      resetState();
    }
  }

  function resetState(): void {
    token.value = '';
    roles.value = [];
    userInfo.value = null;
    removeToken();
    usePermissionStore().reset();
  }

  return { token, roles, userInfo, login, fetchUserInfo, logout, resetState };
});
