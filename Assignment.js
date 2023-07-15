/*
What is package.json?
package.json file is a file in a application that conatins important information about the application such as depedencies, metadata and scripts.


What is package-lock.json?
package-lock.json file is generated by npm while installing or updating packages in project. It keeps exact versions of packages installed. Commit package-lock.json file along with package.json file to version control system(GitHub).


What is difference between dependencies, devDepedencies and peerDepedencies?
- dependencies: packages that are required for normal operations of app
- devDepedencies: packages that are only required while development and build processes like testing, build scripts.
- peerDepedencies: Peer dependencies are a special type of dependency that would only ever come up if you were publishing your own package. Having a peer dependency means that your package needs a dependency that is the same exact dependency as the person installing your package.

TransitiveDependencies: dependecies of dependecies


What are node_modules?
The node_modules directory is a default directory created in project when we install packages. You should not commit the directory to github because the package.json and package-lock.json are sufficient to create the directory.


What is bundler in web development?
A bundler is a tool that takes multiple files like html, css and javascript and converts them into single optimzed file or set of files for diployment.
Parcel Features: HMR, File watcher algo - c++, Bundling, Minify, Cleaning our code, Dev & Proc build, Super fast build algorithm, Image optimization, Caching while development, Compression, Compatible with older verion of browsers, HTTPS on dev, Port number, Consistent hashing algorithm, Zero config
Ex. Parcel, Webpack, Rollup, Vite


What is hot module replacement(HMR)?
A feature provided by bunders that allows developers to update their code real time without having to reload full page.


What is browserslist?
It is popular tool in web development to define target browsers for which project needs to be compatible. For this we need to add browserslist key in package.json file and we can mention needed browser list. Browser list filter : https://browserslist.dev/?q=bGFzdCAyIHZlcnNpb25z


What are different values of type attribute of script tag?
- text/javascript: Used to embedding javascript code
- module: Allows you to use import and export statement and keeps code in different files.


-------------------------------------------------------------------------------------

What is `NPM`?
npm is node package manager which is used to manage libraries, tools and other dependencies of the project. There are many more long forms of npm on their site but we simply say it node package manager.


What is `Parcel/Webpack`? Why do we need it?
Parcel/Webpack are bundlers that converts multiple files into a single or set of optimized files. They are responsible for minifying, cleaning files and many more.


What is `.parcel-cache`?
.parcel-cache is directory created after running parcel app. It stores all the cached files in this directory for performance optimization. We should not add this directory to github.


What is `npx` ?
npx is a tool that bundled with the npm. It is used to execute node.js packages directly without need to install packages globally or include them in project's dependencies.
Ex. npx create-react-app my-app


What is Tree Shaking?
Tree shaking is originates from the concept of shaking tree and removing dead leaves. Tree shaking analyzes the static structure of the code and determines which parts are actually used or referenced. It then eliminates the unused code during the bundling process, resulting in smaller bundle size.
*/
