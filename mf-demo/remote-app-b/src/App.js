import React from 'react';
import Counter from './components/Counter';
import { greet } from './utils/helpers';
import './App.css';

export default function App() {
  return (
    <div className="standalone">
      <h1>Remote B（React）独立运行</h1>
      <p>{greet('访客')}</p>
      <Counter />
    </div>
  );
}
