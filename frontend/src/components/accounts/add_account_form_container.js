import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddAccountForm from './add_account_form';
import { fetchAccounts, createAccount } from '../../actions/account_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, { formType }) => ({
	user: state.session.user,
	errors: state.errors.session,
	// signedIn: state.session.isAuthenticated,
	// formType,
});

const mapDispatchToProps = dispatch => ({
	createAccount: account => dispatch(createAccount(account)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: () => dispatch(openModal("addAccount")),
	// clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddAccountForm));