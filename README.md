# Redux

Redux is a predictable state management library for JavaScript applications. It provides a centralized store for managing application state, enabling predictable state transitions and simplifying debugging and testing.

## Core Principles of Redux

### 1. Single Source of Truth:

- The state of the entire application is stored in a single JavaScript object called the store.
- This makes it easier to manage and reason about the state and facilitates debugging.

### 2. State is Read-Only:

- The only way to modify the state is by dispatching an action.
- This ensures that state changes are explicit and traceable.

### 3. Changes are Made with Pure Functions:

- Reducers, which specify how the state changes in response to an action, are pure functions.
- A pure function is deterministic, meaning the same inputs will always produce the same outputs without side effects.

## Key Concepts of Redux

### 1. Store:

- The store holds the entire application state.
- It is created using the createStore function and provides the following methods:
  - getState(): Returns the current state.
  - dispatch(action): Sends an action to the store to update the state.
  - subscribe(listener): Registers a callback to be invoked whenever the state changes.

### 2. State:

- The state is a plain JavaScript object that represents the data structure of the application.
- It can contain nested objects but should be treated as immutable.

### 3. Action:

- Actions are plain JavaScript objects that describe an intention to change the state.
- Every action must have a type property (a string or symbol) to indicate the type of action being performed.
- Actions can also include additional data (payload) to describe the changes.

### 4. Reducer:

- Reducers are pure functions that determine how the state changes in response to an action.
- They take the current state and an action as arguments and return the new state.
- The reducer must never mutate the current state directly; it should return a new state object.

### 5. Middleware:

- Middleware extends Redux with custom functionality, such as logging, handling asynchronous actions, or interacting with external APIs.
- Middleware functions are called between dispatching an action and reaching the reducer.
- Examples include Redux Thunk and Redux Saga.

### 6. Selectors:

- Selectors are functions that extract or compute derived data from the state.
- They help to encapsulate state structure and improve code reusability.

## Redux data flow

### 1. Action Dispatch:

- The application dispatches an action using `store.dispatch(action)`.

### 2. Middleware:

- The action is first passed through the middlewares in the middleware chain.

### 3. Reducer Execution:

- Redux passes the current state and the dispatched action to the reducer.
- The reducer calculates and returns a new state based on the action type and payload.

### 4. State Update:

- The Redux store updates the state with the result of the reducer.
- Subscribers are notified about the state change, triggering re-renders in the application.

## Benefits of Redux

1. Predictability: Centralized state management and pure reducers ensure predictable state transitions.
2. Debugging and Testing: Debugging is easier with tools like Redux DevTools.
3. Scalability: Redux's architecture supports complex applications with many interdependent components.
4. Integration with Ecosystem: Redux integrates well with middleware and side-effects libraries like Redux Thunk and Redux Saga.

## Limitations of Redux

1. Boilerplate Code: Redux requires defining actions, reducers, and types, which can lead to verbose code. Libraries like Redux Toolkit aim to reduce this boilerplate.
2. Learning Curve: The mental model of actions, reducers, and middleware can be challenging for beginners.
3. Overhead for Simple Applications: For small applications, Redux might introduce unnecessary complexity, and simpler state management solutions may be more appropriate.

## Middleware overview

1. redux-thunk: Handles asynchronous actions by allowing action creators to return functions (thunks) instead of plain action objects. It provides a way to delay the dispatch of actions or dispatch actions conditionally.

2. redux-persist: Allows persisting and rehydrating the Redux store across page reloads. It stores a subset of the state in local storage, session storage, or other storage engines.

3. redux-logger: Logs each dispatched action and the resulting state after it is processed by the reducer. Useful for debugging.

4. redux-immutable: Ensures that the Redux state is immutable by enforcing that the state and the action payload are not mutated.

5. redux-saga: Manages side effects in a Redux app (like fetching data or interacting with APIs) using sagas, which are like background tasks or processes that run independently of the main application flow.

6. redux-devtools: Provides tools for inspecting and debugging the state of a Redux store in the browser. It allows for time-travel debugging and inspecting actions and state.

## Namaste react

useContext vs Redux.

1. useContext:
   Built-in React hook for accessing parent component context.
   Suitable for simpler state management scenarios.
   Ideal for sharing data between components within a subtree.
   Best for smaller applications or isolated components where Redux might be excessive.
   Provides basic global state management without advanced features.
2. Redux:
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

#Pending
redux
react-redux
redux-immutable
redux-persist
redux-logger
redux-thunk
redux-devtools-extension
