import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Accounts from './accounts';
import { createAccount } from '../../../actions/account_actions';
import { 
	openModal, closeModal, openHoldingModal 
} from '../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	prices: state.entities.prices,
});

const mapDispatchToProps = dispatch => ({
	createAccount: (account) => dispatch(createAccount(account)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: (modal) => dispatch(openModal(modal)),
	openHoldingModal: accountId => 
		dispatch(openHoldingModal("addHolding", accountId)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));