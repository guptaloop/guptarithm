import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddHoldingForm from './add_holding_form';
import { closeModal } from '../../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	errors: state.errors.session,
});

const mapDispatchToProps = dispatch => ({
	// 2 actions here: createAsset & createHolding
	closeModal: () => dispatch(closeModal()),
	// clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddHoldingForm));