/*
Explore all the ways of writing css.
1) Inline CSS: This involves placing CSS directly within the HTML tags using the style attribute. It's generally not recommended for large-scale styling due to its limited reusability and maintainability.
2) Internal CSS: In this approach, CSS is written within the <style> tags within the <head> section of an HTML document. It's useful for small-scale styling within a single page.
3) External CSS: This is a widely used method where CSS is written in a separate .css file and linked to the HTML document. It promotes separation of concerns, making your codebase more organized and maintainable.
4) CSS Preprocessors: Preprocessors like Sass, Less, and Stylus allow you to write more advanced and organized CSS using features like variables, nesting, and mixins. The preprocessor code is then compiled into regular CSS for browser consumption.
5) CSS-in-JS: This approach involves writing CSS in JavaScript files, usually using libraries like Styled Components, Emotion, Tailwind.


How do we configure tailwind?
We can follow official documentation for tailwind configuration. It mainly include following steps.
1) Install Tailwind CSS: npm install tailwindcss
2) Create Configuration Files: `npx tailwindcss init` to create tailwind.config.js
3) Configure Your Stylesheet: style.css for @import 'tailwindcss/base';@import 'tailwindcss/components';@import 'tailwindcss/utilities';
4) Customize Configuration
5) Build Process: Link tailwind with bundlers like webpack, parcel, vite etc.
6) Include CSS in HTML
7) Start Using Tailwind Classes


Why do we have .postcssrc file?
The .postcssrc file is used in the context of PostCSS, which is a popular tool used to transform CSS with JavaScript plugins. The purpose of the .postcssrc file is to configure the behavior of PostCSS for a specific project.
PostCSS provides a large ecosystem of plugins to perform different functionalities like linting, minifying, inserting vendor prefixes, and many other things. Despite its name, it is neither a post-processor nor a pre-processor, it is just a transpiler that turns a special PostCSS plugin syntax into a Vanilla CSS.


What are scss and sass?
SCSS (Sassy CSS) and Sass (Syntactically Awesome Stylesheets) are both extensions of CSS that introduce features to make writing and maintaining stylesheets more efficient and organized.
Advantages - Modularity, Reusable Code, Nested Syntax, Variables, Importing
Disadvantages - Learning Curve, Compilation Step, Initial Setup
*/
