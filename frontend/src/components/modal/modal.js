import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SessionFormContainer from '../session/session_form_container';
import AddAccountFormContainer 
	from '../dashboard/accounts/add_account_form_container';
import AddHoldingFormContainer 
	from '../dashboard/accounts/holdings/add_holding_form_container';
import AlgoContainer from '../dashboard/algo/algo_container';
import { withRouter } from 'react-router-dom';

function Modal({ modal, closeModal }) {
	if (!modal) {
		return null;
	}
	let component;

	switch (modal) {
		case 'login':
			component = <SessionFormContainer 
				closeModal={closeModal} formType="login" />;
			break;
		case 'signup':
			component = <SessionFormContainer
				closeModal={closeModal} formType="signup" />;
			break;
		case 'addAccount':
			component = <AddAccountFormContainer
				closeModal={closeModal} formType="addAccount" />;
			break;
		case 'addHolding':
			component = <AddHoldingFormContainer
				closeModal={closeModal} formType="addHolding" />;
			break;
		case 'runAlgo':
			component = <AlgoContainer
				closeModal={closeModal} formType="runAlgo" />;
			break;
		default:
			return null;
	}
	return (
		<div className="modal-background" onClick={closeModal}>
			<div className="modal-child" onClick={e => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		modal: state.modal
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(closeModal())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));