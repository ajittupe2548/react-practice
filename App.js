import React, { Component, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import NameContext from './NameContext';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const Parent = () => {
    const [name, setName] = useState("Abc");
    return (
        <>
            <NameContext.Provider value={{ name: name, setName: (value) => setName(value) }}>
                <Child1 />
            </NameContext.Provider>
            <Child2 />
        </>
    )
}

const Child1 = () => {
    return (
        <>
            <GrandChild1 />
        </>
    )
}

const GrandChild1 = () => {
    const { name, setName } = useContext(NameContext);
    const [value, setValue] = useState("");
    return (
        <>
            <p>GrandChild 1 : {name}</p>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); setName(e.target.value); }} />
        </>
    )
}

const Child2 = () => {
    return (
        <>
            <GrandChild2 />
        </>
    )
}

class GrandChild2 extends Component {
    render() {
        return (
            <NameContext.Consumer>
                {
                    name => <p>GrandChild 2 : {name.name}</p>
                }
            </NameContext.Consumer>
        )
    }
}

const ExpandCollapse = ({ title, description, isActive, setActiveIndex, index }) => {
    return (
        <>
            <p>{title}</p>
            {
                isActive && <p>{description}</p>
            }
            <button onClick={() => setActiveIndex(index)}>{isActive ? 'Hide' : 'Show'}</button>
        </>
    )
}

const StateLifting = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        Array.from({ length: 5 }, (i, index) => <ExpandCollapse key={index} index={index} isActive={index === activeIndex} setActiveIndex={(index) => setActiveIndex(index === activeIndex ? null : index)} title={`Title ${index + 1}`} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />)
    )
}

const App = () => {
    return (
        <>
            <Parent />
            <StateLifting />
        </>
    )
}

reactRoot.render(<App />);