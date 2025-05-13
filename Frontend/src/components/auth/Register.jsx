import React, { useState } from 'react';
import { FaFolderPlus } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import BackToLogin from '../ui/BackToLogin';
import apis from '../../utils/apis';
import toast from "react-hot-toast";
import Spinner from '../ui/Spinner';
import LoadingButton from '../ui/LoadingButton';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const nameChange = (e) => setName(e.target.value);
    const emailChange = (e) => setEmail(e.target.value);
    const passwordChange = (e) => setPassword(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(apis().registerUser, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) throw new Error(result?.message);

            if (result?.status) {
                toast.success(result?.message);
                navigate('/login');
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
                {/* Close Button */}
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

                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <FaFolderPlus size={36} color="#007bff" />
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Welcome</p>
                    <p style={{ color: '#555' }}>Create a new account</p>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '1rem' }}>
                    <label>Name *</label>
                    <Input onChange={nameChange} type="text" required placeholder="Enter your name" />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email *</label>
                    <Input onChange={emailChange} type="email" required placeholder="Enter your email" />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Password *</label>
                    <Input onChange={passwordChange} type="password" required placeholder="Enter your password" />
                </div>

                {/* Register Button */}
                <div style={{ marginBottom: '1rem' }}>
                    <Button>
                        <LoadingButton loading={loading} title="Register" />
                    </Button>
                </div>

                {/* Back to login */}
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    <BackToLogin />
                </div>

                {/* Optional Spinner */}
                {loading && <Spinner />}
            </form>
        </div>
    );
};

export default Register;
