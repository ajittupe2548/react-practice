import React from "react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(`A name was submitted:  ${this.input.current.value} \nSelected file: ${this.fileInput.current.files[0].name}`);
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Name:<input defaultValue="Ajit" type="text" ref={this.input} />
            </label>
            <label>
                Upload file:<input type="file" ref={this.fileInput} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default NameForm;