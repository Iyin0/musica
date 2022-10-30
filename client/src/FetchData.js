import { useState, useEffect } from "react";

const FetchData = (uri) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(uri, {
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'X-RapidAPI-Key': '2f3dc6a8femsh75e9e7e9bacc76ap12ebb7jsn9c16cd56ca26',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        })
            .then(async res => {
                if (res.status === 401) {
                    // resetToken();
                }
                setStatus(res.status);
                if (!res.ok) {
                    throw Error('Unable to fetch the required data');
                }
                return await res.json();
            })
            .then(data => {
                setData(data);
                setFetching(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {

                }
                setFetching(false);
                setError(err.message);
            })

        return () => abortCont.abort();
    }, [uri]);

    return { data, fetching, error, status }
}

export default FetchData;