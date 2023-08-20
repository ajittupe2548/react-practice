/*
useContext vs Redux.
1) useContext:
    Built-in React hook for accessing parent component context.
    Suitable for simpler state management scenarios.
    Ideal for sharing data between components within a subtree.
    Best for smaller applications or isolated components where Redux might be excessive.
    Provides basic global state management without advanced features.
2) Redux:
    External state management library for React.
    Designed for more complex global state management.
    Follows a unidirectional data flow pattern using actions and reducers.
    Offers advanced features like middleware, time-travel debugging, and control over asynchronous actions.
    Well-suited for larger applications with extensive state management needs.


Advantage of using Redux Toolkit over Redux.
Redux Toolkit is a library that simplifies the process of using Redux for state management in JavaScript applications. It reduces boilerplate code, offers a simplified way to set up reducers, actions, and the store. It uses the "immer" library for easier immutable updates to state, integrates well with Redux DevTools, and optimizes performance.


Explain Dispatcher.
When an action (a description of an event) is dispatched using the store.dispatch() function, it's sent to a reducer. The reducer is a pure function that takes the current state and the action, and returns a new state. The overall process happens within the store, which holds the application's state and manages state updates based on dispatched actions.


Explain Reducer in redux
In redux, the reducers are the pure functions that contain the logic and calculation that needed to be performed on the state. These functions accept the initial state of the state being used and the action type. It updates the state and responds with the new state.


Explain slice in redux toolkit
In Redux Toolkit, a "slice" is a self-contained module that combines reducer logic, action creators, and action types for a specific part of the application state. It simplifies Redux setup by using the createSlice function, automating the creation of actions and action types. Slices encourage modular and organized state management, reducing boilerplate code and enhancing maintainability. They define how state changes in response to actions and provide a more efficient way to work with Redux.


Explain selector in redux toolkit
In Redux Toolkit, a selector is a function that retrieves specific data from the Redux store. It's closely associated with the createSlice function, simplifying the creation of Redux reducers, actions, and selectors. Selectors decouple components from store details, enhance performance by caching data, and are made using the createSelector function.


Explain createSlice and the configuration it takes.
In Redux Toolkit, the createSlice function simplifies the creation of Redux slices, which are self-contained state portions and reducer logic. It takes initial state, a unique name, and reducer functions as configuration. These reducers generate action creators automatically, reducing manual action type and creator coding. The resulting actions and reducer aid in managing state updates and immutability.
*/
