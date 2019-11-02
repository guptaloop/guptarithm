import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Holdings from './holdings';
import { fetchPrice } from '../../../../actions/price_api_actions';


const mapStateToProps = (state) => ({
	user: state.session.user,
	holdings: state.entities.holdings,
	prices: state.entities.prices,
});

const mapDispatchToProps = dispatch => ({
	fetchPrice: symbol => dispatch(fetchPrice(symbol)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Holdings));