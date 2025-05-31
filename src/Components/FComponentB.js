import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { UserContext } from './UserContext'
import { CountContext } from './CountContext';

export default function FComponentB() {
    const Theme = useContext(ThemeContext)
    const User = useContext(UserContext)
    const { count, handleCount } = useContext(CountContext);
    return (
        <>
            <div>Function B - {Theme} - {User} {count.counter}</div>
            <button onClick={() => handleCount(true)}>Increment</button>
            <button onClick={() => handleCount(false)}>Decrement</button>
        </>
    )
}
