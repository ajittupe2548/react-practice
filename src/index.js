import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* https://overreacted.io/react-as-a-ui-runtime/ */

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <App />
// );

/* Reconciliation start */
// const App = () => {
//   const [className, setClassName] = useState('blue');
//   useEffect(() => {
//     setTimeout(() => {
//       setClassName('red');
//     }, 1000);
//   })
//   return (
//     <>
//       <h1>Heading</h1>
//       <button className={className}>{className}</button>
//     </>
//   )
// }

// root.render(
//   <>
//     <h1>Heading</h1>
//     <button className="blue">blue</button>
//   </>
// );

// setTimeout(() => {
//   root.render(
//     <>
//       <button className="red">red</button>
//       <h1>Heading</h1>
//     </>
//   );
// }, 1000);
/* Reconciliation end */

/* Lists start */
/* https://codepen.io/gopinav/pen/gQpepq */
// const App = () => {
//   const [list, setList] = useState([
//     { id: 100 },
//     { id: 101 },
//     { id: 103 },
//     { id: 104 },
//   ]);

//   const handleDescClick = () => {
//     let revList = list.sort((a, b) => {
//       return b.id - a.id;
//     });
//     setList([...revList]);
//   };

//   const handleAscClick = () => {
//     let revList = list.sort((a, b) => {
//       return a.id - b.id;
//     });
//     setList([...revList]);
//   };

//   return (
//     <>
//       <h1>List and keys</h1>
//       <button onClick={handleDescClick}>Descending</button>
//       <button onClick={handleAscClick}>Ascending</button>
//       {list.map((li, index) => {
//         return (
//           <p key={li.id}>
//             <span>{index}</span> | <span>{li.id}</span> |{' '}
//             <input defaultValue={index} />
//           </p>
//         );
//       })}
//     </>
//   );
// };
/* Lists end */

/* Inversion of Control start */
function Page({ user, children }) {
  if (!user.isLoggedIn) {
    return <h1>Please log in</h1>;
  }
  return <div>{children}</div>;
}

const Comments = () => {
  console.log(`*****Output is :  => Comments => Comments:`);
  return <p>Comments</p>;
};

const App = () => {
  return (
    <Page user={{ isLoggedIn: false }}>
      {Comments()}
      <Comments />
    </Page>
  );
};
/* Inversion of Control end */

root.render(<App />);
