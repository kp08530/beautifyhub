import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>登入頁面</h1>
      <form>
        <div>
          <label>帳號：</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>密碼：</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">登入</button>
      </form>
    </div>
  );
};

export default LoginPage;
