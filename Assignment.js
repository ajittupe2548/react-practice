/*
What is Emmet?
Emmet is a tool that helps you to write code faster. It allows you to type shortcuts that are then converted to full peice of code. We can use ! or html:5 to get full html structure.


Difference between a Library and Framework?
A library is a collection of packages that perform specific operations whereas a framework contains the basic flow and architecture of an application. In the library developer has control over the flow of propgram and choose which parts of the library to use and when to use them. Whereas frameworks often enforce a particular architecture and define the flow of control.


What is CDN? Why do we use it?
Full form of CDN is content delivery network. It is a distributed network of servers strategically located across various geographical locations to deliver web content more efficiently to users. It's main purpose is to reduce latency. Reduces load from main server. Use cached version of files to improve performance.


Why is React known as React?
React is known as react because of its core concept, which is the ability to efficiently "react" to changes in data (state and props) and update the user interface accordingly.


What is crossorigin in script tag?
Cross origin is particularly relevant when using the <script> tag to load scripts from external domains or servers.


What is diference between React and ReactDOM?
React and ReactDOM are both libraries that are part of the React ecosystem. React is a library that can be used for both web and mobile apps. ReactDOM is specifically focused on rendering React components in a web browser environment.


What is difference between react.development.js and react.production.js files via CDN?
This file is used during the development phase of your application. It provides additional warnings and debugging information to help developers. Pfoduction file is intended for use in production environments. It is a minified and optimized version of the React library, which means it has been stripped of any development-specific code and includes various performance optimizations. The production version is smaller in size, loads faster, and omits the additional warnings and debugging information present in the development version.


What is async and defer?
async and defer are attributes that can be added to script tags in HTML to control how JavaScript files are loaded and executed.
When you include the async attribute in a script tag, it means that the script will be downloaded asynchronously while the HTML parsing continues. The script will execute as soon as it finishes downloading, regardless of whether the HTML parsing is complete or not.
When you include the defer attribute in a script tag, it means that the script will be downloaded asynchronously, similar to async. However, the script execution is deferred until the HTML parsing is complete. Scripts with the defer attribute will be executed in the order they appear in the HTML.

Why we add stylesheet in head?
Placing the stylesheet in the <head> allows the browser to start fetching and parsing the CSS file early in the rendering process. This ensures that the styles are ready to be applied to the content as soon as it is rendered, resulting in a faster and smoother user experience.

Why is it important to put the script tag at the end and not in the start?
The reason it was recommended to put <script> tags at the end of the <body> was so the scripts wouldn't stop the browser from parsing the HTML. When a browser gets to a <script> tag it stops everything else and loads the file for that <script> tag and then evaluates it.
*/