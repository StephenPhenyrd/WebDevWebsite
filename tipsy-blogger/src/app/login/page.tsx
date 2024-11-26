'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error message

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
        const res = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/authview', // Optional, where to redirect on success
            username, // Your custom credentials field
            password, // Your custom credentials field
        });
          

      if (res?.error) {
        // If the response contains an error, update the error state
        setError(res.error || 'Invalid login credentials.');
      } else {
        // Successful login
        router.push('/authview');
      }
    } catch (error) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/signup');
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
          {error && (
            <div style={{ color: 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
              {error}
            </div>
          )}
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
