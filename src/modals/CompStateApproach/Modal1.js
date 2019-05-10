import React, { Component } from "react";
import "./Modal1.css";

export default class Modal1 extends Component {
  render() {
    const { text, onClose } = this.props;
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <button className="close" onClick={() => onClose()}>
            &times;
          </button>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }
}
