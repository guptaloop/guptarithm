import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllocChart from './chart';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	assets: state.entities.assets,
	holdings: state.entities.holdings,
	prices: state.entities.prices,
	// // errors: state.errors.session
});


export default withRouter(connect(
	mapStateToProps, null)(AllocChart));