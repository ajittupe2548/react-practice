import React, {useContext} from 'react'
import { ThemeConsumer } from './ThemeContext'
import { UserConsumer } from './UserContext'
import { CountConsumer } from './CountContext';

export default function FComponentB() {
    const Theme = useContext(ThemeConsumer)
    const User = useContext(UserConsumer)
    const {count, handleCount } = useContext(CountConsumer);
    return (
        <>
            <div>Function B - {Theme} - {User} {count.counter}</div>
            <button onClick={() => handleCount(true)}>Increment</button>
            <button onClick={() => handleCount(false)}>Decrement</button>
        </>
    )
}
