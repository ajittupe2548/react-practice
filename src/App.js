// import { RenderFunctionComponentV2 } from "./useState"; /* Even if we are not using this component don't remove import */
import "./App.css";
import React from "react";
import Flaw1 from "./components/Flaw1";
import Flaw2 from "./components/Flaw2";
import Flaw3 from "./components/Flaw3";
import Flaw4 from "./components/Flaw4";

/* https://overreacted.io/why-do-hooks-rely-on-call-order/ */

/* https://medium.com/7shifts-rd/why-does-hook-call-order-matter-the-rules-of-react-hooks-explained-55d1dc0a5eff */


/* Few commonly suggested alternative designs for Hooks and show where they break down. */
function App() {
    return (
        <div className="App">
            {/* <Flaw1 /> */}
            {/* <Flaw2 /> */}
            {/* <Flaw3 /> */}
            <Flaw4 />
        </div>
    );
}

export default App;
