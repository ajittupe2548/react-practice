import { useState, useEffect } from 'react';
import useName from './useName';

/*
Flaw #4: The Diamond Problem

The "diamond problem" is an ambiguity that arises when two classes B and C inherit from A, and class D inherits from both B and C. If there is a method in A that B and C have overridden, and D does not override it, then which version of the method does D inherit: that of B, or that of C?

This is our “diamond”: 💎
       / useWindowWidth()   \                   / useState()  🔴 Clash
Status                        useSubscription()
       \ useNetworkStatus() /                   \ useEffect() 🔴 Clash

Reliance on the persistent call order naturally resolves it:
                                                / useState()  ✅ #1. State
       / useWindowWidth()   -> useSubscription()
      /                                         \ useEffect() ✅ #2. Effect
Status
      \                                         / useState()  ✅ #3. State
       \ useNetworkStatus() -> useSubscription()
                                                \ useEffect() ✅ #4. Effect

*/

function StatusMessage() {
    const width = useWindowWidth();
    const isOnline = useNetworkStatus();
    return (
        <>
            <p>Window width is {width}</p>
            <p>You are {isOnline ? 'online' : 'offline'}</p>
        </>
    );
}

function useSubscription(subscribe, unsubscribe, getValue) {
    const [state, setState] = useState(getValue());
    useEffect(() => {
        const handleChange = () => setState(getValue());
        subscribe(handleChange);
        return () => unsubscribe(handleChange);
    });
    return state;
}

function useWindowWidth() {
    const width = useSubscription(
        handler => window.addEventListener('resize', handler),
        handler => window.removeEventListener('resize', handler),
        () => window.innerWidth
    );
    return width;
}

function useNetworkStatus() {
    const isOnline = useSubscription(
        handler => {
            window.addEventListener('online', handler);
            window.addEventListener('offline', handler);
        },
        handler => {
            window.removeEventListener('online', handler);
            window.removeEventListener('offline', handler);
        },
        () => navigator.onLine
    );
    return isOnline;
}

export default StatusMessage;