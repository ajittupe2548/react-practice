import React, { useState } from 'react'

// Functional component
const MemoExample = React.memo(function FHome(props) {
    return (
        <div>
            Memo
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
