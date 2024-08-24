import React, { useEffect, useState } from "react";
import swapIcon from './../assets/swap_icon.png';

function Currency(){
    const [inputVal, setInputVal] = useState('');
    const [convert, setConvert] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [currencyVal, setCurrencyVal] = useState('USD');
    const [currencyVal2, setCurrencyVal2] = useState('INR');
    const [currencyList, setCurrencyList] = useState([]);

    const handleChange = (event) => {
        setInputVal(event.target.value);
    };

    const handleCurrencyChange = (event) => {
        setCurrencyVal(event.target.value);
    }

    const handleCurrencyChange2 = (event) => {
        setCurrencyVal2(event.target.value);
    }

    const handleConvert=()=>{
        setTrigger(true);
    }

        useEffect(()=>{
            if(trigger && inputVal){
                fetch(`https://api.frankfurter.app/latest?amount=${inputVal}&from=${currencyVal}&to=${currencyVal2}`)
                .then(response => response.json())
                    .then(data => {
                        setConvert(data.rates[currencyVal2])
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
                    setTrigger(false);
            }
        }, [trigger, inputVal, currencyVal]);
        
        useEffect(()=>{
            if(currencyVal){
                fetch(`https://api.frankfurter.app/currencies`)
                .then(response => response.json())
                    .then(data => {
                        setCurrencyList(Object.keys(data));
                    })
            }
        })
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-300 ">
        <div className='flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mt-8'>
            <h3 className="text-5xl">Currency converter</h3>
            <div className="flex flex-col mt-4 mr-[90px]">

                

                <select className="border border-gray-300" value={currencyVal} onChange={handleCurrencyChange}>
                    {currencyList.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                </select>

                <img src={swapIcon} className="w-6 h-5 mt-7 ml-20" />

                <select className="mt-6 border border-gray-300" value={currencyVal2} onChange={handleCurrencyChange2}>
                    {currencyList.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                </select>

                <label htmlFor="amount" className="text-xl mb-2 mt-5">Amount:</label>
                <input
                    type="text"
                    placeholder="Enter the value..."
                    value={inputVal}
                    className="h-12 w-[52vh] border border-gray-300 rounded max-w-sm"
                    onChange={handleChange}
                    
                />
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-indigo-600 rounded-md px-5 py-2" onClick={handleConvert}>Convert</button>
            </div>

            <div className="mt-4 text-lg font-medium text-right text-green-600">Converted Amount: {convert}</div>
        </div>
    </div>
    )
}

export default Currency;