import type { App, Directive } from 'vue'
import { useUserStore } from '@/stores/user'

type PermissionValue = string | string[]

const permission: Directive<HTMLElement, PermissionValue> = {
  mounted(el, binding) {
    const required = Array.isArray(binding.value) ? binding.value : [binding.value]
    const roles = useUserStore().roles
    const allowed = required.some((r) => roles.includes(r))
    if (!allowed) {
      el.parentElement?.removeChild(el)
    }
  },
}

export function setupDirectives(app: App): void {
  app.directive('permission', permission)
}
