import React from 'react'

function FRInput({ innerRef, name }) {
    return (
        <div>
            <input type="text" ref={innerRef} />
        </div>
    )
}

const FRInputWithRef = React.forwardRef((props,ref) => {
    return <FRInput innerRef={ref} {...props} />
})

export default FRInputWithRef;
