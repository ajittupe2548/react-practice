import './App.css';
import styled from 'styled-components'

const Button = styled.button`
  background: #BF4F74;
  border-radius: 3px;
  border: none;
  color: white;
`

function App() {
  return (
    <div className="App">
      <Button>Click</Button>
    </div>
  );
}

export default App;
