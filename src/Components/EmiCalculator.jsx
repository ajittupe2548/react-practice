import React, { useEffect, useRef, useState } from 'react';
import styles from './EmiCalculator.module.css';

function EmiCalculator() {
    const [formData, setFormData] = useState({
        totalCost: 5000000,
        interateRate: 12,
        processingFee: 1,
        downPayment: 0,
        emi: 0,
        tenure: 12,
        maxEmi: 0,
    });

    const calculateEMI = (principal, interest, tenure) => {
        const reviseInterestRate = interest / 12 / 100;
        const help = Math.pow(1 + reviseInterestRate, tenure);
        const emi = ((principal * reviseInterestRate * help) / (help - 1)).toFixed(
            2
        );

        return emi;
    };

    const calculateDownpayment = (emi) => {
        const reviseInterestRate = formData.interateRate / 12 / 100;
        const help = Math.pow(1 + reviseInterestRate, formData.tenure);
        const downPayment = (
            formData.totalCost -
            (emi * (help - 1)) / (reviseInterestRate * help)
        ).toFixed(2);

        return downPayment;
    };

    useEffect(() => {
        const maxEmi = calculateEMI(
            formData.totalCost,
            formData.interateRate,
            formData.tenure
        );

        setFormData((prev) => ({ ...prev, maxEmi, emi: maxEmi }));
    }, []);

    const handleCostChange = (e) => {
        const maxEmi = calculateEMI(
            e.target.value,
            formData.interateRate,
            formData.tenure
        );
        const emi = calculateEMI(
            e.target.value - formData.downPayment,
            formData.interateRate,
            formData.tenure
        );
        const downPayment = calculateDownpayment(formData.emi);
        setFormData((prev) => ({
            ...prev,
            totalCost: e.target.value,
            downPayment,
            emi,
            maxEmi,
        }));
    };

    const handleInterestChange = (e) => {
        const maxEmi = calculateEMI(
            formData.totalCost,
            e.target.value,
            formData.tenure
        );
        const emi = calculateEMI(
            formData.totalCost - formData.downPayment,
            e.target.value,
            formData.tenure
        );
        const downPayment = calculateDownpayment(formData.emi);
        setFormData((prev) => ({
            ...prev,
            interateRate: e.target.value,
            downPayment,
            emi,
            maxEmi,
        }));
    };

    const handleProcessingFeeChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            processingFee: e.target.value,
        }));
    };

    const handleTenureChange = (months) => {
        const maxEmi = calculateEMI(
            formData.totalCost,
            formData.interateRate,
            months
        );
        const emi = calculateEMI(
            formData.totalCost - formData.downPayment,
            formData.interateRate,
            months
        );
        setFormData((prev) => ({ ...prev, tenure: months, emi, maxEmi }));
    };

    const handleDownPaymentChange = (e) => {
        const emi = calculateEMI(
            formData.totalCost - formData.downPayment,
            formData.interateRate,
            formData.tenure
        );

        setFormData((prev) => ({ ...prev, downPayment: e.target.value, emi }));
    };

    const handleEmiChange = (e) => {
        const downPayment = calculateDownpayment(formData.emi);

        setFormData((prev) => ({
            ...prev,
            downPayment,
            emi: e.target.value,
        }));
    };

    return (
        <div className={styles.container}>
            <h2>EMI Calculator</h2>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>
                    Total Cost of Asset: {formData.totalCost}
                </label>
                <input
                    className={styles.formInput}
                    type='number'
                    onChange={handleCostChange}
                    value={formData.totalCost}
                />
            </div>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>Interest Rate (in %)</label>
                <input
                    className={styles.formInput}
                    type='number'
                    onChange={handleInterestChange}
                    value={formData.interateRate}
                />
            </div>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>Processing Fee (in %)</label>
                <input
                    className={styles.formInput}
                    type='number'
                    onChange={handleProcessingFeeChange}
                    value={formData.processingFee}
                />
            </div>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>Down Payment</label>
                <p>
                    Total Down Payment:{' '}
                    {(
                        parseInt(formData.downPayment) +
                        (formData.totalCost - formData.downPayment) *
                        formData.processingFee *
                        0.01
                    ).toFixed(2)}
                </p>
                <input
                    className={styles.formInput}
                    type='range'
                    onChange={handleDownPaymentChange}
                    min={0}
                    max={formData.totalCost}
                    value={formData.downPayment}
                />
                <div className={styles.sliderInfo}>
                    <div className={styles.minValue}>0%</div>
                    <div className={styles.value}>{formData.downPayment}</div>
                    <div className={styles.maxValue}>100%</div>
                </div>
            </div>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>EMI</label>
                <p>Total Loan Paid: {(formData.emi * formData.tenure).toFixed(2)}</p>
                <input
                    className={styles.formInput}
                    type='range'
                    onChange={handleEmiChange}
                    min={0}
                    max={formData.maxEmi}
                    value={formData.emi}
                />
                <div className={styles.sliderInfo}>
                    <div className={styles.minValue}>0</div>
                    <div className={styles.value}>{formData.emi}</div>
                    <div className={styles.maxValue}>{formData.maxEmi}</div>
                </div>
            </div>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>Tenure</label>
                <div className={styles.tenureBtnWrapper}>
                    {Array.from(Array(5).keys()).map((item) => {
                        return (
                            <button
                                key={item}
                                className={styles.tenureBtn}
                                style={{
                                    background:
                                        (item + 1) * 12 === formData.tenure ? 'teal' : null,
                                }}
                                onClick={() => handleTenureChange((item + 1) * 12)}
                            >
                                {(item + 1) * 12}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;
