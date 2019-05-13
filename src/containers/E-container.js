import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { toggleShowList } from '../store/actions/toggleShowList';
import { listAllIncreaseCatNameIndex } from '../store/actions/catNames';
import { listAllDecreaseCatNameIndex } from '../store/actions/catNames';
import { Form } from '../components/Form';
import { MultiDirectionCard } from '../components/MultiDirectionCard';
import { List, AutoSizer } from 'react-virtualized';
// import { getFirestore } from "redux-firestore";

import { createItemActionCreator } from '../store/actions/createItemActionCreator';
// css
import classNames from 'classnames';
import buttons from '../css-modules/buttons.module.css';

export class Econtainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeField  : 0,
			maxActiveNum : 3
		};
	}

	componentDidMount() {
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

	addItem = newItem => {
		const cat = this.props.cats[this.props.currentCatNameIndex];
		console.log('newItem', newItem);
		const newArr = [ ...cat['data'], ...[ newItem ] ];
		console.log('newArr', newArr);
		const id = cat['id'];
		console.log('id', id);
		this.props.createItem(id, newArr);
	};

	handleKeyDown = e => {
		switch (e.key) {
			case 'ArrowDown':
				e.shiftKey && this.increaseActiveFieldNum();
				break;
			case 'ArrowUp':
				e.shiftKey && this.decreaseActiveFieldNum();
				break;
			default:
		}
	};

	navigateToModalPage() {
		this.props.history.push('/');
	}

	showList() {
		console.log('this.props', this.props);
		let list = null;
		if (this.props.cats) {
			list = this.props.cats[0]['data'].map(item => {
				console.log('key', item);
				return (
					<div className='flex-container flex-center' key={item['riddle']}>
						<p>{item['riddle']}</p>
						<p> - </p>
						<p>{item['answer']}</p>
					</div>
				);
			});
		}

		if (this.props.showList) {
			return { list };
		} else return null;
	}

	getRows = (id, data) => {
		function rowRenderer({ index, key, style }) {
			// console.log('data', data)
			if (data.length) {
				return (
					<div key={key} className='row' style={style}>
						<div className='flex-container flex-space-between flex-direction-column500'>
							<div className='cell'>{data[index]['riddle']}</div>
							<div className='cell darkgrey'>{data[index]['answer']}</div>
						</div>
					</div>
				);
			} else return null;
		}

		return (
			<div className='table grey' key={id}>
				<AutoSizer>
					{({ height, width }) => (
						<List
							width={width}
							height={160}
							rowCount={data.length}
							rowHeight={40}
							rowRenderer={rowRenderer}
							className={'margin-both-auto'}
							overscanRowCount={3}
							style={{ outline: 'none' }}
						/>
					)}
				</AutoSizer>
			</div>
		);
	};

	render() {
		const cats = this.props.cats || [];
		const catNames = cats.map(item => item.name);
		const cat = cats.length && cats[this.props.currentCatNameIndex];
		// const table = cats && this.props.showList ? cats.map(cat => this.getRows(cat['id'], cat['data'], cat['name'])) : null;
		const table = cat && this.props.showList && this.getRows(cat['id'], cat['data']);
		const toggleBtnSt = classNames(
			{ 'active-field': this.state.activeField === 4 },
			`${buttons.btn} ${buttons['action-btn']}`
		);
		return (
			<div className='container'>
				{/* <button className={buttons['action-btn']} onClick={() => this.navigateToModalPage()}>
					modal page
				</button> */}
				<button className={toggleBtnSt} onClick={() => this.props.toggleShowList()}>
					{(this.props.showList ? 'hide' : 'show') + '-list'}
				</button>
				<h2 className='no-margins'>----</h2>
				{table}
				<MultiDirectionCard
					items={catNames}
					uppercase={true}
					increaseCatNameIndex={this.props.increaseCatNameIndex}
					decreaseCatNameIndex={this.props.decreaseCatNameIndex}
					index={this.props.currentCatNameIndex}
					active={this.state.activeField === 0}
				/>
				<Form
					addItem={this.addItem}
					activeRiddle={this.state.activeField === 1}
					activeAdd={this.state.activeField === 2}
					activeAnswer={this.state.activeField === 3}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('state', state)
	// console.log("state.firestore", state.firestore.ordered);
	return {
		cats                : state.firestore.ordered.cats,
		showList            : state.showList.showList,
		currentCatNameIndex : state.filters.listAll.currentCatNameIndex
	};
};

const mapDispatchToProps = dispatch => ({
	toggleShowList       : () => dispatch(toggleShowList()),
	createItem           : (id, arr) => dispatch(createItemActionCreator(id, arr)),
	increaseCatNameIndex : () => dispatch(listAllIncreaseCatNameIndex()),
	decreaseCatNameIndex : () => dispatch(listAllDecreaseCatNameIndex())
});

export default compose(firestoreConnect([ { collection: 'cats' } ]), connect(mapStateToProps, mapDispatchToProps))(
	Econtainer
);

// componentDidMount() {
// console.log("this.props", this.props);
// const fireStore = getFirestore();
// fireStore
//   .collection("list")
//   .get()
//   .then(res => {
//     res.docs.forEach(doc => {
//       this.setState({ list: doc.data() });
//     });
//   });
// }
