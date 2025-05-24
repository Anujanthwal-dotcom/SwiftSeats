import React, {useState} from 'react'
import axios from "axios";

function Manage({onClose,bus}) {

    let [fromSuggestion,setFromSuggestion] = useState([])
    let [toSuggestion,setToSuggestion] = useState([])
    let [fromActiveField,setFromActiveField] = useState(false)
    let [toActiveField,setToActiveField] = useState(false)
    console.log(bus)
    const [form, setForm] = useState({
        id:bus.id,
        name: bus.name,
        from: bus.from,
        to: bus.to,
        maxSeats: bus.maxSeats,
        weekday: bus.weekday,
        timestamp: bus.timestamp,
        seats:bus.seats
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await axios.post('http://localhost:8080/manageBus',form,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response)
        if(response.data===true){
            onClose()
        }
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
        let response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+fromCity,{
            headers:{
                'x-rapidapi-key': '96eac1982fmshb482084ca661814p12cc26jsnb30612df56bd',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        })
        console.log(response)

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
        let response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+toCity,{
            headers:{
                'x-rapidapi-key': '96eac1982fmshb482084ca661814p12cc26jsnb30612df56bd',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        })
        console.log(response)
        if(response.data!==null){
            setToSuggestion(response.data.data)
        }
    }

    function fromSuggestionClickHandle(city){
        setForm({...form,'from':city.city})
        setFromSuggestion([])
    }

    function toSuggestionClickHandle(city){
        setForm({...form,'to':city.city})
        setToSuggestion([])
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Bus</h2>
                <form className="space-y-4">
                    <input
                        name="name"
                        placeholder="Bus Name"
                        value={form.name}
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        className="input"
                        required />

                    <div className="relative">
                        <input
                            name="from"
                            placeholder="From"
                            value={form.from}
                            onChange={(e) => {
                                handleChange(e);
                                fromSearching(e);
                            }}
                            className="input"
                            required
                        />
                        {fromActiveField && (
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-xl w-full z-50 max-h-48 overflow-y-auto">
                                <ul>
                                    {fromSuggestion.map((city, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-md"
                                            onClick={() => fromSuggestionClickHandle(city)}
                                        >
                                            {city.city}, {city.country}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            name="to"
                            placeholder="To"
                            value={form.to}
                            onChange={(e) => {
                                handleChange(e);
                                toSearching(e);
                            }}
                            className="input"
                            required
                        />
                        {toActiveField && (
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-xl w-full z-50 max-h-48 overflow-y-auto">
                                <ul>
                                    {toSuggestion.map((city, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-md"
                                            onClick={() => toSuggestionClickHandle(city)}
                                        >
                                            {city.city}, {city.country}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    <input
                        name="maxSeats"
                        type="number"
                        placeholder="Max Seats"
                        value={form.maxSeats}
                        onChange={(e)=>{
                            handleChange(e)

                        }}
                        className="input"
                        required />

                    <select
                        name="weekday"
                        value={form.weekday}
                        onChange={handleChange}
                        className="input"
                        required
                    >
                        <option value="" disabled>Select Weekday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>


                    <input
                        name="timestamp"
                        type="time"
                        placeholder="Time"
                        value={form.timestamp}
                        onChange={(e)=>{
                            handleChange(e)

                        }}
                        className="input"
                        required />

                    <div className="flex justify-end space-x-2">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button onClick={(e)=>{handleSubmit(e)}} className="btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Manage
