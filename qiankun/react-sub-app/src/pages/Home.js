import React from 'react';

function Home({ message, user, onUpdateUser }) {
  const isQiankun = !!window.__POWERED_BY_QIANKUN__;

  return (
    <div className="home">
      <h3>React 子应用首页</h3>
      <p className="message">{message}</p>

      <div className="info-card">
        <h4>应用信息</h4>
        <p><strong>运行环境：</strong>{isQiankun ? 'Qiankun 子应用' : '独立运行'}</p>
      </div>

      <div className="action-card">
        <h4>全局状态操作</h4>
        <p>当前用户：{user ? user.name : '未登录'}</p>
        <button onClick={onUpdateUser} className="btn">更新用户信息</button>
      </div>
    </div>
  );
}

export default Home;
