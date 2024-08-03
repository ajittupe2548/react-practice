import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ productCount }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://dummyjson.com/products');
                const data = await res.json();
                setProducts(data.products.slice(0, productCount));
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, []);
    return (
        <>
            {
                products.length ? (
                    <div className="productsWrapper">
                        {products.map(item => {
                            const locationUrl = item.title.toLowerCase().split(' ').join('-');
                            return (
                                <div key={item.id} className="product">
                                    <Link to={`/products/${locationUrl}`}
                                        state={item.id} className="link">
                                        <p className="title">
                                            {item.title}
                                        </p>
                                        <img src={item.thumbnail} className="thumbnail" />
                                    </Link>
                                </div>
                            )
                        })}
                        {
                            productCount !== undefined && (
                                <Link to='/products' className="button">View All Products</Link>
                            )
                        }
                    </div >
                ) : (
                    <p>No more products!</p>
                )
            }
        </>

    )
}

export default ProductList;