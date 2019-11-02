// code this out, connect with component and change the export in the app.js

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchHoldings } from '../../actions/holding_actions';
// import { fetchPrice } from '../../actions/price_api_actions';


const mapStateToProps = (state) => ({
	user: state.session.user,
	holdings: state.entities.holdings,
	// prices: state.entities.prices,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchHoldings: userId => dispatch(fetchHoldings(userId)),
	// fetchPrice: symbol => dispatch(fetchPrice(symbol)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Dashboard));