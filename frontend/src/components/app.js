import React from 'react';
import { Route } from 'react-router-dom';
import Modal from './modal';
import NavBarContainer from './navbar/navbar_container';
import Splash from './splash/splash';
// import Dashboard from './dashboard/dashboard_container';
import Dashboard from './dashboard/dashboard';

const App = props => {
	
	const dashOrSplash = props.user ? Dashboard : Splash;

	return (
		<div className="flex">
			<Modal />
			<header>
				<NavBarContainer />
			</header>
			<main>
				<Route exact path="/" component={dashOrSplash} />
			</main>
		</div>
	);
}

export default App;