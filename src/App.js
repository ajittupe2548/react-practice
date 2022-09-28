import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import React from 'react';

// Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function. The JSX code:
// <MyButton color="blue" shadowSize={2}>
//   Click Me
// </MyButton>
// compiles into:
// React.createElement(
//   MyButton,
//   {color: 'blue', shadowSize: 2},
//   'Click Me'
// )

// Specifying The React Element Type - The first part of a JSX tag determines the type of the React element. Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX <Foo /> expression, Foo must be in scope.
// 1) React Must Be in Scope - Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

// 2) User-Defined Components Must Be Capitalized - When an element type starts with a lowercase letter, it refers to a built-in component like <div> or <span> and results in a string 'div' or 'span' passed to React.createElement. Types that start with a capital letter like <Foo /> compile to React.createElement(Foo) and correspond to a component defined or imported in your JavaScript file.
// We recommend naming components with a capital letter. If you do have a component that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.

// 3) Choosing the Type at Runtime - You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:
// import React from 'react';
// import { PhotoStory, VideoStory } from './stories';
// const components = {
//   photo: PhotoStory,
//   video: VideoStory
// };
// function Story(props) {
//   // Wrong! JSX type can't be an expression.
//   return <components[props.storyType] story={props.story} />;
// }

// To fix this, we will assign the type to a capitalized variable first:
// import React from 'react';
// import { PhotoStory, VideoStory } from './stories';
// const components = {
//   photo: PhotoStory,
//   video: VideoStory
// };
// function Story(props) {
//   // Correct! JSX type can be a capitalized variable.
//   const SpecificStory = components[props.storyType];
//   return <SpecificStory story={props.story} />;

function App() {
  return (
    <div className="App">
      {/* Props in JSX - There are several different ways to specify props in JSX. */}
      {/* JavaScript Expressions as Props */}
      {React.createElement(CHome, {sum: 1+2+3})}
      {/* String Literals - When you pass a string literal, its value is HTML-unescaped. */}
      {React.createElement(CHome, {greetings: "Good Morning!"})}
      {/* Props Default to “True” */}
      {React.createElement(CHome, {isMobile: true})}
      <FHome/>
    </div>
  );
}

export default App;
