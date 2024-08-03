import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const ChevronRightIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 320 512'
      className={className}
    >
      <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
    </svg>
  );
};

const BreadCrumb = ({ pages }) => {
  return (
    <ul className='breadcrumbContainer'>
      {pages.map((item, index) => {
        return (
          <li
            key={index}
            style={{ marginLeft: index !== 0 ? 4 : 0 }}
            className='breadcrumbItem'
          >
            <Link to={item.url} className='link'>
              {item.name}
            </Link>
            {index !== pages.length - 1 && (
              <ChevronRightIcon className='icon' />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Home = () => (
  <>
    <div>Home Page</div>
  </>
);
const Listing = () => (
  <>
    <div>Listing Page</div>
  </>
);
const Details = () => (
  <>
    <div>Details Page</div>
    <BreadCrumb
      pages={[
        { name: 'Home', url: '/' },
        { name: 'Listing', url: '/listing' },
        { name: 'Details', url: '/listing/details' },
      ]}
    />
  </>
);

const Header = () => {
  return (
    <div className='navBar'>
      <Link to='/' className='navItem'>
        Home
      </Link>
      <Link to='/listing' className='navItem'>
        Listing
      </Link>
      <Link to='/listing/details' className='navItem'>
        Details
      </Link>
    </div>
  );
};

const Layout = ({ children }) => {
  return <div className='content'>{children}</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/listing'
          element={
            <Layout>
              <Listing />
            </Layout>
          }
        />
        <Route
          path='/listing/details'
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
