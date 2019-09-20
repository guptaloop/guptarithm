import React from 'react';

class Accounts extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('howdy');
		this.props.fetchAccounts(this.props.userId);
	}
	
	render() {
		return (
			<div>
				ACCOUNTS
			</div>
		)
	}
}

export default Accounts;