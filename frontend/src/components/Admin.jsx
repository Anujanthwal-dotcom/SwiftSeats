import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddBusModal from "./modals/AddBusModal.jsx";
import AddScheduleModal from "./modals/AddScheduleModal.jsx";
import EditProfileModal from "./modals/EditProfileModal.jsx";
import Manage from "./modals/Manage.jsx";

export default function Admin() {
    const [buses, setBuses] = useState([])
    let navigate = useNavigate()
    const [showAddBusModal, setShowAddBusModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [manageWindow,setManageWindow] = useState(false)
    const [manageBus,setManageBus] = useState(null)
    useEffect(() => {

        async function checkRole(){
            let response = await axios.get('http://localhost:8080/role',{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data!=null){
                if(response.data==='USER'){
                    navigate('/user')
                }
            }
            else{
                navigate('/home')
            }
        }




        checkRole()
        fetchBuses()
    }, [])

    async function fetchBuses(){
        let response = await axios.get('http://localhost:8080/getAdminBuses',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response)
        if(response.data!=null){
            setBuses(response.data)
        }
    }

    async function deleteBus(bus){
        console.log(bus)
        await axios.delete(`http://localhost:8080/deleteBus/${bus.id}`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        fetchBuses()
    }



    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md h-screen">
                <div className="p-4 text-2xl font-bold border-b text-center">
                    Bus Admin
                </div>
                <nav className="flex flex-col p-4 space-y-2 text-gray-700">


                    <button
                        onClick={() => {
                            setShowAddBusModal(true);
                            setShowScheduleModal(false);
                            setShowProfileModal(false);
                        }}
                        className="text-left w-full px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                    >
                        Add Bus
                    </button>

                    <button
                        onClick={() => {
                            setShowScheduleModal(true);
                            setShowAddBusModal(false);
                            setShowProfileModal(false);
                        }}
                        className="text-left w-full px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                    >
                        Schedule
                    </button>

                    <button
                        onClick={() => {
                            setShowProfileModal(true);
                            setShowAddBusModal(false);
                            setShowScheduleModal(false);
                        }}
                        className="text-left w-full px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                    >
                        Profile
                    </button>
                    <button
                        onClick={()=>{
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}
                        className="text-left w-full px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                    >logout</button>
                </nav>
            </aside>


            {/* Main content */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Top navbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">My Dashboard</h1>
                </header>

                {/* Scrollable content area */}
                <main className="p-6 overflow-y-auto flex-1">
                    <h2 className="text-2xl font-semibold mb-4">My Buses</h2>

                    {buses.length === 0 ? (
                        <p className="text-gray-500">
                            No buses found
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {buses.map((bus) => (
                                <div key={bus.id} className="bg-white p-4 rounded-xl shadow-md">
                                    <div className=''>
                                        <h3 className="text-lg font-medium">{bus.name}</h3>
                                        <p className="text-gray-500">From: {bus.from}</p>
                                        <p className="text-gray-500">To: {bus.to}</p>
                                        <p className="text-gray-500">Timing: {bus.timestamp}</p>
                                        <p className="text-gray-500">Day: {bus.weekday}</p>
                                        <p className="text-gray-500">Max Capacity: {bus.maxSeats}</p>
                                        <p className="text-gray-500">Remaining Seats: {bus.seats}</p>
                                    </div>
                                    <div className='flex space-x-2 justify-self-end px-5'>
                                        <button onClick={()=> {
                                            setManageWindow(true)
                                            setManageBus(bus)
                                        }}  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            Manage
                                        </button>
                                        <button onClick={()=> {
                                            deleteBus(bus)

                                        }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>


            {showAddBusModal && <AddBusModal onClose={() => {
                setShowAddBusModal(false)
                fetchBuses()
            }} />}
            {showScheduleModal && <AddScheduleModal onClose={() => setShowScheduleModal(false)} />}
            {showProfileModal && <EditProfileModal onClose={() => setShowProfileModal(false)} />}
            {manageWindow && <Manage bus={manageBus} onClose={()=> {
                setManageWindow(false)
                fetchBuses()
            }}/>}
        </div>
    );
}
