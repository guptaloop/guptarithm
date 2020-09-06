// React - Redux
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
// Components
import Holdings from './holdings/holdings';

import { getAccountValue, getPortValue } from '../../../util/account_util';
import { 
	openHoldingModal, openModal, openDeleteAccountModal 
} from '../../../actions/modal_actions';


const Accounts = (props) => {

	const prices = useSelector(state => state.entities.prices);
	const accounts = props.accounts;

	const dispatch = useDispatch();

	const renderAccounts = (accounts.length > 0) ? (
		<ul>
			{accounts.map(account => (
				<div key={account._id}>
					<li className="account">
						<div className="account-row">
							<h1>{account.custodian} {account.type} - *{account.last4}</h1>
							<h2>${getAccountValue(account, prices).toLocaleString()}</h2>
							<button >✏️</button>
							<button onClick={() => {
								dispatch(openDeleteAccountModal('deleteAccount', account._id))
							}
							}>❌</button>
						</div>
						<div>
							{/* HEADERS for holdings table */}
							<h3>Symbol</h3><h3>Shares</h3><h3>Price</h3><h3>Value</h3>
						</div>
					</li>
					<Holdings holdings={account.holdings} prices={prices}
						// fetchPrice={this.props.fetchPrice} 
					/>
					<button 
						className="add-holding-btn"
						onClick={() => dispatch(openHoldingModal("addHolding", account._id))}
					>+ Add Holding
					</button>
				</div>
			))}
		</ul>
	) : ( 
		null 
	);

	return (
		accounts.length > 0 ? (
			<div className="accounts-comp">
				<span>
					<div className="header">
						<h1>Retirement Portfolio</h1>
						<h2>${getPortValue(accounts, prices)}</h2>
					</div>
					<button onClick={() => dispatch(openModal('addAccount'))}>
						+ Add Account
					</button>
				</span>
				<div>{renderAccounts}</div>
			</div>
		) : (
			null
		)	
	);
};

export default Accounts;