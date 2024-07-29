import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrencyinfo(){
    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_VuVAkquVAZ5uLdcUO4tzwkZ6MxhIhM8qHxwia2Vw')
            .then((res) => {
                setData(res.data.data)
            })
        console.log(data)
    } , [])
    return data;
}