import React, { useState } from 'react';
import { add } from '../utils/helpers';
import './Counter.css';

// 暴露给 Host 消费的计数器组件
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="react-counter">
      <h3>React Counter（remoteB 暴露的组件）</h3>
      <p>当前计数：{count}</p>
      <p>utils.add(count, 10) = {add(count, 10)}</p>
      <div className="counter-actions">
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount(0)}>重置</button>
      </div>
    </div>
  );
}
