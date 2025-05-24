import React, { useEffect, useState } from 'react';
import bus from '../public/bus-image.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    let token = localStorage.getItem('token');

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

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', userDetails);
            if (response) {
                localStorage.setItem('token', response.data.token);
                const token = localStorage.getItem('token');
                const role = await axios.get('http://localhost:8080/role', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (role.data === 'USER') navigate('/user');
                else if (role.data === 'ADMIN') navigate('/admin');
                else alert('Role for this user is not found');
            }
        } catch (error) {
            alert('User not found with these credentials.');
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side with Image & Gradient */}
            <div className="md:w-1/2 w-full h-64 md:h-auto bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <img src={bus} alt="Bus" className="w-3/4 max-w-sm object-contain drop-shadow-xl" />
            </div>

            {/* Right Side with Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in-up">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h2>

                    <form className="space-y-6">
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

                        <button
                            onClick={(e) => handleLogin(e)}
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transition-all"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        Don’t have an account?
                        <button
                            onClick={() => navigate('/signup')}
                            className="ml-1 text-orange-600 hover:underline font-medium"
                        >
                            Sign up
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

export default Login;
