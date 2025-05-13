import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import BackToLogin from '../ui/BackToLogin';
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';
import LoadingButton from '../ui/LoadingButton';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(apis().ForgetPassword, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem('passToken', result?.token);
        localStorage.setItem('email', email);
        navigate('/otp/verify');
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
            textAlign: 'center',
          }}
        >
          <MdOutlineAttachEmail size={36} color="#007bff" />
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '0.5rem 0 0' }}>
            Forgot your password?
          </p>
          <p style={{ color: '#555', fontSize: '0.95rem' }}>
            Enter your registered email, we’ll send a 6-digit OTP.
          </p>
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label>Email *</label>
          <Input
            onChange={emailChange}
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <div style={{ marginBottom: '1rem' }}>
          <Button>
            <LoadingButton loading={loading} title="Send OTP" />
          </Button>
        </div>

        {/* Back to Login */}
        <div style={{ textAlign: 'center' }}>
          <BackToLogin />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
