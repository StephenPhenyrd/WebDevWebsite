'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error handling


  const handleSignup =  async (e: React.FormEvent)  => {
    e.preventDefault();

    if (!username || !password) {
      setError('All fields are necessary.'); // Set error message
      return;
    }
    try {
        const resUserExists = await fetch('/api/userExists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username
            })

        })
        const {user} = await resUserExists.json();

        if (user) {
            setError("User already exists")
            return;
        }
        const res = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })

        })
        if (res.ok) {
            const form = e.target;
            console.log('New Account Created:', { username, password });
            router.push('/');

        }
    } catch (error) {

    }

    // Mock signup logic
    // console.log('New Account Created:', { username, password });

    // Clear error and redirect to Authview after successful signup
    setError(null);
    // router.push('/authview');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
      <div style={{ width: '300px', padding: '20px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sign Up</h2>
        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#333' }}>
          Already have an account?{' '}
          <span
            onClick={handleLoginRedirect}
            style={{ color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
