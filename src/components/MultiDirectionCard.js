import React, { Component } from 'react';
import tasks from '../css-modules/tasks.module.css';
// css
import classNames from 'classnames';

export class MultiDirectionCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lc          : false,
			rc          : false,
			showItem    : true,
			offset      : 50,
			clientX     : undefined,
			rightToLeft : undefined
		};
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = e => {
		// console.log('e.key in Multi', e.key)
		switch (e.key) {
			case 'ArrowRight':
				this.props.active && this.increaseIndex();
				break;
			case 'ArrowLeft':
				this.props.active && this.decreaseIndex();
				break;
			default:
			// console.log(e.key);
		}
	};

	handleTouchStart = e => {
		// console.warn('start', e.touches[0].clientX);
		this.setState({ clientX: e.touches[0].clientX });
	};
	handleTouchMove = e => {
		if (this.state.clientX) {
			const shift = this.state.clientX - e.touches[0].clientX;

			if (this.setState.rightToLeft === undefined) {
				this.setState({ rightToLeft: shift > 0 });
			}

			const diff = this.state.rightToLeft ? this.state.offset - shift : this.state.offset + shift;

			if (diff < 0) {
				this.state.rightToLeft ? this.increaseIndex() : this.decreaseIndex();
				this.handleTouchEnd();
			}
		}
	};
	handleTouchEnd = e => {
		// console.warn('end');
		this.setState({ clientX: undefined, rightToLeft: undefined });
	};

	increaseIndex = () => {
		if (this.props.index < this.props.items.length - 1) {
			this.setState({ rc: true, showItem: false }, this.props.increaseIndex);
			this.setState({ showItem: true });
			setTimeout(() => {
				this.setState({ rc: false });
			}, 1000);
		}
	};

	decreaseIndex = () => {
		if (this.props.index > 0) {
			this.setState({ lc: true }, this.props.decreaseIndex);
			setTimeout(() => {
				this.setState({ lc: false });
			}, 1000);
		}
	};

	render() {
		// console.log('this.props in multy', this.props);
		const items = this.props.items || [];
		const cardBox = classNames(`${tasks.card}`, { rightClicked: this.state.rc }, { leftClicked: this.state.lc });
		const currentItem = this.state.showItem && items.length ? items[this.props.index] : '';
		const taskContainer = classNames(
			'flex-container',
			'flex-center',
			'grey',
			{ 'margin-top20': !this.props.noMargin },
			'no-outline'
		);
		const itemField = classNames(
			`${tasks.task}`,
			{ uppercase: this.props.uppercase },
			{ 'active-field': this.props.active }
		);
		const firstItem = this.props.index <= 0;
		const lastItem = items.length <= this.props.index + 1;

		// css
		const currentItemSt = classNames({ highlighted: this.props.solved }, 'flex-container flex-space-between');
		return (
			<div className={taskContainer} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
				<div className={cardBox}>
					<div
						className={itemField}
						onTouchStart={this.handleTouchStart}
						onTouchMove={this.handleTouchMove}
						onTouchEnd={this.handleTouchEnd}
					>
						<div className={currentItemSt}>
							<p
								className='no-margins left uppercase'
								disabled={firstItem}
								onClick={this.decreaseIndex}
								style={{ minWidth: '18px' }}
							>
								{firstItem ? 'x' : '<-'}
							</p>
							<p className='no-margins'>{currentItem}</p>
							<p
								className='no-margins right uppercase'
								disabled={lastItem}
								onClick={this.increaseIndex}
								style={{ minWidth: '18px' }}
							>
								{lastItem ? 'x' : '->'}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// https://codepen.io/desandro/pen/LmWoWe
