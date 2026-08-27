import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';
import './App.css';

// 独立运行时 base 为空，qiankun 环境下 base 为 /react
const baseName = window.__POWERED_BY_QIANKUN__ ? '/react' : '';

function App(props) {
  const [user, setUser] = useState(null);
  const message = props.message || '暂无消息';

  useEffect(() => {
    if (props.actions) {
      props.actions.onGlobalStateChange((state) => {
        console.log('[React 子应用] 全局状态变化:', state);
        setUser(state.user);
      });
    }
  }, [props.actions]);

  const handleUpdateUser = () => {
    if (props.actions) {
      props.actions.setGlobalState({
        user: { name: '王五（React 子应用更新）', id: 3 }
      });
    }
  };

  return (
    <BrowserRouter basename={baseName}>
      <div className="react-sub-app">
        <header className="sub-header">
          <h2>React 子应用</h2>
          <nav className="sub-nav">
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
            <Link to="/user">用户信息</Link>
          </nav>
        </header>

        <main className="sub-main">
          <Routes>
            <Route path="/" element={
              <Home message={message} user={user} onUpdateUser={handleUpdateUser} />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/user" element={<User user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
