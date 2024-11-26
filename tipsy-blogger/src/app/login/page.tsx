'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const accountExists = mockCheckAccount(username, password);

    if (accountExists) {
      router.push('/authview');
    } else {
      alert('Account does not exist. Please register.');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/signup');
  };

  const mockCheckAccount = (username: string, password: string): boolean => {
    const existingAccounts = [
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass2' },
    ];
    return existingAccounts.some(
      (account) => account.username === username && account.password === password
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
      <div style={{ width: '300px', padding: '20px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                color: '#333',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                color: '#333',
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              background: '#0070f3',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#333' }}>
          Don’t have an account?{' '}
          <span
            onClick={handleRegisterRedirect}
            style={{ color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register now
          </span>
        </p>
      </div>
    </div>
  );
}
