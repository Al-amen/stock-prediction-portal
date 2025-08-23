import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../api/axiosConfig';

const VerifyEmailHandler = () => {
    const [searchParam] = useSearchParams();
    const [message, setMessage] = useState('Verifying...');
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParam.get('token');
        if (!token) {
            setMessage('❌ Verification token is missing');
            return;
        }

        const verify = async () => {
            try {
                // ✅ Call Django backend, not React dev server
                const res = await axiosInstance.get(
                    `user/verify-email/?token=${token}`
                  );
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                console.log("Verification response:", res.data);

                setMessage('✅ Email verified successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } catch (err) {
                console.error("Verification failed:", err.response?.data || err.message);
                const errMsg = err.response?.data?.message || '❌ Invalid or expired token.';
                setMessage(errMsg);
            }
        };

        verify();
    }, [searchParam, navigate]);

    return (
        <div className="container mt-5 text-center">
            <h4 className='text-light'>{message}</h4>
        </div>
    );
};

export default VerifyEmailHandler;
