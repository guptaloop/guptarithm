import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Accounts from './accounts';
import { createAccount } from '../../../actions/account_actions';
import { 
	openModal, closeModal, openHoldingModal 
} from '../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	// holdings: state.entities.holdings,
	// prices: state.entities.prices,
});

const mapDispatchToProps = dispatch => ({
	createAccount: (account) => dispatch(createAccount(account)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: () => dispatch(openModal("addAccount")),
	openHoldingModal: accountId => 
		dispatch(openHoldingModal("addHolding", accountId)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));