"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 5000,
});

api.interceptors.request.use(config => {
    const token: string | null = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default function Auth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setIsLoginMode(false);
        } else if (mode === 'login') {
            setIsLoginMode(true);
        }
    }, [searchParams]);

    const setMode = (loginMode: boolean) => {
        setIsLoginMode(loginMode);
        router.replace(`/auth?mode=${loginMode ? 'login' : 'register'}`, { scroll: false });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const response = isLoginMode
                ? await api.post('/login', { email, password })
                : await api.post('/register', { name, email, password });

            const token = response.data?.token;
            if (!token) {
                throw new Error('No token received from server.');
            }

            localStorage.setItem('token', token);
            setSuccessMessage(isLoginMode ? 'Login successful!' : 'Registration successful!');
            
            // Short delay to show success message
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.error || error.response?.data?.message || 'An error occurred. Please try again.');
            } else if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            layout
            initial={false}
            className="w-full flex flex-col"
            transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 25,
            }}
        >
            <div className="flex flex-col items-center mb-6">
                <motion.div 
                    layoutId="logo-icon"
                    className="mb-4"
                >
                    <div className="font-syne font-extrabold text-[32px] text-accent tracking-tighter">
                        FinOs
                    </div>
                </motion.div>
                
                <div className="h-[72px] flex flex-col items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isLoginMode ? 'login-header' : 'reg-header'}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-2xl font-bold text-text-primary tracking-tight font-syne">
                                {isLoginMode ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="text-text-secondary mt-1 text-center text-xs max-w-[240px]">
                                {isLoginMode 
                                    ? 'Access your account with your credentials' 
                                    : 'Start your financial journey with FinOs'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 bg-background-secondary rounded-lg mb-6 border border-border-tertiary/30 relative">
                <div className="absolute inset-y-1 left-1 right-1 pointer-events-none">
                    <motion.div
                        className="h-full bg-background-primary rounded-md shadow-sm border border-border-tertiary/20"
                        initial={false}
                        animate={{
                            width: 'calc(50% - 2px)',
                            x: isLoginMode ? 0 : '100%',
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>
                <button
                    onClick={() => setMode(true)}
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 relative z-10 ${
                        isLoginMode ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setMode(false)}
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 relative z-10 ${
                        !isLoginMode ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                    Register
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                <motion.div 
                    layout
                    className="flex flex-col gap-4"
                    transition={{ 
                        type: "spring", 
                        stiffness: 250, 
                        damping: 25 
                    }}
                >
                    <AnimatePresence initial={false}>
                        {!isLoginMode && (
                            <motion.div
                                key="name-field"
                                initial={{ opacity: 0, height: 0, filter: 'blur(4px)', marginBottom: -16 }}
                                animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)', marginBottom: 0 }}
                                exit={{ opacity: 0, height: 0, filter: 'blur(4px)', marginBottom: -16 }}
                                transition={{ 
                                    height: { type: "spring", stiffness: 250, damping: 25 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="overflow-hidden"
                            >
                                <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required={!isLoginMode}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-background-primary border border-border-tertiary/50 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                                    />
                                </div>
                                <div className="h-4" /> {/* Gap replacement */}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layout>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 bg-background-primary border border-border-tertiary/50 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                            />
                        </div>
                    </motion.div>

                    <motion.div layout>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 bg-background-primary border border-border-tertiary/50 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                            />
                        </div>
                    </motion.div>

                    <motion.div layout className="flex justify-end h-5 overflow-hidden">
                        <AnimatePresence>
                            {isLoginMode && (
                                <motion.button 
                                    key="forgot-pw"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    type="button" 
                                    className="text-[11px] text-accent hover:underline"
                                >
                                    Forgot password?
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.button
                        layout
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-accent/90 text-background-primary font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-accent/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed h-[48px]"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isLoginMode ? 'btn-login' : 'btn-reg'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-sm">{isLoginMode ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </motion.button>
                </motion.div>
            </form>

            <motion.div layout className="mt-6 flex flex-col items-center">
                <div className="h-5 w-full relative mb-4">
                    <AnimatePresence mode="popLayout">
                        {errorMessage && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute w-full p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-[11px]"
                            >
                                <AlertCircle size={14} className="shrink-0" />
                                <p>{errorMessage}</p>
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute w-full p-2 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-2 text-accent text-[11px]"
                            >
                                <CheckCircle2 size={14} className="shrink-0" />
                                <p>{successMessage}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-border-tertiary/30 w-full text-center">
                    <p className="text-text-secondary text-[12px]">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setMode(!isLoginMode)}
                            type="button"
                            className="ml-1.5 text-accent font-medium hover:underline"
                        >
                            {isLoginMode ? 'Register now' : 'Sign in here'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}