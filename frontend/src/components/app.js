import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import Modal from './modal/modal';
import NavBarContainer from './nav/navbar_container';
import Splash from './splash/splash';
import Accounts from './accounts/accounts_container';
import Footer from './footer/footer';

const App = () => (
	<div className="flex">
		<Modal />
		<header>
			<NavBarContainer />
		</header>
		<main>
			<Switch>
				<AuthRoute exact path="/" component={Splash} />
				<ProtectedRoute exact path="/accounts" component={Accounts} />
			</Switch>
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
);

export default App;