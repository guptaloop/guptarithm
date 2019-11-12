import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchAccounts } from '../../actions/account_actions';
import { fetchPrice } from '../../actions/price_api_actions';
import { fetchAsset } from '../../actions/asset_actions';


const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	assets: state.entities.assets,
	prices: state.entities.prices,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: userId => dispatch(fetchAccounts(userId)),
	fetchPrice: symbol => dispatch(fetchPrice(symbol)),
	fetchAsset: symbol => dispatch(fetchAsset(symbol)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Dashboard));