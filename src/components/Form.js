import React, { Component } from 'react';
import PropTypes from 'prop-types';

// css
import classNames from 'classnames';
import buttons from '../css-modules/buttons.module.css';

export class Form extends Component {
	constructor(props) {
		super(props);

		console.log('this.props in FORM', this.props);

		this.state = {
			riddle : '',
			answer : ''
		};
	}

	componentDidUpdate() {
		if (this.props.activeRiddle) {
			this.nameInputRiddle.focus();
		}
		if (this.props.activeAdd) {
			this.nameInputAdd.focus();
		}
		if (this.props.activeAnswer) {
			this.nameInputAnswer.focus();
		}
	}

	handleChangeRiddle = e => {
		this.setState({ riddle: e.target.value });
	};

	handleChangeAnswer = e => {
		this.setState({ answer: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const newItem = {
			riddle : this.state.riddle,
			answer : this.state.answer,
			solved : false
		};

		this.props.addItem(newItem);
		this.setState({
			riddle : '',
			answer : ''
		});
	};

	render() {
		const group = classNames('flex-container', 'flex-center', 'margin-top20', 'flex-direction-column640');
		const bracketLeftRiddle = classNames({ 'active-field': this.props.activeRiddle }, 'bracket-left');
		const bracketRightRiddle = classNames({ 'active-field': this.props.activeRiddle }, 'bracket-right');
		const bracketLeftAnswer = classNames({ 'active-field': this.props.activeAnswer }, 'bracket-left');
		const bracketRightAnswer = classNames({ 'active-field': this.props.activeAnswer }, 'bracket-right');
		const answerSt = classNames({ 'active-field': this.props.activeAnswer });
		const addSt = classNames({ 'active-field': this.props.activeAdd }, 'btn-add border-radius5', `${buttons.btn}`);

		return (
			<form action='/myform' method='post' onSubmit={this.handleSubmit}>
				<div className={group}>
					<p>
						<span className={bracketLeftRiddle}>[-</span>
						<input
							className='simple-input'
							type='text'
							name='test'
							placeholder='.'
							value={this.state.riddle}
							onChange={this.handleChangeRiddle}
							autoComplete='off'
							ref={input => {
								this.nameInputRiddle = input;
							}}
						/>
						<span className={bracketRightRiddle}>-]</span>
					</p>

					<p>
						<button
							className={addSt}
							type='submit'
							ref={input => {
								this.nameInputAdd = input;
							}}
						>
							+
						</button>
					</p>

					<p className={answerSt}>
						<span className={bracketLeftAnswer}>[-</span>
						<input
							className='simple-input'
							type='text'
							name='test'
							placeholder='.'
							value={this.state.answer}
							onChange={this.handleChangeAnswer}
							autoComplete='off'
							ref={input => {
								this.nameInputAnswer = input;
							}}
						/>
						<span className={bracketRightAnswer}>-]</span>
					</p>
				</div>
			</form>
		);
	}
}

//textarea component
export class Textarea extends React.Component {
	static defaultProps = {
		value : ''
	};

	static propTypes = {
		id    : PropTypes.string.isRequired,
		name  : PropTypes.string.isRequired,
		value : PropTypes.string
	};

	state = {
		value : this.props.value
	};

	render() {
		return (
			<textarea
				id={this.props.id}
				name={this.props.name}
				defaultValue={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
}

//radio component
export class Radio extends React.Component {
	static defaultProps = {
		selected : false
	};

	static propTypes = {
		id       : PropTypes.string.isRequired,
		name     : PropTypes.string.isRequired,
		label    : PropTypes.string.isRequired,
		selected : PropTypes.bool
	};

	state = {
		selected : this.props.selected
	};

	render() {
		return (
			<span>
				<input
					type='radio'
					defaultChecked={this.state.selected}
					onChange={this.handleChange}
					id={this.props.id}
					name={this.props.name}
				/>{' '}
				{this.props.label}
			</span>
		);
	}
}

//checkbox component
export class Checkbox extends React.Component {
	static defaultProps = {
		checked : false
	};

	static propTypes = {
		id      : PropTypes.string.isRequired,
		name    : PropTypes.string.isRequired,
		label   : PropTypes.string.isRequired,
		checked : PropTypes.bool
	};

	state = {
		checked : this.props.checked
	};

	render() {
		return (
			<span>
				<input
					type='checkbox'
					defaultChecked={this.state.checked}
					onChange={this.handleChange}
					id={this.props.id}
					name={this.props.name}
				/>{' '}
				{this.props.label}
			</span>
		);
	}
}
