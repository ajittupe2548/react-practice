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

### **Redux Overview**

**Redux** is a predictable state container for JavaScript apps, commonly used with **React** to manage the application state in a central store. It helps manage the global state of an application in a consistent way and makes it easier to debug and test.

In large applications, managing state can become complex, especially when multiple components need to access and modify shared data. Redux provides a way to handle this complexity in a structured way.

---

### **Core Concepts of Redux**

1. **Store**

   - The **store** holds the entire state of the application. It’s a single JavaScript object that contains all the data for the app.
   - The state in the store is **immutable**, meaning it can’t be changed directly. Instead, you dispatch actions to modify it.

2. **Actions**

   - Actions are **plain objects** that describe **what happened** in the application. An action has at least a `type` property, which indicates the action’s type.
   - Actions can optionally have a `payload` that contains additional data needed to modify the state.
   - Example:
     `const addTodoAction = {   type: 'ADD_TODO',   payload: { text: 'Learn Redux' } };`

3. **Reducers**

   - A **reducer** is a function that specifies how the state should change in response to an action.
   - It takes two arguments:
     - The **current state**.
     - The **action** to process.
   - Reducers must be **pure functions**, meaning they don’t modify the original state but instead return a new state object.
   - Example:
     `const initialState = { todos: [] };  function todoReducer(state = initialState, action) {   switch (action.type) {     case 'ADD_TODO':       return { ...state, todos: [...state.todos, action.payload] };     default:       return state;   } }`

4. **Dispatching Actions**

   - **Dispatching** an action is the process of sending an action to the Redux store to trigger a state update. It can be done using the `dispatch` function.
   - Example:
     `store.dispatch(addTodoAction);`

5. **Selectors**

   - **Selectors** are functions that extract specific parts of the state from the store. They are useful for accessing and reusing parts of the state in various components.
   - Example:
     `const selectTodos = (state) => state.todos;`

---

### **Redux Flow**

1. **Action creation**: The user triggers an action (e.g., clicking a button, submitting a form).
2. **Dispatch action**: The action is dispatched to the store.
3. **Reducer function**: The reducer function receives the action and the current state, and returns a new state based on the action.
4. **Update store**: The store updates its state with the new state returned by the reducer.
5. **Re-render components**: React components connected to the store automatically re-render when the state changes.

---

### **Redux Example (With React)**

1. **Install Redux and React-Redux**

   First, install Redux and React-Redux (the binding library for React).
   `npm install redux react-redux`

2. **Create Action Types**

   Define action types as constants.
   `const ADD_TODO = 'ADD_TODO';`

3. **Create Action Creators**

   Action creators are functions that return an action.

   `function addTodo(text) {   return {     type: ADD_TODO,     payload: { text }   }; }`

4. **Create Reducer**

   The reducer updates the state based on the action.

   `const initialState = { todos: [] };  function todoReducer(state = initialState, action) {   switch (action.type) {     case ADD_TODO:       return { ...state, todos: [...state.todos, action.payload] };     default:       return state;   } }`

5. **Create Redux Store**

   Create a Redux store using the reducer.

   `import { createStore } from 'redux';  const store = createStore(todoReducer);`

6. **Create React Components and Connect to Redux**

   Use `connect` from `react-redux` to connect React components to the Redux store.

   `import React from 'react'; import { connect } from 'react-redux'; import { addTodo } from './actions';  function TodoList({ todos, dispatch }) {   const handleAddTodo = () => {     dispatch(addTodo('Learn Redux'));   };    return (     <div>       <button onClick={handleAddTodo}>Add Todo</button>       <ul>         {todos.map((todo, index) => (           <li key={index}>{todo.text}</li>         ))}       </ul>     </div>   ); }  const mapStateToProps = (state) => {   return { todos: state.todos }; };  export default connect(mapStateToProps)(TodoList);`

7. **Provide the Redux Store to the Application**

   Use the `Provider` component from `react-redux` to make the store available to all components.

   `import React from 'react'; import { Provider } from 'react-redux'; import TodoList from './TodoList'; import { store } from './store';  function App() {   return (     <Provider store={store}>       <TodoList />     </Provider>   ); }  export default App;`

---

### **Benefits of Redux**

- **Centralized state management**: All state is stored in one place, making it easier to manage and debug.
- **Predictable**: The state changes in response to actions are predictable and can be traced easily.
- **Middleware support**: Redux supports middleware (like `redux-thunk` or `redux-saga`) to handle asynchronous operations, logging, or other side-effects.
- **Time travel debugging**: Redux DevTools allow you to "travel back" through state changes and see how the app has changed over time.

---

### **When to Use Redux**

- **Complex State Management**: When your application has complex state that needs to be shared across many components or has multiple levels of nested components.
- **Predictability**: When you need a predictable state model and a history of state changes.
- **Debugging**: When you need to debug state transitions easily with tools like Redux DevTools.
- **Asynchronous Flow**: When managing asynchronous operations like data fetching or handling side-effects in a structured way.

---

### **Best Practices**

- **Keep Reducers Pure**: Reducers should not mutate the state or have side effects. They must return new state objects based on the current state and action.
- **Avoid Overusing Redux**: For small apps or simple state, local component state or Context API might be a simpler solution.
- **Use Action Creators**: Encapsulate action creation logic in action creators, making the code more maintainable.
- **Normalize Data**: Store data in a normalized form (e.g., using IDs and references) to make updates and deletions more efficient.

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
