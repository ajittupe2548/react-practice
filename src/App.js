import './App.css';
import { forwardRef, useRef, useImperativeHandle } from 'react';

const randomColor = () => `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const colorRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    },
    changeColor: () => {
      colorRef.current.style.backgroundColor = randomColor();
    }
  }), []);

  return (
    <>
      <input ref={inputRef} {...props} />
      <div ref={colorRef}>Color</div>
    </>
  );
});

function App() {
  const ref = useRef();

  return (
    <>
      <CustomInput ref={ref} placeholder="Type something..." />
      <div />
      <button onClick={() => ref.current.focus()}>Focus Input</button>
      <button onClick={() => ref.current.clear()}>Clear Input</button>
      <button onClick={() => ref.current.changeColor()}>Change bg color</button>
    </>
  );
}

export default App;
