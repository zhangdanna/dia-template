import React from 'react';

function User({ user }) {
  return (
    <div className="user">
      <h3>用户信息</h3>

      {user ? (
        <div className="user-card">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>
          <div className="user-info">
            <p><strong>姓名：</strong>{user.name}</p>
            <p><strong>ID：</strong>{user.id}</p>
          </div>
        </div>
      ) : (
        <div className="no-user">
          <p>暂无用户信息</p>
          <p className="hint">请在主应用登录后查看</p>
        </div>
      )}
    </div>
  );
}

export default User;
