import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Algo from './algo';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	prices: state.entities.prices,
});

const mapDispatchToProps = dispatch => ({
	
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Algo));