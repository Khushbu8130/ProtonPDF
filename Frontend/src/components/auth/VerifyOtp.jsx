
import React, { useEffect, useRef, useState } from 'react';
import { FaFingerprint } from "react-icons/fa";
import Button from '../ui/Button';
import BackToLogin from '../ui/BackToLogin';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';
import LoadingButton from '../ui/LoadingButton';
import { IoClose } from 'react-icons/io5';

const VerifyOtp = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);

    const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];
    const [loading, setLoading] = useState(false);
    const [otpTime, setOtpTime] = useState(null);
    const [isExpire, setIsExpire] = useState(false);

    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [otp5, setOtp5] = useState('');
    const [otp6, setOtp6] = useState('');

    const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];
    const navigate = useNavigate();

    useEffect(() => {
        if (ref1.current) {
            ref1.current.focus();
        }
    }, []);

    const inputChange = (event, location) => {
        if (location < 5 && event.target.value) {
            inputRef[location + 1].current.focus();
        }
        otpArray[location](event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const finalOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
        try {
            setLoading(true);
            const response = await fetch(apis().otpVerify, {
                method: 'POST',
                body: JSON.stringify({ otp: finalOtp }),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            setLoading(false);
            if (!response.ok) {
                throw new Error(result?.message);
            }
            if (result?.status) {
                setOtpTime(result?.sendTime);
                toast.success(result?.message);
                navigate("/password/update");
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const getTime = async () => {
            try {
                const response = await fetch(apis().getOtpTime, {
                    method: 'POST',
                    body: JSON.stringify({ token: localStorage.getItem('passToken') }),
                    headers: { 'Content-type': 'application/json' }
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result?.message);
                }
                if (result?.status) {
                    const remainingTime = new Date(result?.sendTime).getTime() - new Date().getTime();
                    if (remainingTime > 0 && otpTime === null) {
                        setOtpTime(remainingTime);
                    } else if (remainingTime <= 0) {
                        setIsExpire(true);
                    }
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        getTime();
    }, [otpTime]);

    const resendHandler = async () => {
        try {
            const response = await fetch(apis().ForgetPassword, {
                method: 'POST',
                body: JSON.stringify({ email: localStorage.getItem('email') }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message);
            }
            if (result?.status) {
                toast.success(result?.message);
                localStorage.setItem('passToken', result?.token);
                setOtpTime(1 * 60 * 1000); // 1 minute
                setIsExpire(false);
            }
        } catch (error) {
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
                    <FaFingerprint size={36} color="#007bff" />
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Verify OTP</p>
                    <p style={{ color: '#555' }}>Enter the 6-digit OTP we sent to your email</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>OTP *</label>
                    <div className="otp_input_container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {inputRef.map((item, index) => (
                            <input
                                required
                                key={index}
                                onChange={(event) => inputChange(event, index)}
                                ref={item}
                                onKeyDown={(e) => {
                                    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
                                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                onInput={(event) => {
                                    if (event.target.value.length > 1) {
                                        event.target.value = event.target.value.slice(0, 1);
                                    }
                                }}

                                // type="number"
                                type="text" //
                                inputMode="numeric" // 
                                pattern="[0-9]*"
                                className="ui_input otp_input"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    marginRight: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <Button>
                        <LoadingButton loading={loading} title="Verify" />
                    </Button>
                </div>

                <div>
                    {otpTime !== null && !isExpire ? (
                        <Timer setIsExpire={setIsExpire} time={otpTime} />
                    ) : (
                        <span onClick={resendHandler} className='otp_resend_action' style={{ color: '#007bff', cursor: 'pointer' }}>
                            Resend OTP
                        </span>
                    )}
                </div>

                <div>
                    <BackToLogin />
                </div>
            </form>
        </div>
    );
};

export default VerifyOtp;
