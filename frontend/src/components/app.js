import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Modal from './modal/modal';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
	<div>
		<Modal />
		<header>
			<NavBarContainer />
		</header>
		<main>
		<Switch>
			<AuthRoute exact path="/" component={MainPage} />
			<AuthRoute exact path="/login" component={LoginFormContainer} />
			<AuthRoute exact path="/signup" component={SignupFormContainer} />
		</Switch>
		</main>
		<footer>
			
		</footer>
	</div>
);

export default App;