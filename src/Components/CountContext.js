import React from "react";

// The defaultValue is only useful in a situation where we don't have contextProvider wrapper in our app.
const CountContext = React.createContext({count: { counter: 0 }, handleCount: () => {}});

const CountProvider = CountContext.Provider;
const CountConsumer = CountContext.Consumer;

export { CountProvider, CountConsumer }
