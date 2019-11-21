import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './app';

const msp = state => ({
	user: state.session.isAuthenticated
});

export default withRouter(connect(msp, null)(App));