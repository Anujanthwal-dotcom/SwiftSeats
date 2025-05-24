import React, {useEffect, useState} from 'react'
import busTravel from "../public/2209_w015_n003_974b_p15_974.jpg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function User() {

    //states to handle the search functionality.
    let [from,setFrom] = useState('')
    let [to,setTo] = useState('')
    let [date,setDate] = useState('')
    let [fromSuggestion,setFromSuggestion] = useState([])
    let [toSuggestion,setToSuggestion] = useState([])
    let [fromActiveField,setFromActiveField] = useState(false)
    let [toActiveField,setToActiveField] = useState(false)

    //states to handle bus details.
    let [busTypeState,setBusTypeState] = useState('BOOKED')
    let [buses,setBuses] = useState([])

    //navigate
    let navigate = useNavigate()

    let token = localStorage.getItem('token').trim()

    useEffect(()=>{
        console.log("inside effect")
        getBookedBuses()
    },[])

    async function getBookedBuses(){
        let response = await axios.get("http://localhost:8080/user/getBookedBuses", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if(response.data.length!==0)
            setBuses(response.data)
    }

    async function getBooked(e){
        e.preventDefault()
        setBusTypeState('BOOKED')
        setBuses([])
        //get the booked buses
        let response = await axios.get("http://localhost:8080/user/getBookedBuses", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if(response.data.length!==0){
            setBuses(response.data)
        }
    }

    async function getCancelled(e){
        e.preventDefault()
        setBusTypeState('CANCELLED')
        setBuses([])
        //get the cancelled buses
        let response = await axios.get('http://localhost:8080/user/getCancelledBuses',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        setBuses(response.data)
        console.log(response.data)
        console.log(buses)
    }

    async function fromSearching(e){
        e.preventDefault()

        let fromCity = e.target.value
        if(fromCity===''){
            setFromActiveField(false)
            return
        }
        else{
            setFromActiveField(true)
        }


        //make request
        let response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+from,{
            headers:{
                'x-rapidapi-key': '96eac1982fmshb482084ca661814p12cc26jsnb30612df56bd',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        })

        if(response.data!==null){
            setFromSuggestion(response.data.data)
        }

    }

    async function toSearching(e){
        e.preventDefault()

        let toCity = e.target.value
        if(toCity===''){
            setToActiveField(false)
            return
        }
        else{
            setToActiveField(true)
        }

        //make request
        let response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+to,{
            headers:{
                'x-rapidapi-key': '96eac1982fmshb482084ca661814p12cc26jsnb30612df56bd',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        })

        if(response.data!==null){
            setToSuggestion(response.data.data)
        }
    }

    function fromSuggestionClickHandle(city){
        setFrom(city.city)
        setFromSuggestion([])
    }

    function toSuggestionClickHandle(city){
        setTo(city.city)
        setToSuggestion([])
    }

    function onSearch(){
        let search = `/search/${from}/${to}/${date}`
        navigate(search)
    }

    function handleAccountInfo(){

    }

    function  handleLogout(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    async function getAllBuses(){
        setBusTypeState('ALL')

        let response = await axios.get('http://localhost:8080/getAllBuses',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.data.length!==0){
            setBuses(response.data)
        }
    }


    async function onCancelling(obj){
        obj.e.preventDefault()
        console.log('c')
        let response = await axios.post('http://localhost:8080/cancelBus', obj.bus, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data!==null)
            setBuses(response.data)
    }




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
                <div className="relative inline-block text-left">
                    <Menu as="div" className="relative">
                        <div>
                            <Menu.Button className="text-lg font-semibold px-10 py-2 rounded-xl text-neutral-500  hover:text-neutral-600 hover:bg-neutral-200 transition-colors duration-300 focus:outline-none">
                                Account
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-8 w-44 rounded-xl bg-white shadow-md focus:outline-none">
                                <div className="">
                                    <Menu.Item>

                                            <button
                                                className={`w-full text-left px-4 py-2 text-sm text-neutral-500  hover:text-neutral-600 hover:bg-neutral-200 rounded-t-xl `}
                                                onClick={() => handleAccountInfo()}
                                            >
                                                Account Info
                                            </button>

                                    </Menu.Item>

                                    <Menu.Item>

                                            <button
                                                className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-200 rounded-b-xl`}
                                                onClick={() =>handleLogout()}
                                            >
                                                Logout
                                            </button>

                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

            </div>


            {/*content section*/}
            <div>


                {/*search bar */}
                <div className="flex items-center justify-center">
                    <div
                        className="w-full h-[500px]  bg-cover bg-center items-center justify-center"
                        style={{
                            // Adjust the rgba values for your desired overlay darkness
                            backgroundImage: `url(${busTravel})`,
                            backgroundSize: '100% 100%' // Keeps the image corners pinned
                        }}
                    >
                        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                            <form className="flex w-full max-w-6xl shadow-2xl rounded-2xl">

                                {/* Search Fields */}
                                <div className="flex flex-col sm:flex-row gap-4 w-full rounded-l-xl bg-white bg-opacity-95 p-6 sm:p-4 sm:gap-2 flex-1">

                                    {/* From Input */}
                                    <div className="relative w-[25%] sm:w-1/3">
                                        <input
                                            type="text"
                                            value={from}
                                            onChange={(e) => {
                                                setFrom(e.target.value);
                                                fromSearching(e);
                                            }}
                                            placeholder="From"
                                            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            required={true}
                                        />

                                        {fromActiveField && (
                                            <div className="absolute top-full left-0 mt-6 bg-white shadow-lg rounded-xl w-full z-50">
                                                <ul>
                                                    {fromSuggestion.map((city, index) => (
                                                        <li
                                                            key={index}
                                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-xl"
                                                            onClick={()=>fromSuggestionClickHandle(city)}
                                                        >
                                                            {city.city}, {city.country}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>




                                    {/* To Input */}
                                    <div className="relative w-[25%] sm:w-1/3">
                                        <input
                                            type="text"
                                            value = {to}
                                            onChange={(e)=> {
                                                setTo(e.target.value)
                                                toSearching(e)
                                            }}
                                            placeholder="To"
                                            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            required={true}
                                        />
                                        {toActiveField && (
                                            <div className="absolute top-full left-0 mt-6 bg-white shadow-lg rounded-xl w-full z-50">
                                                <ul>
                                                    {toSuggestion.map((city, index) => (
                                                        <li
                                                            key={index}
                                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-xl"
                                                            onClick={()=>toSuggestionClickHandle(city)}
                                                        >
                                                            {city.city}, {city.country}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>


                                    {/* Date Picker */}
                                    <input
                                        type="date"
                                        value = {date}
                                        onChange={(e)=>setDate(e.target.value)}
                                        className="w-[25%] sm:w-1/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                        required={true}
                                    />
                                </div>

                                {/* Search Button */}
                                <button onClick={()=>onSearch()} className="w-[25%] bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 sm:py-0 sm:px-6 transition-all duration-300 rounded-none sm:rounded-r-2xl">
                                    Search
                                </button>
                            </form>
                        </div>


                    </div>
                </div>



                {/*data section*/}
                <div className="p-8 bg-gray-100 min-h-screen flex space-y-4 flex-col">
                    {/*bar*/}
                    <div className='w-full h-[80px] bg-white rounded-xl flex flex-row items-center'>

                        {/*options*/}
                        <div className="p-10 w-full h-[60px] flex items-center space-x-4">

                            <button onClick={(e)=> {
                                getBooked(e)
                            }} className={`px-10 py-4 rounded-lg ${(busTypeState==='BOOKED')?'bg-gray-200':'bg-white'} text-gray-800 text-base font-bold tracking-wide hover:bg-gray-100 transition-colors duration-200`}>
                                Booked
                            </button>
                            <button onClick={(e)=> {
                                getCancelled(e)
                            }} className={`px-10 py-4 rounded-lg ${busTypeState==='CANCELLED'?'bg-gray-200':'bg-white'} text-orange-600 text-base font-bold tracking-wide hover:bg-gray-100 transition-colors duration-200`}>
                                Cancelled
                            </button>

                            <button onClick={(e)=> {
                                getAllBuses(e)
                            }} className={`px-10 py-4 rounded-lg ${(busTypeState==='ALL')?'bg-gray-200':'bg-white'} text-gray-800 text-base font-bold tracking-wide hover:bg-gray-100 transition-colors duration-200`}>
                                All Buses
                            </button>
                        </div>

                        {/*retrieved content*/}


                    </div>

                    {/*show data*/}
                    <div className='w-full h-screen bg-white rounded-xl flex flex-col p-10'>
                        {
                            // buses whether cancelled or booked will be shown here
                            (buses.length===0) &&
                                (<div className='flex flex-col justify-center items-center h-full'>
                                    <h2 className='text-3xl font-bold text-gray-400'>Not Found</h2>
                                </div>)
                        }

                        {buses.length !== 0 && (
                            <div className="w-full overflow-y-auto space-y-2">
                                {buses.map((bus) => (
                                    <div
                                        key={bus.id}
                                        className="w-full rounded-2xl bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 hover:bg-gray-50 transition-all duration-300 space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900">{bus.name}</h2>
                                                <p className="text-sm text-gray-500">Owner: {bus.ownerEmail}</p>
                                            </div>
                                            <button
                                                hidden={(busTypeState !== 'BOOKED')}
                                                onClick={(e) => onCancelling({e,bus})}
                                                className="text-sm px-3 py-1.5 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-700">
                                            <div>
                                                <span className="font-medium text-gray-600">Route:</span> {bus.from} → {bus.to}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Seats:</span> {bus.seats} / {bus.maxSeats}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Day:</span> {bus.weekday}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Time:</span> {bus.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}

                    </div>

                </div>

                {/*footer section*/}
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

export default User
