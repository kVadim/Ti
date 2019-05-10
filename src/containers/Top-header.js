import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Top-header.css";
import buttons from "../css-modules/buttons.module.css"
import { toggleModal } from "../store/actions/toggleModal";
import { routes } from "../constants/routes";

export class TopHeader extends Component {
  static propTypes = {
    prop: PropTypes.number
  };

  componentDidMount() {
    // console.log("top-header props", this.props);
  }

  toggleModalS() {
    // console.warn("this.props", this.props);
    this.props.toggleModalS();
  }

  navigateTo(path) {
    this.props.history.push(path);
  }

  render() {
    const divStyle = {
      backgroundColor: "grey",
      height: "40px"
    };

    return (
      <div className="top-header-container" style={divStyle}>
        <div className="buttons flex-start">
          <button
            className={buttons['top-header-button']}
            onClick={() => this.navigateTo(routes.listAll)}
          >
            list all
          </button>
          <button
            className={`${buttons['top-header-button']} margin-right-auto`}
            onClick={() => this.navigateTo(routes.goAhead)}
          >
            go ahead
          </button>
          {/* <button
            className={buttons['top-header-button']}
            onClick={() => this.toggleModalS()}
          >
            modal
          </button>
          <button className={buttons['top-header-button']}>portal</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    a: "a"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModalS: () => dispatch(toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
