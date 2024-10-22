import './App.css';
import { Button } from '@mui/base/Button';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';

function App() {
  return (
    <div className="App">
      <Button className='ajit'>Click Me</Button>
      <Tabs defaultValue={0}>
        <TabsList className='tabs-list'>
          <Tab value={0} className='tab'>My account</Tab>
          <Tab value={1} className='tab'>Profile</Tab>
          <Tab value={2} className='tab'>Language</Tab>
        </TabsList>
        <TabPanel value={0} className='tab-panel'>My account page</TabPanel>
        <TabPanel value={1} className='tab-panel'>Profile page</TabPanel>
        <TabPanel value={2} className='tab-panel'>Language page</TabPanel>
    </Tabs>
    </div>
  );
}

export default App;
