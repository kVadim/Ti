import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ModalContainer from './modals/ModalContainer';
import TopHeader from './containers/Top-header';
import ListAll from './containers/ListAll';
import GoAhead from './containers/Go-ahead';
import './css-modules/common.css';
import './css-modules/media.css';
import './css-modules/colors.css';
// import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
// import { routes } from "./constants/routes";

class App extends Component {
	// constructor() {
	//   super();
	//   this.routes = routes;
	// }
	// remove
	// async componentDidMount() {
	//   const url = "https://api.randomuser.me/";
	//   const response = await fetch(url);
	//   const data = await response.json();
	//   console.log("data", data);
	// }

	render() {
		// console.log("routes", this.routes);

		const someProp = 42;

		// const responseFacebook = response => {
		//   console.log(response);
		// };

		// const responseGoogle = response => {
		//   console.log(response);
		// };

		// console.log("routes.listAll", routes.listAll);

		return (
			<BrowserRouter>
				<div className='App'>
					<TopHeader topProps={someProp} />
					<Switch>
						<Route exact path='/' component={ModalContainer} />
						<Route path='/list-all' component={ListAll} />
						<Route path='/go-ahead' component={GoAhead} />
						{/* <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProjet} />
            <Route path="/create-rec" component={CreateRec} /> */}
					</Switch>
					{/* <ModalContainer /> */}

					{/* <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1> */}

					{/* <FacebookLogin
            appId="" //APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={responseFacebook}
          />
          <br />
          <br />
          <GoogleLogin
            clientId="718096173007-8f9cg9akjoart265epc4n92mjg1qtglr.apps.googleusercontent.com" //CLIENTID secret MjJt8A7e1Crp2qP_TArdJsjO
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          /> */}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
