import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Search() {

    //parameters from previous user page redirection. Will be used in useEffect later.
    let params = useParams()
    let backFrom = params.from
    let backTo = params.to
    let backDate = params.date
    //search state manage
    let [from,setFrom] = useState('')
    let [to,setTo] = useState('')
    let [date,setDate] = useState('')
    let [fromSuggestion,setFromSuggestion] = useState([])
    let [toSuggestion,setToSuggestion] = useState([])
    let [fromActiveField,setFromActiveField] = useState(false)
    let [toActiveField,setToActiveField] = useState(false)
    let navigate = useNavigate()
    //searched values for buses
    let [buses, setBuses] = useState([])

    let token = localStorage.getItem('token')

    useEffect(()=>{
        async function getSearchResult(){
            let response = await axios.get(`http://localhost:8080/search/${backFrom}/${backTo}/${backDate}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })

            if(response.data.length!==0){
                setBuses(response.data)
            }
        }
        getSearchResult()
    })

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

    async function onSearch(e){
        e.preventDefault()
        let searchUrl = `http://localhost:8080/search/${from}/${to}/${date}`

        let response = await axios.get(searchUrl,{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })

        if(response.data!==null){
            setBuses(response.data)
        }
        console.log(response)
    }

    //booking buses
    async function book(bus) {
        let response = await axios.post(`http://localhost:8080/bookBus`,bus,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })

        if(response.data === true){
            navigate('/home')
        }
        else{
            alert("can't book")
        }
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex space-y-4 flex-col items-center">
            <div>
                <div className="flex items-center justify-center">

                        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                            <form className="flex w-full max-w-6xl rounded-2xl">

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
                                <button onClick={(e)=>onSearch(e)} className="w-[25%] bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 sm:py-0 sm:px-6 transition-all duration-300 rounded-none sm:rounded-r-2xl">
                                    Search
                                </button>
                            </form>
                        </div>


                    </div>
                </div>

            <div className='flex flex-col items-center bg-white rounded-xl w-full h-screen'>
                {

                    buses.length===0 && (
                        <div className='w-full h-full flex flex-col justify-center items-center text-3xl font-bold text-neutral-300'>
                            Not Found
                        </div>
                    )
                }
                {
                    buses.length !== 0 && (
                        <div className="flex flex-col items-center w-full h-full space-y-4 p-4">
                            <div className="flex flex-col gap-6 mt-6 w-full">
                                {buses.map((bus) => (
                                    <div
                                        key={bus.id}
                                        className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="text-lg font-semibold text-gray-800">{bus.name}</h2>
                                            <span className="text-sm text-gray-500">{bus.weekday}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                            <div>
                                                <span className="font-medium">From:</span> {bus.from}
                                            </div>
                                            <div>
                                                <span className="font-medium">To:</span> {bus.to}
                                            </div>
                                            <div>
                                                <span className="font-medium">Owner:</span> {bus.ownerEmail}
                                            </div>
                                            <div>
                                                <span className="font-medium">Time:</span> {bus.timestamp}
                                            </div>
                                            <div>
                                                <span className="font-medium">Seats Left:</span> {bus.seats}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => book(bus)}
                                                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-800 text-white text-sm rounded-md transition-all duration-200 shadow-sm"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )



                }
            </div>
        </div>
    )
}

export default Search
