/*
Web Sockets vs API/Long Polling?
1. Long Polling :
It is a technology client requests for data from the server besides waiting for an instant response or essentially entails making an HTTP request to a server and then maintaining the connection open to enable the server to reply later. With the help of long polling the server permits about 6 parallel connections from the browser. It is convenient in contrast to other ways, and it is the oldest method and for this reason, is supported on all web browsers. Though due to the fewer updates in this it does now not furnish re-connection handling.

Advantages-
- Little or no support at all needed for fallback layers.
- It has a short waiting period.
- It is easy to implement.

Disadvantages-
- Latency issues are there.
- It does not offer resource utilization.
- During the process, there are several kinds of delays.

2. WebSocket :
It is a pc communication protocol that permits us full-duplex communication channels over a single transfer control protocol connection. This protocol permits an interplay between a browser and web server with low weight overheads and thus offering real-time data transfer from and to the server.

Advantages-
- Allows two-way communication.
- Compatibility between platforms
- Allows to send and receive data much faster than HTTP.

Disadvantages-
- Does not provide edge caching.
- Non-availability of AJAX-like success mechanisms.
- Web browser must be fully HTML5 compliant.


useMemo?
useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
const cachedValue = useMemo(calculateValue, dependencies)
useMemo is a hook in the React JavaScript library that is used to optimize the performance of functional components. It's part of React's hooks API, introduced in React 16.8. The primary purpose of useMemo is to memoize the result of a computation, preventing unnecessary re-computation when certain dependencies haven't changed.


usecallback?
useCallback is a React Hook that lets you cache a function definition between re-renders.
const cachedFn = useCallback(fn, dependencies)
useCallback is a hook that is used to optimize the performance of functional components by memoizing functions. It's primarily used to prevent unnecessary re-renders of child components in scenarios where the parent component re-renders.


useRef?
useRef is a hook in the React JavaScript library. It's used to obtain a reference to a DOM element or a value that persists across renders of a component. This can be useful for scenarios like accessing or manipulating DOM elements directly, managing focus, or storing mutable values without causing re-renders.
Keep in mind that useRef is not just limited to DOM elements; you can also use it to store any mutable value that you want to persist between renders without causing re-renders of the component.
*/
