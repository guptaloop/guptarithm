// React - Redux
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// Components
import Accounts from './accounts/accounts';
import AllocChart from './asset_allocation/chart';
import Footer from '../footer/footer';
// Actions
import { fetchAccounts } from '../../actions/account_actions';
import { fetchPricesFromDB, fetchPriceFromIEX } from '../../actions/price_api_actions';
import { openModal } from '../../actions/modal_actions';

const Dashboard = () => {

	// MSTP
	const userId = useSelector(state => state.session.user.id);
	const accounts = useSelector(state => state.entities.accounts);
	const prices = useSelector(state => state.entities.prices);

	// create state
	const [symbols] = useState(['IVV', 'VEA']);

	// function to add unique investments by symbol to symbols
	if (accounts.length > 0) {
		accounts.forEach(account => {
			(account.holdings).forEach(holding => {
				if (!symbols.includes(holding.symbol)) {
					symbols.push(holding.symbol);
				}
			});
		});
	}

	// MDTP
	const dispatch = useDispatch();

	// Hook - replaces old lifecycle methods
	useEffect( () => {
		dispatch(fetchAccounts(userId));
		
		// console.log(symbols); // checks out

		dispatch(fetchPriceFromIEX('IVV'));
		// symbols.forEach(symbol => {
			// dispatch(fetchPricesFromDB(symbol));
		// });
	}, [accounts.length, symbols.length]);

	const displayDash = accounts.length === 0 ? (
		<div className="greeting">
			<button 
				onClick={() => dispatch(openModal('addAccount'))}
			>+ Add Account</button>
		</div>
	) : (
		<div className="dashboard">
			<Accounts accounts={accounts} />
			<div className="dash-right">
				<AllocChart prices={prices} accounts={accounts}/>
				<Footer />
			</div>
		</div>
	);

	return (
		<div>{displayDash}</div>
	)
};

export default Dashboard;