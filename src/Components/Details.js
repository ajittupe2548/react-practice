import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Details = () => {
    const location = useLocation();
    const id = location.state;
    const [details, setDetails] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://dummyjson.com/product/${id}`);
                const data = await res.json();
                setDetails(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            {details ? (
                <div className='detailWrapper'>
                    <h2>{details.title}</h2>
                    <img src={details.thumbnail} />
                    <p>$ {details.price}</p>
                    <p>{details.description}</p>
                </div>
            ) : (
                <p>Details not found!</p>
            )}
        </>
    );
};

export default Details;
