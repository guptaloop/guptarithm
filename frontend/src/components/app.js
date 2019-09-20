import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import Modal from './modal/modal';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import Accounts from './accounts/accounts_container';

const App = () => (
	<div>
		<Modal />
		<header>
			<NavBarContainer />
		</header>
		<main>
			<Switch>
				<AuthRoute exact path="/" component={MainPage} />
				<Route exact path="/accounts" component={Accounts} />
			</Switch>
		</main>
		<footer>
			{/* FOOTER */}
		</footer>
	</div>
);

export default App;