import { useUserStore } from '@/stores/user';

/**
 * 判断当前用户是否拥有指定角色（按钮级权限辅助函数）
 * 注意：故意命名为 useRoleCheck 以避免与 @vueuse/core 的 usePermission（浏览器 Permissions API）冲突
 */
export function useRoleCheck() {
  const roles = useUserStore().roles;
  function hasPermission(required: string | string[]): boolean {
    const list = Array.isArray(required) ? required : [required];
    return list.some((r) => roles.includes(r));
  }
  return { hasPermission };
}
