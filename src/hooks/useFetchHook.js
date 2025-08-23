import { useEffect, useState } from 'react'

function useFetchHook(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(url);
                const value = await res.json();

                setData(value);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return {
        data,
        loading,
        error,
    }
}

export default useFetchHook