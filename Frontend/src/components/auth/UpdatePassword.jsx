
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import BackToLogin from '../ui/BackToLogin';
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';
import LoadingButton from '../ui/LoadingButton';

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(apis().updatePassword, {
                method: 'POST',
                body: JSON.stringify({ password, confirmPassword, token: localStorage.getItem('passToken') }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            setLoading(false);
            if (!response.ok) {
                throw new Error(result?.message);
            }
            if (result?.status) {
                toast.success(result?.message);
                navigate('/login');
                localStorage.removeItem('email');
                localStorage.removeItem('passToken');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
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
                    <RxUpdate size={24} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <RxUpdate size={36} color="#007bff" />
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>New Password</p>
                    <p style={{ color: '#555' }}>Enter at least 6-digit long password</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Password *</label>
                    <Input
                        onChange={passwordChange}
                        type="password"
                        required
                        placeholder="New password"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Confirm Password *</label>
                    <Input
                        onChange={confirmPasswordChange}
                        type="password"
                        required
                        placeholder="Confirm password"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <Button>
                        <LoadingButton loading={loading} title="Update Password" />
                    </Button>
                </div>

                <div>
                    <BackToLogin />
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
