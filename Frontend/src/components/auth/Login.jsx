import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const emailChange = (e) => setEmail(e.target.value);
    const passwordChange = (e) => setPassword(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(apis().loginUser, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) throw new Error(result?.message);

            if (result?.status) {
                toast.success(result?.message);
                localStorage.setItem("accessToken", result?.token);
                navigate('/'); // Redirect on success
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#1E40AF',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
            }}
        >
            <form
                onSubmit={submitHandler}
                style={{
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '400px',
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Close Icon */}
                <div
                    onClick={() => navigate('/')}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        cursor: 'pointer',
                        color: '#333',
                    }}
                    title="Close"
                >
                    <IoClose size={24} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <IoIosLogIn size={36} color="#007bff" />
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Welcome Back</p>
                    <p style={{ color: '#555' }}>Login to continue</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Email *</label>
                    <Input
                        onChange={emailChange}
                        type="email"
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Password *</label>
                    <Input
                        onChange={passwordChange}
                        type="password"
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <Button>
                        <LoadingButton loading={loading} title="Login" />
                    </Button>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                    }}
                >
                    <Link to="/register">Create new account?</Link>
                    <Link to="/forget/password">Forget Password</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;