import { Component } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");

export class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  static propTypes = {};

  componentDidMount = () => {
    modalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    modalRoot.removeChild(this.el);
  };

  render() {
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      this.el
    );
  }
}

export default Portal;
