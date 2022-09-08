import React from 'react';
import withHOC from './WithHOC';

const Input = withHOC(function Input({ innerRef, name }) {
    return (
        <input type="text" ref={innerRef} />
    )
});

const InputWithHOCRef = React.forwardRef((props,ref) => {
    return <Input innerRef={ref} {...props} />
})

export default InputWithHOCRef;
