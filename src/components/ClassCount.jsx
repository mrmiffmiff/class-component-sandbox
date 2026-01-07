import { Component } from "react";

export default class ClassCount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h5>There are {this.props.todos.length} tasks.</h5>
        );
    }
}