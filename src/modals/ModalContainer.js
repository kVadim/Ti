import React, { Component } from 'react';
import Modal1 from './CompStateApproach/Modal1';
import Portal from './Portal/Portal';
import { connect } from 'react-redux';
import { toggleModal } from '../store/actions/toggleModal';
import { routes } from '../constants/routes';

class ModalContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			portal: false
		};
	}

	renderModal() {
		if (this.props.modalS) {
			return <Modal1 text={'Modal1'} onClose={() => this.toggleModalS()} />;
		}
		return null;
	}

	toggleModalS() {
		this.props.toggleModalS();
	}

	navigateToTr() {
		this.props.history.push(routes.listAll);
	}

	render() {
		const portal = this.state.portal ? (
			<Portal>
				<div className="modal">
					<div>
						With a portal, we can render content into a different part of the DOM, as if it were any other
						React child.
					</div>
					This is being rendered inside the #modal-container div.
					<button onClick={() => this.setState({ portal: false })}>Hide modal</button>
				</div>
			</Portal>
		) : null;

		return (
			<div className="Modal container">
				<button className="action-btn" onClick={() => this.toggleModalS()}>
					ModalS
				</button>
				<button className="action-btn" onClick={() => this.setState({ portal: true })}>
					Portal
				</button>
				<button className="action-btn" onClick={() => this.navigateToTr()}>
					Text
				</button>

				{this.renderModal()}
				{portal}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		modalS: state.modalS.modalS
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModalS: () => dispatch(toggleModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
