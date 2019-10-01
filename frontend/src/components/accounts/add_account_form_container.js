import { connect } from 'react-redux';
import { fetchAccounts, createAccount } from '../../actions/account_actions';
// import { clearErrors } from '../../actions/session_actions';
import AddAccountForm from './add_account_form';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { formType }) => ({
	signedIn: state.session.isAuthenticated,
	errors: state.errors.session,
	formType,
});

const mapDispatchToProps = dispatch => ({
	createAccount: (account) => dispatch(createAccount(account)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: () => dispatch(openModal("addAccount")),
	// clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddAccountForm));