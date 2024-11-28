import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Network Error");
                }
                const data = await res.json();
                setData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
