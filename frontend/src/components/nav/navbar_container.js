import { connect } from 'react-redux';
import { logout, login } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
	user: state.session.user,
	loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	demoLogin: (demoUser) => dispatch(login(demoUser)),
	openModal: (modal) => dispatch(openModal(modal))
});


export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NavBar));