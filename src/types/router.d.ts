import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    roles?: string[];
    affix?: boolean;
    keepAlive?: boolean;
    /** 纯分组节点（有子菜单但自身无页面），面包屑点击时跳首页 */
    menuGroup?: boolean;
  }
}
