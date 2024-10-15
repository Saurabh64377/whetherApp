import React, { useState } from 'react';
import { TbVirusSearch } from "react-icons/tb";

const Whether = () => {
    const [city, setCity] = useState('');
    const [wdetails, setWdetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 
        
        if (city === '') {
            alert("PLEASE ENTER A CITY NAME!");
            setLoading(false);
            return;
        } 
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
            .then((res) => res.json())
            .then((final) => {
                if (final.cod === '404') {
                    alert("PLEASE ENTER A VALID NAME!");
                    setCity('');
                    // setWdetails(null); 
                } else {
                    setWdetails(final);
                    setCity('');
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false)); 
    };

    return (
        <div className='cont text-dark'>
            <h2 className='text-center fw-bold'>Whether App🌤️</h2>
            <form onSubmit={handleSubmit} className='weather'>
                <div className='d-flex align-items-center justify-content-center gap-1'>
                    <input
                        className='rounded-3 border-0 p-1'
                        value={city}
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter city name'
                    />
                    <button type="submit" className='btn btn-outline-light btn-sm'>
                        <TbVirusSearch size={20} />
                    </button>
                </div>

                {loading ? (
                    <div className='d-flex justify-content-center '>
                        <div className=" my-3 spinner-border text-light" role="status">
                            
                        </div>
                    </div>
                ) : wdetails ? (
                    <div className='mt-4 d-flex align-items-center justify-content-center flex-column fw-bold '>
                        <h3>
                            City: {wdetails.name} <span>in</span>
                        </h3>
                        <h1>{wdetails.main.temp}°C</h1>
                        <div>
                            <img
                                height={120}
                                src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}
                                alt={wdetails.weather[0].description}
                            />
                        </div>
                        <p>{wdetails.weather[0].description}</p>
                    </div>
                ) : (
                    <div className='text-center fs-3 text-light fw-bold '>No data found</div>
                )}
            </form>
        </div>
    );
};

export default Whether;
