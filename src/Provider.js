/**
 * Created by boom on 2017/8/22.
 */
import {Component} from "react";
import PropTypes from "prop-types";

class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return this.props.children;
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
};

export default Provider;