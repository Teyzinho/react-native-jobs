import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '79e9f9cfddmsh55a19c435d778fep1ef1c6jsnb75ad6eac581',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
            ...query
        },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error)
            alert('error fetching Data')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    const refetch = () => {
        fetchData();
    }

    return {data, isLoading, error, refetch};
}