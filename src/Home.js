import { useEffect, useState } from "react";
import ProductList from "./ProductList";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://dummyjson.com/products');
                const data = await res.json();
                console.log(`*****Output is :  => data:`, data);
                setProducts(data.products.slice(0, 6));
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, []);
    return (
        <>
            <ProductList productCount={6} />
        </>

    )
}

export default Home;