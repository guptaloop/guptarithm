import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Algo from './algo';

const mapStateToProps = state => ({
	accounts: state.entities.accounts,
	prices: state.entities.prices
});

const mapDispatchToProps = dispatch => ({
	// modal dispatches
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Algo));