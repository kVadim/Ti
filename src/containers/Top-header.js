import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css-modules/top-header.css';
import buttons from '../css-modules/buttons.module.css';
import { toggleModal } from '../store/actions/toggleModal';
import { routes } from '../constants/routes';

export class TopHeader extends Component {
	static propTypes = {
		prop : PropTypes.number
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
		const { pathname } = this.props.location;
		const routeBtnName = pathname.includes('list-all') ? 'go ahead' : 'list all';
		const route = pathname.includes('list-all') ? routes.goAhead : routes.listAll;

		return (
			<div className='top-header-container'>
				<div className='buttons flex-end'>
					<button className={`${buttons['top-header-btn']}`} onClick={() => this.navigateTo(route)}>
						{routeBtnName}
					</button>
					{/* <button
            className={buttons['top-header-btn']}
            onClick={() => this.toggleModalS()}
          >
            modal
          </button>
          <button className={buttons['top-header-btn']}>portal</button> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		a : 'a'
	};
};

const mapDispatchToProps = dispatch => {
	return {
		toggleModalS : () => dispatch(toggleModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader));
