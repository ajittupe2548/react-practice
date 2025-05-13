import './App.css';
import CakeContainer from './components/CakeContainer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import HooksCakeContainer from './components/HooksCakeContainer';
import IceCreamContainer from './components/IceCreamContainer';
import NewCakeContainer from './components/NewCakeContainer';
import ItemContainer from './components/ItemContainer';
import UserContainer from './components/UserContainer';
import BasicImpV2 from './components/BasicImpV2';

function App() {
  return (
    <BasicImpV2 />
  );
}

export default App;
