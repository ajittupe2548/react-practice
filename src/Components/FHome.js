import React, { useState } from 'react'

// Functional component
const MemoExample = React.memo(function FHome(props) {
    // React.createElement
    const createElement = React.createElement("h1",{class:"heading"},"Ajit");
    // React.createFactory
    var div = React.createFactory('div');
    var reactDivElement = div(props, "Ajit");
    return (
        <div>
            Memo
            {createElement}
            {reactDivElement}
        </div>
    )
})

const functionExample = function FunctionalExample(props) {
    return (
        <div>
            Functional
        </div>
    )
}

// Functional component
function FHome() {
    return (
        <div>
            {functionExample(1)}
            <MemoExample count={1}/>
        </div>
    )
}

export default FHome;
