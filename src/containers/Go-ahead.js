import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// actions
import { setDoneActionCreator } from '../store/actions/setDoneActionCreator';
import { resetActionCreator } from '../store/actions/resetActionCreator';
import { increaseCatNameIndexAction, decreaseCatNameIndexAction } from '../store/actions/catNamesActions';
import { increaseCatItemIndexAction, decreaseCatItemIndexAction } from '../store/actions/catItemsActions';
// components
import { MultiDirectionCard } from '../components/MultiDirectionCard';
// css
import classNames from 'classnames';
import buttons from '../css-modules/buttons.module.css';

export class GoAhead extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRiddle     : true,
			activeField  : 0,
			maxActiveNum : 1
		};
	}

	componentWillMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	increaseActiveFieldNum() {
		this.setState(prevState => {
			const activeFieldNum = prevState.activeField < prevState.maxActiveNum ? prevState.activeField + 1 : 0;
			return { activeField: activeFieldNum };
		});
	}

	decreaseActiveFieldNum() {
		this.setState(prevState => {
			const activeFieldNum = prevState.activeField > 0 ? prevState.activeField - 1 : prevState.maxActiveNum;
			return { activeField: activeFieldNum };
		});
	}

	setActiveFieldNum(num) {
		this.setState({ activeField: num });
	}

	handleKeyDown = e => {
		// console.log('e.key in GoAhead', e.key);
		switch (e.key) {
			case 'ArrowDown':
				e.shiftKey ? this.increaseActiveFieldNum() : this.setDone();
				break;
			case 'ArrowUp':
				e.shiftKey ? this.decreaseActiveFieldNum() : this.toggleType();
				break;
			case 'Enter':
				e.shiftKey ? this.resetAll() : this.reset()();
				break;
			default:
		}
	};

	setDone = () => {
		const id = this.props.cats[this.props.currentCatNameIndex]['id'];
		const data = [];
		this.props.cats[this.props.currentCatNameIndex]['data'].forEach(item => {
			const newItem = { ...item };
			data.push(newItem);
		});
		data[this.props.currentCatItemIndex]['solved'] || (data[this.props.currentCatItemIndex]['solved'] = true);

		this.props.setDone(id, data);
	};

	reset = catIndex => e => {
		const index = catIndex || this.state.catIndex;
		const id = this.props.cats[index]['id'];
		let data = [ ...this.props.cats[index]['data'] ];
		data.map(item => {
			item['solved'] = false;
			return item;
		});

		this.props.reset(id, data);
	};

	resetAll = () => {
		let catLength = this.props.cats.length;

		while (catLength--) {
			this.reset(catLength)();
		}
	};

	toggleType = () => {
		this.setState(prevState => ({ isRiddle: !prevState.isRiddle }));
	};

	increaseCatItemIndex = () => {
		this.props.increaseCatItemIndex();
		this.state.isRiddle = true;
	};

	decreaseCatItemIndex = () => {
		this.props.decreaseCatItemIndex();
		this.state.isRiddle = true;
	};

	render() {
		// console.log('this.props', this.props);
		const cats = this.props.cats || [];
		const catNames = cats.map(item => item.name);

		const type = this.state.isRiddle ? 'riddle' : 'answer';
		const cat = cats.length && cats[this.props.currentCatNameIndex];
		const catItems = cat && cat['data'].map(item => item[type]);

		const solved =
			cats &&
			cats.length &&
			cats[this.props.currentCatNameIndex]['data'][this.props.currentCatItemIndex] &&
			cats[this.props.currentCatNameIndex]['data'][this.props.currentCatItemIndex].solved;

		const infoLine = classNames('title flex-container flex-start grey margin-top20');

		return (
			<div className='container'>
				<button className={`${buttons['action-btn']}`} onClick={this.reset()}>
					reset cat
				</button>
				<button className={`${buttons['action-btn']}`} onClick={this.resetAll}>
					reset all
				</button>
				<MultiDirectionCard
					items={catNames}
					uppercase={true}
					increaseIndex={this.props.increaseCatNameIndex}
					decreaseIndex={this.props.decreaseCatNameIndex}
					index={this.props.currentCatNameIndex}
					active={this.state.activeField === 0}
					onClick={() => this.setActiveFieldNum(0)}
				/>
				<MultiDirectionCard
					items={catItems}
					uppercase={false}
					increaseIndex={this.increaseCatItemIndex}
					decreaseIndex={this.decreaseCatItemIndex}
					index={this.props.currentCatItemIndex}
					active={this.state.activeField === 1}
					solved={solved}
					onClick={() => this.setActiveFieldNum(1)}
					onDoubleClick={() => this.toggleType()}
				/>

				<button className='set-done margin-top20' onClick={this.setDone}>
					DONE
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log("state.firestore", state.firestore);
	const cats = state.firestore.ordered.cats;
	const catsNames = cats ? cats.map(cat => cat['name']) : [];
	const solved = !!state.solved;
	const currentCatNameIndex = state.filters.app.currentCatNameIndex;
	const currentCatItemIndex = state.filters.app.currentCatItemIndex;

	return { cats, catsNames, solved, currentCatNameIndex, currentCatItemIndex };
};

const mapDispatchToProps = dispatch => ({
	setDone              : (id, data) => dispatch(setDoneActionCreator(id, data)),
	reset                : (id, data) => dispatch(resetActionCreator(id, data)),
	increaseCatNameIndex : () => dispatch(increaseCatNameIndexAction()),
	decreaseCatNameIndex : () => dispatch(decreaseCatNameIndexAction()),
	increaseCatItemIndex : () => dispatch(increaseCatItemIndexAction()),
	decreaseCatItemIndex : () => dispatch(decreaseCatItemIndexAction())
});

export default compose(firestoreConnect([ { collection: 'cats' } ]), connect(mapStateToProps, mapDispatchToProps))(
	GoAhead
);
