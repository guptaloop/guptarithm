import React from 'react';
import Accounts from './accounts/accounts_container';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//  
		};
	}
	


	render() {

		return (
			<div>
				<Accounts />
			</div>
		)
	}
}
