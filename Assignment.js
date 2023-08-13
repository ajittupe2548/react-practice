/*
What is prop drilling?
Prop drilling occurs when a parent component passes data down to its children and then those children pass the same data down to their own children. This process can continue indefinitely.


What is Context Provider and Context Consumer?
A Context Provider is a component that encapsulates a certain piece of data that needs to be shared across multiple components. It essentially acts as a data source that can be accessed by its child components regardless of their nesting depth. This helps avoid "prop drilling," where props are passed through multiple layers of components.
A Context Consumer is a component that subscribes to the data provided by a Context Provider. It allows components deep within the component tree to access the data without having to pass it through intermediate components using props.


If you don’t pass a value to the provider does it take the default value?
Yes, in many programming contexts, if you don't pass a value to a function or a method that has a default parameter, the default value will be used.


What is lifting the state up?
Lifting state up in React refers to a technique used to manage and share state between multiple components by moving the state to a common ancestor component. This is done to maintain a single source of truth for the shared data and ensure that changes to the state are consistent across the components.
*/
