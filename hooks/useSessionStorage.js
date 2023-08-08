const useSessionStorage = () => {
    const getSessionStorage = (key) => {
        const value = sessionStorage.getItem(key);

        return value;
    }

    const setSessionStorage = (key, value) => {
        sessionStorage.setItem(key, value);

        return null;
    }

    return [getSessionStorage, setSessionStorage];
}

export default useSessionStorage;