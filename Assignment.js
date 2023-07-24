/*
Assignment
Is JSX mandatory for React?
No - It is optional feature but recommended.


Is ES6 mandatory for React?
No - It is optional feature but recommended.


{TitleComponent} vs {<TitleComponent/>} vs {<TitleComponent></TitleComponent>} in JSX
<TitleComponent />


How can I write comments in JSX?
Single line comment - //
Multi line comment - /* * /


What is <React.Fragment></React.Fragment> and <></> ?
In JSX we have to place all the elements inside one wrapper. If we don't want to wrap it inside div or any other element then we can use React.Fragment. It basically wraps all the elements inside one wrapper but doesn't add any element inside DOM.


What is Virtual DOM?
Virtual DOM is representation of actual DOM. It is representation of a UI kept in memory and synced with real DOM.


What is Reconciliation in React?
Reconciliation is the process by which React updates the user interface to reflect changes in the application's state.


What is React Fiber?
Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM


Why we need keys in React? When do we need keys in React?
When React renders a list of elements, it needs to efficiently determine which elements have changed, been added, or been removed since the last render. Keys help React identify individual elements and perform a process called "reconciliation" more efficiently. Without keys, React might end up re-rendering the entire list, leading to performance issues.
Whenever you render an array of elements using map() or any other method, it's essential to include a key prop for each item.


Can we use index as keys in React?
Yes we can use index as keys in React but it is not recommended according to the react official documentation. If we don't have any unique value in the data in that case we can use index.


What is props in React?
In React, "props" is short for "properties," and it is a mechanism for passing data from a parent component to a child component.


What is a Config Driven UI ?
Config Driven UI (User Interface) refers to a design approach where the behavior and appearance of a user interface are primarily controlled by configuration files or settings, rather than being hardcoded in the application's source code. This means that various aspects of the UI, such as the layout, styles, and behavior, can be easily modified and customized without the need for extensive code changes or redeployment of the application.
*/
