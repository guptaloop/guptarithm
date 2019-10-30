import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Holdings from './holdings';
import { fetchHoldings } from "../../../../actions/holding_actions";
import { fetchPrice } from '../../../../actions/price_api_actions';


const mapStateToProps = (state) => ({
	user: state.session.user,
	holdings: state.entities.holdings,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchHoldings: (userId) => dispatch(fetchHoldings(userId)),
	fetchPrice: (symbol) => dispatch(fetchPrice(symbol)),
	// createAccount: (account) => dispatch(createAccount(account)),
	// // deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
	// closeModal: () => dispatch(closeModal()),
	// openAccountModal: () => dispatch(openModal("addAccount")),
	// openHoldingModal: accountId =>
	// 	dispatch(openHoldingModal("addHolding", accountId)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Holdings));