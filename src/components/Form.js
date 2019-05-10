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
			riddle: '',
			answer: ''
		};
	}

	handleChangeRiddle = (e) => {
		this.setState({ riddle: e.target.value });
	};

	handleChangeAnswer = (e) => {
		this.setState({ answer: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const newItem = {
			riddle: this.state.riddle,
			answer: this.state.answer,
			solved: false
		};

		this.props.addItem(newItem);
		this.setState({
			riddle: '',
			answer: '#BDBDBD'
		});
	};

	render() {
		const group = classNames('flex-container', 'flex-center', 'margin-top20', 'flex-direction-column640');

		return (
			<form action="/myform" method="post" onSubmit={this.handleSubmit}>
				<div className={group}>
					<p>
						<span className="bracket-left">[</span>
						<input
							tabIndex="2"
							className="simple-input"
							type="text"
							name="test"
							placeholder="-"
							value={this.state.riddle}
							onChange={this.handleChangeRiddle}
						/>
						<span className="bracket-right">]</span>
					</p>

					<p>
						<button tabIndex="3" className={`${buttons.btn} btn-add border-radius5`} type="submit">
							+
						</button>
					</p>

					<p>
						<span className="bracket-left">[</span>
						<input
							tabIndex="4"
							className="simple-input"
							type="text"
							name="test"
							placeholder="-"
							value={this.state.answer}
							onChange={this.handleChangeAnswer}
						/>
						<span className="bracket-right">]</span>
					</p>

					{/* <p>
            <br />
            type:
            <select name="product" defaultValue={2}>
              <option value="1">noun</option>
              <option value="2">adjective</option>
              <option value="3">verb</option>
            </select>
          </p> */}
				</div>

				{/* <p>
          Textarea: <br />
          <Textarea id={"1"} name={"name1"} />
        </p> */}

				{/* <p>
          Checkboxes: <br />
          <Checkbox id={"1"} name={"name1"} label={"Cat1"} />
          <Checkbox id={"2"} name={"name1"} label={"Cat1"} />
          <Checkbox id={"3"} name={"name1"} label={"Cat1"} />
        </p>

        <p>
          Radios: <br />
          <Radio id={"1"} name={"name1"} label={"Loc1"} />
          <Radio id={"2"} name={"name2"} label={"Loc2"} />
          <Radio id={"3"} name={"name3"} label={"Loc3"} />
        </p> */}
			</form>
		);
	}
}

//textarea component
export class Textarea extends React.Component {
	static defaultProps = {
		value: ''
	};

	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		value: PropTypes.string
	};

	state = {
		value: this.props.value
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
		selected: false
	};

	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		selected: PropTypes.bool
	};

	state = {
		selected: this.props.selected
	};

	render() {
		return (
			<span>
				<input
					type="radio"
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
		checked: false
	};

	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		checked: PropTypes.bool
	};

	state = {
		checked: this.props.checked
	};

	render() {
		return (
			<span>
				<input
					type="checkbox"
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
