import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteAccountForm from './delete_account_form';
import { deleteAccount } from '../../../actions/account_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accountId: state.modalAccount
});

const mapDispatchToProps = dispatch => ({
	deleteAccount: (accountId, userId) => dispatch(
		deleteAccount(accountId, userId)
	),
	closeModal: () => dispatch(closeModal()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DeleteAccountForm));