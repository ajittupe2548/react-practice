/*
What is a Microservice?
A microservice is a software architectural style that structures an application as a collection of loosely coupled and independently deployable services. In this approach, an application is broken down into smaller, individual components known as microservices, each responsible for handling a specific business function or capability.
- Decentralization, Loose Coupling, Single Responsibility, Independent Data Storage, Resilience and Fault Isolation, Polyglot Architecture, Continuous Deployment and Integration


What is Monolith architecture?
Monolith is a term used to describe a type of application or system architecture where all components and functionalities are tightly integrated into a single, large, and interconnected unit. In other words, the entire application is built as one cohesive piece, with little to no separation between its different modules or services.
- Single Codebase, Tight Coupling, Single Deployment Unit, Scalability Limitations, Technology Homogeneity, Development Challenges


Why do we need a useEffect Hook?
useEffect hook is used in functional components generally to use lifecycle methods of class component like componentDidMount, componentDidUpdate, componentWillUnmount etc. We can use useEffect for attaching events and clearing the same.


What is Optional Chaining?
Optional chaining is a feature in some programming languages that allows developers to safely access properties or call methods on an object without the need to explicitly check for the existence of each property or method along the chain.
The typical use case for optional chaining is when dealing with objects that may have nested structures and properties that could potentially be null or undefined.
const city = person.address?.city;


What is Shimmer UI?
A shimmer UI is a version of the UI that doesn't contain actual content, but instead mimics the layout and shapes of the content that will eventually appear.
Shimmer UI is commonly used in scenarios where data is being fetched from a server or when there's a delay in presenting the actual content.


What is the difference between JS expression and JS statement?
- JavaScript expression: An expression in JavaScript is any valid unit of code that produces a value. Expressions can be used wherever a value is expected in JavaScript, such as in assignments, function arguments, or as operands in other expressions.
Ex.
5 // A constant value expression
x * 4 // A variable expression
myFunction(10) // A function call expression
- JavaScript Statement: A statement in JavaScript is a complete instruction that performs some action. Unlike expressions, statements do not produce a value directly. Instead, they are executed for their side effects, like changing the program's state, looping, or branching.
Ex.
let x = 5; // An assignment statement
if (x > 3) { // An if statement
  // code block
}
for (let i = 0; i < 10; i++) { // A for loop statement
  // code block
}
function myFunction() { // A function declaration statement
  // code block
}


What is Conditional Rendering in react?
Conditional Rendering in React refers to the technique of conditionally showing or rendering different components or content based on certain conditions or states.


What is CORS?
CORS stands for Cross-Origin Resource Sharing. It is a security feature implemented by web browsers to control how web pages or web applications hosted on one domain can access resources (data, assets, APIs, etc.) hosted on another domain.
Under the same-origin policy, web browsers normally restrict web pages from making requests to a different domain than the one that served the web page. This is done to prevent potential security risks, such as unauthorized data access or manipulation.
Here's how CORS works:
- When a web page or web application makes a request to a different domain (a cross-origin request), the browser sends a "preflight" request with an HTTP OPTIONS method to check if the server allows the actual request.
- The server responds to the preflight request with headers that specify which domains are allowed to access the resource, which HTTP methods are permitted, and which headers can be used in the actual request.
- If the server's CORS headers permit the actual request, the browser allows the cross-origin request to proceed. Otherwise, it will block the request and prevent the web page from accessing the resource.


What is async and await?
async and await are keywords used in modern programming languages, especially in asynchronous programming paradigms, to make working with asynchronous code more convenient and readable.
An async function allows non-blocking execution, enabling tasks to run concurrently. The await keyword is used within an async function to pause execution until a promise is resolved, allowing other tasks to proceed in the meantime. This makes asynchronous code more readable and similar to synchronous code, simplifying the handling of asynchronous operations.
*/
