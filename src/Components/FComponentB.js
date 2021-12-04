import React, {useContext} from 'react'
import { ThemeConsumer } from './ThemeContext'
import { UserConsumer } from './UserContext'

export default function FComponentB() {
    const Theme = useContext(ThemeConsumer)
    const User = useContext(UserConsumer)
    return (
        <div>
            Function B - {Theme} - {User}
        </div>
    )
}
