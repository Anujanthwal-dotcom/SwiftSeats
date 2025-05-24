import React, {useEffect, useState} from 'react'
import busTravel from '../public/2209_w015_n003_974b_p15_974.jpg'
import passenger from '../public/8574950.jpg'
import travel from '../public/9372541.jpg'

import {useNavigate} from "react-router-dom";
import axios from "axios";

function Home() {

    let navigate = useNavigate()

    let token = localStorage.getItem('token')

    //before loading
    useEffect(() => {

        axios.get("http://localhost:8080/role", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((role)=>{
            if (role.data==='USER'){
                navigate('/user')
            }
            else if(role.data === 'ADMIN'){
                navigate('/admin')
            }
        }).catch((error)=>{
            console.log("Error in getting role",error)
        })


    },[navigate, token])


    return (
        <div>
            {/*nav section*/}
            <div className={"h-[100px] flex flex-row items-center rounded-b-lg shadow-md justify-center space-x-[80%] px-50"}>
                <div className={"flex flex-row items-center"}>

                    <h1
                        className="flex items-centerfont-sans font-extrabold tracking-tight text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
                        SwiftSeats
                    </h1>
                </div>
                <div className="m-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-lg font-semibold px-10 py-2 rounded-xl text-neutral-500  hover:text-neutral-600 hover:bg-neutral-200 transition-colors duration-300 focus:outline-none"
                    >
                        Login
                    </button>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-center">
                    <div
                        className="w-full h-[500px] bg-cover bg-center flex items-center"
                        style={{
                            backgroundImage: `url(${busTravel})`,
                            backgroundSize: '100% 100%',
                        }}
                    >
                        <div className="relative z-10 w-full max-w-lg pl-6 sm:pl-12">
                            <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-[0_12px_48px_rgba(0,0,0,0.2)] border border-white/10 ring-1 ring-white/20 p-6 sm:p-10 text-left space-y-5 transition-all duration-300 ease-in-out">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
                                    Catch Your Ride, Your Way
                                </h1>
                                <p className="text-gray-900/90 text-base sm:text-lg leading-relaxed">
                                    Plan smarter. Travel smoother. Whether it’s your everyday route or a spontaneous trip, we make it effortless.
                                </p>
                                <button onClick={()=>{navigate('/signup')}} className="inline-flex items-center bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                    <span>Get Started</span>
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="p-8 bg-gray-100 min-h-screen flex justify-center">

                    <div className='flex-col w-[80%] space-y-10'>
                        <div className="h-[400px] w-full bg-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row gap-6 text-gray-800">
                            {/* Left Side - Image */}
                            <div className="w-full sm:w-1/3 rounded-xl shadow-md">
                                <img
                                    src={passenger}
                                    alt="Subscription Offer"
                                    className="w-full h-full object-fit rounded-2xl"
                                />
                            </div>

                            {/* Right Side - Text Content */}
                            <div className="w-full sm:w-2/3 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2 text-gray-900">SwiftSeats Prime Membership</h3>
                                    <p className="text-base mb-4 opacity-90">
                                        Unlock premium features with <span className="font-semibold">SwiftSeats Prime</span>. Get exclusive offers, faster booking, and zero cancellation fees!
                                    </p>

                                    <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                                        <li>Extra 20% off on all bookings</li>
                                        <li>Priority customer support</li>
                                        <li>Zero cancellation charges</li>
                                    </ul>

                                    <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-sm">
                                        Subscribe now and save more with code <span className="font-semibold text-blue-600">PRIME20</span>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300">
                                        Get Prime
                                    </button>
                                </div>
                            </div>
                        </div>



                        <div className="h-[400px] w-full bg-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row gap-6 text-gray-800">
                            {/* Left Side - Image */}


                            {/* Right Side - Text Content */}
                            <div className="w-full sm:w-2/3 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2 text-gray-900">SwiftSeats Travel Pack</h3>
                                    <p className="text-base mb-4 opacity-90">
                                        Whether it’s your daily commute or spontaneous weekend plans, the <span className="font-semibold">SwiftSeats Travel Pack</span> brings you the best travel experience—efficient, affordable, and reliable.
                                    </p>

                                    <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                                        <li>Instant 10% off on all bookings</li>
                                        <li>Free travel insurance for every ride</li>
                                        <li>Special deals on round trips</li>
                                    </ul>

                                    <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-sm">
                                        Activate your Travel Pack now and enjoy seamless journeys. Use promo code <span className="font-semibold text-blue-600">TRAVEL10</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300">
                                        Get Travel Pack
                                    </button>
                                </div>
                            </div>

                            <div className="w-full sm:w-1/3 rounded-xl shadow-md">
                                <img
                                    src={travel}
                                    alt="Travel Pack"
                                    className="w-full h-full object-fit rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>







                </div>
                <footer className="bg-gray-800 text-white py-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} ApniBUS. All rights reserved.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
                        </div>
                    </div>
                </footer>


            </div>




        </div>

    )
}

export default Home
