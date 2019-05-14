import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// actions
import { setDoneActionCreator } from '../store/actions/setDoneActionCreator';
import { resetActionCreator } from '../store/actions/resetActionCreator';
import { increaseCatNameIndexAction } from '../store/actions/catNamesActions';
import { decreaseCatNameIndexAction } from '../store/actions/catNamesActions';
// components
import { MultiDirectionCard } from '../components/MultiDirectionCard';
// css
import classNames from 'classnames';
import tasks from '../css-modules/tasks.module.css';
import buttons from '../css-modules/buttons.module.css';

export class GoAhead extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index        : 0,
			stage        : 0,
			catIndex     : 0,
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

	handleClick = () => {
		this.setState(prevState => ++prevState.stage);
	};

	// handleKeyDown = e => {
	// 	console.log('e.key in GoAhead', e.key);
	// 	switch (e.key) {
	// 		case 'ArrowDown':
	// 			e.shiftKey ? this.increaseActiveFieldNum() : this.setDone();
	// 			break;
	// 		case 'ArrowUp':
	// 			e.shiftKey ? this.decreaseActiveFieldNum() : this.increaseStage();
	// 			break;
	// 		case 'ArrowRight':
	// 			e.shiftKey ? this.increaseCatIndex() : this.increaseIndex();
	// 			break;
	// 		case 'ArrowLeft':
	// 			e.shiftKey ? this.decreaseCatIndex() : this.decreaseIndex();
	// 			break;
	// 		case 'Enter':
	// 			e.shiftKey ? this.resetAll() : this.reset()();
	// 			break;
	// 		default:
	// 	}
	// };

	getOptions() {
		return Object.keys(this.state.categories).map(cat => (
			<option value={cat} key={cat}>
				{cat.toUpperCase()}
			</option>
		));
	}

	increaseIndex = () => {
		this.setState(prevState => {
			return (
				prevState.index < this.props.cats[this.state.catIndex]['data'].length - 1 && {
					index : ++prevState.index,
					stage : 0
				}
			);
		});
	};

	increaseCatIndex = () => {
		this.setState(prevState => {
			return (
				prevState.catIndex < this.props.cats.length - 1 && {
					catIndex : ++prevState.catIndex,
					index    : 0,
					stage    : 0
				}
			);
		});
	};

	decreaseIndex = () => {
		this.setState(prevState => {
			return prevState.index > 0 && { index: --prevState.index, stage: 0 };
		});
	};

	decreaseCatIndex = () => {
		this.setState(prevState => {
			return prevState.catIndex > 0 && { catIndex: --prevState.catIndex, index: 0, stage: 0 };
		});
	};

	increaseStage = () => {
		// this.setState(prevState => ({ stage: ++prevState.stage }))
		this.props.increaseCatIndex();
	};

	setDone = () => {
		const id = this.props.cats[this.state.catIndex]['id'];
		const data = [];
		this.props.cats[this.state.catIndex]['data'].forEach(item => {
			const newItem = { ...item };
			data.push(newItem);
		});
		data[this.state.index]['solved'] || (data[this.state.index]['solved'] = true);

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

		console.log('data', data);

		this.props.reset(id, data);
	};

	resetAll = () => {
		let catLength = this.props.cats.length;

		console.log('catLength0', catLength);

		while (catLength--) {
			console.log('catLength', catLength);
			this.reset(catLength)();
		}
	};

	render() {
		console.log('this.props', this.props);
		const cats = this.props.cats || [];
		const catNames = cats.map(item => item.name);
		const index = this.state.index;
		const stage = this.state.stage;
		const type = !this.state.stage ? 'riddle' : 'answer';
		const cat = cats.length && cats[this.props.currentCatNameIndex];
		const catItems = cat && cat['data'].map(item => item[type]);
		console.log('catItems', catItems);

		const solved =
			cats &&
			cats.length &&
			cats[this.state.catIndex]['data'][index] &&
			cats[this.state.catIndex]['data'][index].solved;

		const currentCat = this.props.catsNames[this.state.catIndex] || 'not found';
		const currentItem =
			cats.length && cats[this.state.catIndex]['data'][index]
				? cats[this.state.catIndex]['data'][index][type]
				: 'not found';
		//styles
		const taskContainer = classNames('flex-container', 'flex-center', { grey: !stage }, 'margin-top20');
		const setSolved = classNames({ green: solved });
		const infoLine = classNames('title flex-container flex-start grey margin-top20');

		return (
			<div className='container'>
				<button className={`${buttons['action-btn']}`} onClick={this.reset()}>
					reset cat
				</button>
				<button className={`${buttons['action-btn']}`} onClick={this.resetAll}>
					reset all
				</button>
				<div className={infoLine}>{`stage: ${stage}`}</div>
				<div className={infoLine}>{`index: ${this.state.index}`}</div>
				<div className={infoLine}>{`solved: ${solved}`}</div>
				<MultiDirectionCard
					items={catNames}
					uppercase={true}
					increaseIndex={this.props.increaseCatNameIndex}
					decreaseIndex={this.props.decreaseCatNameIndex}
					index={this.props.currentCatNameIndex}
					active={this.state.activeField === 0}
				/>
				<MultiDirectionCard
					items={catItems}
					uppercase={false}
					increaseIndex={this.props.increaseCatItemIndex}
					decreaseIndex={this.props.decreaseCatItemIndex}
					index={this.props.currentCatItemIndex}
					active={this.state.activeField === 1}
				/>
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

	return { cats, catsNames, solved, currentCatNameIndex };
};

const mapDispatchToProps = dispatch => ({
	setDone              : (id, data) => dispatch(setDoneActionCreator(id, data)),
	reset                : (id, data) => dispatch(resetActionCreator(id, data)),
	increaseCatNameIndex : () => dispatch(increaseCatNameIndexAction()),
	decreaseCatNameIndex : () => dispatch(decreaseCatNameIndexAction())
});

export default compose(firestoreConnect([ { collection: 'cats' } ]), connect(mapStateToProps, mapDispatchToProps))(
	GoAhead
);

// const mapStateToProps = state => {
// 	// console.log('state', state)
// 	// console.log("state.firestore", state.firestore.ordered);
// 	return {
// 		cats                : state.firestore.ordered.cats,
// 		showList            : state.showList.showList,
// 	};
// };

/* <div className={taskContainer}>
					<button disabled={this.state.catIndex === 0} onClick={this.decreaseCatIndex}>
						{'<-'}
					</button>
					<div className={tasks.task} onClick={this.handleClick}>
						{currentCat}
					</div>
					<button disabled={cats.length - 1 === this.state.catIndex} onClick={this.increaseCatIndex}>
						{'->'}
					</button>
				</div>
				<div className={taskContainer + ' ' + setSolved}>
					<button disabled={this.state.index === 0} onClick={this.decreaseIndex}>
						{'<-'}
					</button>
					<div className={tasks.task} onClick={this.handleClick}>
						{currentItem}
					</div>
					<button
						disabled={cats.length && cats[this.state.catIndex]['data'].length - 1 === this.state.index}
						onClick={this.increaseIndex}
					>
						{'->'}
					</button>
				</div> */
