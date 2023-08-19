import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { updateName, addSkill, removeSkill } from "./redux/userSlice";
import { increment, decrement, reset } from "./redux/counterSlice";

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const Parent = () => {
    const count = useSelector((store) => store.counter.value);
    return (
        <>
            <Child1 />
            <Child2 />
            <p>Count: {count}</p>
        </>
    );
};

const Child1 = () => {
    return (
        <>
            <GrandChild1 />
        </>
    );
};

const GrandChild1 = () => {
    const name = useSelector((store) => store.user.name);
    const dispatch = useDispatch();
    const [value, setValue] = useState(name);
    const [skill, setSkill] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        dispatch(updateName(e.target.value));
    };

    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {
                    setSkill(e.target.value);
                }}
            />
            <button onClick={() => dispatch(addSkill(skill))}>Add</button>
            <button onClick={() => dispatch(removeSkill(skill))}>Remove</button>
        </>
    );
};

const Child2 = () => {
    const dispatch = useDispatch();
    return (
        <>
            <GrandChild2 />
            <hr />
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </>
    );
};

const GrandChild2 = () => {
    const name = useSelector((store) => store.user.name);
    const skills = useSelector((store) => store.user.skills);

    return (
        <>
            <p>GrandChild 2 : {name}</p>
            <p>
                Skills:
                {skills.map((item, index) => (
                    <span style={{ margin: 10 }} key={index}>
                        {item}
                    </span>
                ))}
            </p>
        </>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <Parent />
        </Provider>
    );
};

reactRoot.render(<App />);
