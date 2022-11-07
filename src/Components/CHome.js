var createReactClass = require('create-react-class');

var CHome = createReactClass({
    componentDidMount: function () {
        setInterval(this.tick, 1000); // Call a method on the mixin
    },

    tick: function () {
        this.setState({ count: this.state.count + 1 });
    },

    // With createReactClass(), you need to define getDefaultProps() as a function on the passed object:
    getDefaultProps: function () {
        return {
            name: 'Mary'
        };
    },

    // With createReactClass(), you have to provide a separate getInitialState method that returns the initial state:
    getInitialState: function() {
        return {count: 1};
    },

    render: function () {
        return <h1>class - {this.props.name} - {this.state.count}</h1>;
    },
});

export default CHome;