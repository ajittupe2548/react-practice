import React, { useEffect, useRef, useState } from 'react';
import styles from './PasswordGenerator.module.css';

const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@$%^&*()';

const PASSWORDS = [UPPERCASE_LETTERS, LOWERCASE_LETTERS, NUMBERS, SYMBOLS];

const getRandomItem = (str) => {
    let length = str.length;

    const random = Math.floor(Math.random() * length);

    return str[random];
};

function PasswordGenerator() {
    const [copyBtnText, setCopyBtnText] = useState('Copy');
    const [password, setPassword] = useState('');
    const [charCount, setCharCount] = useState(4);
    const [passwordFeatures, setPasswordFeatures] = useState({
        upperCase: false,
        lowerCase: false,
        numbers: false,
        symbols: false,
    });
    const strength = useRef(null);
    const timeoutId = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    const handleSliderChange = (e) => {
        const val = e.target.value;

        setCharCount(val);
    };

    const handleInputChange = (e) => {
        const val = e.target.checked;
        const field = e.target.dataset.input;

        setPasswordFeatures((prev) => ({ ...prev, [field]: val }));
    };

    const handleGenerateClick = () => {
        let newPassword = '';
        let checkedFeatures = [];
        for (let item in passwordFeatures) {
            if (item === 'upperCase' && passwordFeatures[item]) {
                checkedFeatures.push(0);
            } else if (item === 'lowerCase' && passwordFeatures[item]) {
                checkedFeatures.push(1);
            } else if (item === 'numbers' && passwordFeatures[item]) {
                checkedFeatures.push(2);
            } else if (item === 'symbols' && passwordFeatures[item]) {
                checkedFeatures.push(3);
            }
        }

        for (let i = 0; i < charCount; i++) {
            newPassword += getRandomItem(
                PASSWORDS[
                checkedFeatures[Math.floor(Math.random() * checkedFeatures.length)]
                ]
            );
        }

        const countStrength =
            charCount < 8 ? 'poor' : charCount <= 12 ? 'medium' : 'strong';
        const featuresStrength =
            checkedFeatures.length === 1
                ? 'poor'
                : checkedFeatures.length <= 3
                    ? 'medium'
                    : 'strong';

        if (countStrength === 'poor' && featuresStrength === 'poor') {
            strength.current = 'Poor';
        } else if (
            countStrength === 'poor' &&
            (featuresStrength === 'medium' || featuresStrength === 'strong')
        ) {
            strength.current = 'Medium';
        } else if (countStrength === 'medium' && featuresStrength === 'poor') {
            strength.current = 'Poor';
        } else if (countStrength === 'medium' && featuresStrength === 'medium') {
            strength.current = 'Medium';
        } else if (countStrength === 'medium' && featuresStrength === 'strong') {
            strength.current = 'Strong';
        } else if (
            countStrength === 'strong' &&
            (featuresStrength === 'poor' || featuresStrength === 'medium')
        ) {
            strength.current = 'Medium';
        } else if (countStrength === 'strong' && featuresStrength === 'strong') {
            strength.current = 'Strong';
        }

        setPassword(newPassword);
    };

    const handleCopyClick = () => {
        if (copyBtnText === 'Copy') {
            timeoutId.current = setTimeout(() => {
                setCopyBtnText('Copy');
            }, 2000);
            setCopyBtnText('Copied');
            navigator.clipboard.writeText(password);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.password}>{password}</div>
                <div className={styles.copyBtn} onClick={handleCopyClick}>
                    {copyBtnText}
                </div>
            </div>
            <div className={styles.sliderWrapper}>
                <div className={styles.sliderInfo}>
                    <label className={styles.charLengthLabel}>Character Length</label>
                    <span>{charCount}</span>
                </div>
                <input
                    type='range'
                    min={4}
                    max={16}
                    value={charCount}
                    className={styles.charLengthSlider}
                    onChange={handleSliderChange}
                />
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.checkBoxWrapper}>
                    <input
                        type='checkbox'
                        name='upperCaseCheckbox'
                        id='upperCaseCheckbox'
                        value={passwordFeatures.upperCase}
                        data-input='upperCase'
                        onChange={handleInputChange}
                    />
                    <label htmlFor='upperCaseCheckbox'>Include Uppercase Letters</label>
                </div>
                <div className={styles.checkBoxWrapper}>
                    <input
                        type='checkbox'
                        name='lowerCaseCheckbox'
                        id='lowerCaseCheckbox'
                        value={passwordFeatures.lowerCase}
                        data-input='lowerCase'
                        onChange={handleInputChange}
                    />
                    <label htmlFor='lowerCaseCheckbox'>Include Lowercase Letters</label>
                </div>
                <div className={styles.checkBoxWrapper}>
                    <input
                        type='checkbox'
                        name='numbersCheckbox'
                        id='numbersCheckbox'
                        value={passwordFeatures.numbers}
                        data-input='numbers'
                        onChange={handleInputChange}
                    />
                    <label htmlFor='numbersCheckbox'>Include Numbers</label>
                </div>
                <div className={styles.checkBoxWrapper}>
                    <input
                        type='checkbox'
                        name='symbolsCheckbox'
                        id='symbolsCheckbox'
                        value={passwordFeatures.symbols}
                        data-input='symbols'
                        onChange={handleInputChange}
                    />
                    <label htmlFor='symbolsCheckbox'>Include Symbols</label>
                </div>
            </div>
            <p className={styles.strengthWrapper}>
                <span>Strength:</span>
                <span>{strength.current}</span>
            </p>
            <button
                className={styles.generateBtn}
                onClick={handleGenerateClick}
                disabled={
                    !(
                        passwordFeatures.lowerCase ||
                        passwordFeatures.upperCase ||
                        passwordFeatures.symbols ||
                        passwordFeatures.numbers
                    )
                }
            >
                GENERATE PASSWORD
            </button>
        </div>
    );
}

export default PasswordGenerator;
