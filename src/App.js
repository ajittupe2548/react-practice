import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import Counter from './Components/Counter';

// A) Test Utilities
// Importing - import ReactTestUtils from 'react-dom/test-utils';
// Overview - ReactTestUtils makes it easy to test React components in the testing framework of your choice.

// 1) act() - To prepare a component for assertions, wrap the code rendering it and performing updates inside an act() call. This makes your test run closer to how React works in the browser.
// Note - If you use react-test-renderer, it also provides an act export that behaves the same way.
// Don’t forget that dispatching DOM events only works when the DOM container is added to the document. You can use a library like React Testing Library to reduce the boilerplate code.
// The recipes document contains more details on how act() behaves, with examples and usage.

// 2) isElement(element) - Returns true if element is any React element.

// 3) isElementOfType(element, componentClass) - Returns true if element is a React element whose type is of a React componentClass.

// 4) isDOMComponent(instance) - Returns true if instance is a DOM component (such as a <div> or <span>).

// 5) isCompositeComponent(instance) - Returns true if instance is a user-defined component, such as a class or a function.

// 6) isCompositeComponentWithType(instance, componentClass) - Returns true if instance is a component whose type is of a React componentClass.

// 7) findAllInRenderedTree(tree, test) - Traverse all components in tree and accumulate all components where test(component) is true. This is not that useful on its own, but it’s used as a primitive for other test utils.

// 8) scryRenderedDOMComponentsWithClass(tree, className) - Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching className.

// 9) findRenderedDOMComponentWithClass(tree, className) - Like scryRenderedDOMComponentsWithClass() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

// 10) scryRenderedDOMComponentsWithTag(tree, tagName) - Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching tagName.

// 11) findRenderedDOMComponentWithTag(tree, tagName) - Like scryRenderedDOMComponentsWithTag() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

// 12) scryRenderedComponentsWithType(tree, componentClass) - Finds all instances of components with type equal to componentClass.

// 13) findRenderedComponentWithType(tree, componentClass) - Same as scryRenderedComponentsWithType() but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.

// 14) renderIntoDocument(element) - Render a React element into a detached DOM node in the document. This function requires a DOM.
// Note: You will need to have window, window.document and window.document.createElement globally available before you import React. Otherwise React will think it can’t access the DOM and methods like setState won’t work.

// 15) Simulate.{eventName}(element, [eventData]) - Simulate an event dispatch on a DOM node with optional eventData event data. Simulate has a method for every event that React understands.

// B) Test Renderer
// Importing - import TestRenderer from 'react-test-renderer';

// Overview - This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment. Essentially, this package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree)rendered by a React DOM or React Native component without using a browser or jsdom.

// 1) TestRenderer.create(element, options) - Create a TestRenderer instance with the passed React element. It doesn’t use the real DOM, but it still fully renders the component tree into memory so you can make assertions about it. Returns a TestRenderer instance.

// 2) TestRenderer.act(callback) - Similar to the act() helper from react-dom/test-utils, TestRenderer.act prepares a component for assertions. Use this version of act() to wrap calls to TestRenderer.create and testRenderer.update.

// 3) testRenderer.toJSON() - Return an object representing the rendered tree. This tree only contains the platform-specific nodes like <div> or <View> and their props, but doesn’t contain any user-written components. This is handy for snapshot testing.

// 4) testRenderer.toTree() - Return an object representing the rendered tree. The representation is more detailed than the one provided by toJSON(), and includes the user-written components. You probably don’t need this method unless you’re writing your own assertion library on top of the test renderer.

// 5) testRenderer.toTree() - Return an object representing the rendered tree. The representation is more detailed than the one provided by toJSON(), and includes the user-written components. You probably don’t need this method unless you’re writing your own assertion library on top of the test renderer.

// 6) testRenderer.unmount() - Unmount the in-memory tree, triggering the appropriate lifecycle events.

// 7) testRenderer.getInstance() - Return the instance corresponding to the root element, if available. This will not work if the root element is a function component because they don’t have instances.

// 8) testRenderer.root - Returns the root “test instance” object that is useful for making assertions about specific nodes in the tree. You can use it to find other “test instances” deeper below.

// 9) testInstance.find(test) - Find a single descendant test instance for which test(testInstance) returns true. If test(testInstance) does not return true for exactly one test instance, it will throw an error.

// 10) testInstance.findByType(type) - Find a single descendant test instance with the provided type. If there is not exactly one test instance with the provided type, it will throw an error.

// 11) testInstance.findByProps(props) - Find a single descendant test instance with the provided props. If there is not exactly one test instance with the provided props, it will throw an error.

// 12) testInstance.findAll(test) - Find all descendant test instances for which test(testInstance) returns true.

// 13) testInstance.findAllByType(type) - Find all descendant test instances with the provided type.

// 14) testInstance.findAllByProps(props) - Find all descendant test instances with the provided props.

// 15) testInstance.instance - The component instance corresponding to this test instance. It is only available for class components, as function components don’t have instances. It matches the this value inside the given component.

// 16) testInstance.type - The component type corresponding to this test instance. For example, a <Button /> component has a type of Button.

// 17) testInstance.props - The props corresponding to this test instance. For example, a <Button size="small" /> component has {size: 'small'} as props.

// 18) testInstance.parent - The parent test instance of this test instance.

// 19) testInstance.children - The children test instances of this test instance.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
      <Counter />
    </div>
  );
}

export default App;
