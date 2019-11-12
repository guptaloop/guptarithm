import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Holdings from './holdings';

const mapStateToProps = (state) => ({
	// user: state.session.user,
	prices: state.entities.prices,
});

export default withRouter(connect(
	mapStateToProps, null)(Holdings));