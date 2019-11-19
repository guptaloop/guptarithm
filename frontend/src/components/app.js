import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import Modal from './modal/modal';
import NavBarContainer from './nav/navbar_container';
import Splash from './splash/splash';
import Dashboard from './dashboard/dashboard_container';
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
				{/* update the route path below */}
				<ProtectedRoute exact path="/accounts" component={Dashboard} />
			</Switch>
		</main>
		{/* <footer>
			<Footer />
		</footer> */}
	</div>
);

export default App;