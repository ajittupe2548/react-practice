const reactRoot = ReactDOM.createRoot(document.getElementById("react-root"));

const reactHeading1 = React.createElement("h2", {
    className: "react-heading",
    key: 1,
}, "Hello World 1 from React!");

const reactHeading2 = React.createElement("h2", {
    className: "react-heading",
    key: 2,
}, "Hello World 2 from React!");

const reactHeadingContainer = React.createElement("div", { className: "react-heading-container", }, [reactHeading1, reactHeading2]);

reactRoot.render(reactHeadingContainer);