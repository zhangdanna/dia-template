import React, { useEffect, useRef } from 'react';
import { mount } from 'remoteA/Widget';

// React 包装组件：把 remoteA 暴露的框架无关 mount 函数接入 React 生命周期
export default function VueWidgetWrapper({ message, onEvent }) {
  const ref = useRef(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    // 挂载 Vue Widget，并在卸载时清理
    const unmount = mount(ref.current, {
      message,
      onEvent: (count) => onEventRef.current && onEventRef.current(count)
    });
    return unmount;
  }, [message]);

  return <div ref={ref} />;
}
