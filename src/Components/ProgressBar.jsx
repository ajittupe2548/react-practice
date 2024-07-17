/* 45m */
import React, { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar({ maxValue = 100, value: valueProp = 100 }) {
    const [value, setValue] = useState(Math.min(valueProp, 0));
    const intervalId = useRef(null);

    const percentValue = Math.round((value / maxValue) * 100);

    useEffect(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
        intervalId.current = setInterval(() => {
            setValue((prev) => prev + 1);
        }, 20);
        if (value === valueProp) {
            clearInterval(intervalId.current);
        }
    }, [value, valueProp]);

    if (valueProp > maxValue) {
        console.error('Please pass valid props!');
        return;
    }

    return (
        <div className={styles.container}>
            <span className={styles.value}>{percentValue}%</span>
            <div
                className={styles.activeBar}
                style={{ width: `${percentValue}%` }}
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentValue}
            />
        </div>
    );
}

export default ProgressBar;
