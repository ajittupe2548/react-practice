/*
What are different types for testing?
1) Unit Testing: This involves testing individual components or units of code in isolation. The goal is to ensure that each unit functions as expected.
2) Integration Testing: This focuses on testing interactions between different units or components to ensure they work together as intended.
3) Regression Testing: After making changes to the software, regression testing ensures that the new code hasn't introduced any unintended side effects or broken existing functionality.
4) Performance Testing: This involves testing how well the software performs under various conditions, such as high user loads or resource constraints.


What is Enzyme?
Enzyme is a testing utility for React, a popular JavaScript library used for building user interfaces. Enzyme provides various utilities for rendering components, traversing the component tree, and simulating user interactions. This makes it easier to isolate and test individual components in isolation, which is a fundamental aspect of unit testing.


Enzyme vs React Testing Library
Enzyme Advantages:
    Shallow rendering for isolated unit tests.
    Direct inspection and manipulation of component internals.
    Legacy context support.
    Suitable for fine-grained testing of component interactions.
Enzyme Disadvantages:
    Shallow rendering might not reflect real-world usage.
    Tests can become tightly coupled to implementation details.
    Complex setup in some cases.
React Testing Library Advantages:
    Focus on user-centric testing and actual application behavior.
    Emphasis on accessibility testing.
    Encourages component isolation for more independent tests.
    Designed for modern React practices.
    Simple and intuitive API.
React Testing Library Disadvantages:
    No shallow rendering, testing can be more integrated.
    Limited direct component manipulation.
    Requires a mindset shift for developers used to Enzyme or similar tools.
Enzyme is more focused on providing tools to interact with components' internal structure, whereas React Testing Library is focused on testing components based on their user interactions and behavior.


What is Jest and why do we use it?
Jest is a JavaScript testing framework developed by Facebook for testing web applications. It simplifies test writing, execution, and management. It offers built-in matchers, mocking, and snapshot testing. Jest supports parallel execution, code coverage analysis, and integrates with Babel and Webpack. Its defaults ease setup, it's CI-friendly, and benefits from an active community.


Test driven development?
Test-Driven Development (TDD) is an approach in software development where tests are written before actual code. This method ensures functionality, maintains code quality.


Headless Browser?
A headless browser operates without a graphical interface and is useful for tasks like web scraping, testing, and server-side rendering. Combining a headless browser with React, a JavaScript library for building UIs, allows for rendering React components on the server side. This approach improves performance, SEO, and automation for tasks like data extraction and testing. Popular headless browser libraries include Puppeteer and Playwright, both offering APIs to control browsers programmatically. This combination benefits SEO, automation, testing, and data extraction.
*/
