import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// React implements a browser-independent DOM system for performance and cross-browser compatibility. We took the opportunity to clean up a few rough edges in browser DOM implementations
// In React, all DOM properties and attributes (including event handlers) should be camelCased. For example, the HTML attribute tabindex corresponds to the attribute tabIndex in React. The exception is aria-* and data-* attributes, which should be lowercased. For example, you can keep aria-label as aria-label.

// A) Differences In Attributes
// 1) checked - The checked attribute is supported by <input> components of type checkbox or radio. You can use it to set whether the component is checked. This is useful for building controlled components. defaultChecked is the uncontrolled equivalent, which sets whether the component is checked when it is first mounted.

// 2) className - To specify a CSS class, use the className attribute. This applies to all regular DOM and SVG elements like <div>, <a>, and others.

// 3) dangerouslySetInnerHTML - dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React, but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it’s dangerous.

// 4) htmlFor - Since for is a reserved word in JavaScript, React elements use htmlFor instead.

// 5) onChange - The onChange event behaves as you would expect it to: whenever a form field is changed, this event is fired. We intentionally do not use the existing browser behavior because onChange is a misnomer for its behavior and React relies on this event to handle user input in real time.

// 6) selected - If you want to mark an <option> as selected, reference the value of that option in the value of its <select> instead. Check out “The select Tag” for detailed instructions.

// 7) style - The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
// Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes from JS (e.g. node.style.backgroundImage). Vendor prefixes other than ms should begin with a capital letter. This is why WebkitTransition has an uppercase “W”.
// React will automatically append a “px” suffix to certain numeric inline style properties. If you want to use units other than “px”, specify the value as a string with the desired unit.
// Not all style properties are converted to pixel strings though. Certain ones remain unitless (eg zoom, order, flex). A complete list of unitless properties can be seen here(https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

// 8) suppressContentEditableWarning - Normally, there is a warning when an element with children is also marked as contentEditable, because it won’t work. This attribute suppresses that warning. Don’t use this unless you are building a library like Draft.js that manages contentEditable manually.

// 9) suppressHydrationWarning - If you use server-side React rendering, normally there is a warning when the server and the client render different content. However, in some rare cases, it is very hard or impossible to guarantee an exact match. For example, timestamps are expected to differ on the server and on the client.
// If you set suppressHydrationWarning to true, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don’t overuse it.

// 10) value - The value attribute is supported by <input>, <select> and <textarea> components. You can use it to set the value of the component. This is useful for building controlled components. defaultValue is the uncontrolled equivalent, which sets the value of the component when it is first mounted.



function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
      <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} style={{color: 'red', padding: 10, margin: '1%'}} />
    </div>
  );
}

export default App;
