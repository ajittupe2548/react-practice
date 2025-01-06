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
import BasicImp from './components/BasicImp';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className="App">
          <UserContainer />
          <ItemContainer />
          <ItemContainer cake />
          <CakeContainer />
          <HooksCakeContainer />
          <IceCreamContainer />
          <NewCakeContainer />
          <BasicImp />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
