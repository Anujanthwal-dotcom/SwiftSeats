import React, { useEffect, useState } from 'react';
import bus from '../public/bus-image.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [otp, setOtp] = useState('');
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        username: '',
        role: '',
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get('http://localhost:8080/role', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((role) => {
                if (role.data === 'USER') navigate('/user');
                else if (role.data === 'ADMIN') navigate('/admin');
            })
            .catch((error) => {
                console.log('Error in getting role', error);
            });
    }, [navigate, token]);

    async function generateOTP(e) {
        e.preventDefault();
        if (userDetails.email === '') return alert('Email should not be empty');
        try {
            const formData = new FormData();
            formData.append('email', userDetails.email);
            const response = await axios.post('http://localhost:8080/generateOTP', formData);
            if (response.data === true) {
                alert('OTP sent');
                setOtpGenerated(true);
            } else {
                alert('Error in sending OTP. Email may already exist.');
            }
        } catch (err) {
            console.error(err);
            alert('Server error while generating OTP.');
        }
    }

    async function verifyOTP(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', userDetails.email);
            formData.append('otp', otp);
            const response = await axios.post('http://localhost:8080/verifyOTP', formData);
            if (response.data === true) {
                alert('OTP verified');
                setOtpVerified(true);
            } else {
                alert('Incorrect OTP');
            }
        } catch (err) {
            alert('Server error during OTP verification');
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', userDetails);
            if (response.data !== null) {
                localStorage.setItem('token', response.data.token);
                if (userDetails.role === 'USER') navigate('/user');
                else if (userDetails.role === 'ADMIN') navigate('/admin');
                else alert('Role is not valid');
            }
        } catch (err) {
            console.error(err);
            alert('Signup failed.');
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left - Image */}
            <div className="md:w-1/2 w-full h-64 md:h-auto bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <img src={bus} alt="Bus" className="w-3/4 max-w-sm object-contain drop-shadow-xl" />
            </div>

            {/* Right - Signup Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in-up">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h2>

                    <form className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                onChange={(e) =>
                                    setUserDetails({ ...userDetails, email: e.target.value })
                                }
                                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button
                            onClick={generateOTP}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
                        >
                            Generate OTP
                        </button>

                        {otpGenerated && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">OTP</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        placeholder="Enter OTP"
                                    />
                                </div>
                                <button
                                    onClick={verifyOTP}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}

                        {otpVerified && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, password: e.target.value })
                                        }
                                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, username: e.target.value })
                                        }
                                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <select
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, role: e.target.value })
                                        }
                                        value={userDetails.role}
                                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    >
                                        <option value="" disabled hidden>
                                            Select a role
                                        </option>
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleSignup}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        Already have an account?
                        <button
                            onClick={() => navigate('/login')}
                            className="ml-1 text-orange-600 hover:underline font-medium"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>

            {/* Animation Keyframe */}
            <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}

export default Signup;
