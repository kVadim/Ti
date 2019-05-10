import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ModalS.css";

export class ModalS extends Component {
  static propTypes = {
    prop: PropTypes
  };

  listenKeyboard(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener("keydown", this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener(
        "keydown",
        this.listenKeyboard.bind(this),
        true
      );
    }
  }

  onOverlayClick() {
    this.props.onClose();
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div className="modal-overlay-div" style={overlayStyle} />
        <div
          className="modal-content-div"
          style={contentStyle}
          onClick={this.onOverlayClick.bind(this)}
        >
          <div
            className="modal-dialog-div"
            style={dialogStyle}
            onClick={this.onDialogClick}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalS);
