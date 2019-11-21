import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Modal from './modal';
import NavBarContainer from './navbar/navbar_container';
import Splash from './splash/splash';
import Dashboard from './dashboard/dashboard_container';

const App = () => (
	<div className="flex">
		<Modal />
		<header>
			<NavBarContainer />
		</header>
		<main>
			<Switch>
				<AuthRoute exact path="/splash" component={Splash} />
				<ProtectedRoute exact path="/dash" component={Dashboard} />
			</Switch>
		</main>
	</div>
);


export default App;