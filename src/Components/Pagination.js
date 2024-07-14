import React, { useEffect, useRef, useState } from 'react';
import styles from './Pagination.module.css';

const LIMIT = 10;
const MAX_BTN_LENGTH = 6;
const SINGLE_BTN_SIZE = 39;

const PaginationContent = ({ products }) => {
    return products.map((product) => (
        <div key={product.id} className={styles.product}>
            {product.id} - {product.title}
        </div>
    ));
};

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const pageWarpperEl = useRef(null);
    const numberOfPages = useRef(null);
    const prevTransformValue = useRef(null);

    useEffect(() => {
        let data;
        const fetchData = async () => {
            const res = await fetch(
                `https://dummyjson.com/products?limit=${LIMIT}&skip=${activePage * LIMIT
                }`
            );
            data = await res.json();
            numberOfPages.current = Math.ceil(data?.total / 10);
            setProducts(data?.products);
        };

        fetchData();
    }, [activePage]);

    const handleBtnClick = (index) => {
        setActivePage(index);
    };

    const handlePrevClick = () => {
        if (activePage === 0) return;
        const newActiveIndex = activePage - 1;
        setActivePage(newActiveIndex);
        if (numberOfPages.current - newActiveIndex > MAX_BTN_LENGTH) {
            prevTransformValue.current = prevTransformValue.current + SINGLE_BTN_SIZE;
            pageWarpperEl.current.style.transform = `translateX(${prevTransformValue.current}px)`;
        }
    };

    const handleNextClick = () => {
        if (activePage === numberOfPages.current - 1) return;
        const newActiveIndex = activePage + 1;
        setActivePage(newActiveIndex);

        if (newActiveIndex >= MAX_BTN_LENGTH) {
            prevTransformValue.current =
                -SINGLE_BTN_SIZE * (newActiveIndex - MAX_BTN_LENGTH + 1);
            pageWarpperEl.current.style.transform = `translateX(${prevTransformValue.current}px)`;
        }
    };

    return (
        <div className={styles.container}>
            <PaginationContent products={products} />

            <div className={styles.btnContainer}>
                <p
                    className={styles.btn}
                    style={{ opacity: activePage === 0 ? 0.3 : null }}
                    onClick={handlePrevClick}
                >
                    Prev
                </p>

                <div className={styles.pageContainer}>
                    <div className={styles.pageWrapper} ref={pageWarpperEl}>
                        {Array.from(Array(numberOfPages.current).keys()).map(
                            (item, index) => {
                                return (
                                    <p
                                        className={styles.btn}
                                        style={{
                                            background: index === activePage ? '#b6efe6' : null,
                                        }}
                                        onClick={() => handleBtnClick(index)}
                                        key={index}
                                    >
                                        {item + 1}
                                    </p>
                                );
                            }
                        )}
                    </div>
                </div>

                <p
                    className={styles.btn}
                    style={{
                        opacity: activePage === numberOfPages.current - 1 ? 0.3 : null,
                    }}
                    onClick={handleNextClick}
                >
                    Next
                </p>
            </div>
        </div>
    );
};

export default Pagination;
