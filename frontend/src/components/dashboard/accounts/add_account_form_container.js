import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddAccountForm from './add_account_form';
import { createAccount } from '../../../actions/account_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	errors: state.errors.session,
});

const mapDispatchToProps = dispatch => ({
	createAccount: account => dispatch(createAccount(account)),
	closeModal: () => dispatch(closeModal()),
	// clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddAccountForm));