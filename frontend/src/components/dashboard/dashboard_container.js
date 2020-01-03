import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchAccounts } from '../../actions/account_actions';
import { fetchPricesFromDB } from '../../actions/price_api_actions';
import { openModal, closeModal } from '../../actions/modal_actions';


const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	prices: state.entities.prices,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: userId => dispatch(fetchAccounts(userId)),
	fetchPrice: symbol => dispatch(fetchPricesFromDB(symbol)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: () => dispatch(openModal("addAccount")),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Dashboard));