"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 5000,
});

api.interceptors.request.use(config => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
    return response;
},
(error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
    }
    return Promise.reject(error);
});

export default function Auth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setIsLoginMode(searchParams.get('mode') !== 'register');
    }, [searchParams]);

    const setMode = (loginMode: boolean) => {
        setIsLoginMode(loginMode);
        router.replace(`/auth?mode=${loginMode ? 'login' : 'register'}`);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = isLoginMode
                ? await api.post('/login', { email, password })
                : await api.post('/register', { name, email, password });

            const token = response.data?.token;
            if (!token) {
                setErrorMessage('No token received from server.');
                return;
            }

            localStorage.setItem('token', token);
            setSuccessMessage(isLoginMode ? 'Login successful!' : 'Registration successful!');
            setEmail('');
            setName('');
            setPassword('');

            router.push('/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.error || error.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            setEmail('');
            setName('');
            setPassword('');
        }
    };

    return (
        <div>
            <h2> {isLoginMode ? 'Login' : 'Register'} </h2>
            <form onSubmit={handleSubmit}>
                {!isLoginMode ? (
                    <div>
                        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit">Register</button>
                    </div>
                ) : (
                    <div>
                        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit">Login</button>
                    </div>
                )}
            </form>
            <button type="button" onClick={() => setMode(!isLoginMode)}>
                {isLoginMode ? 'Need an account? Register' : 'Already have an account? Log in'}
            </button>
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
            {successMessage && <p className="success-msg">{successMessage}</p>}
        </div>
    )
}