import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddHoldingForm from './add_holding_form';
import { createHolding } from '../../../../actions/account_actions';
import { fetchAsset } from '../../../../actions/asset_actions';
import { fetchPrice } from '../../../../actions/price_api_actions';
import { closeModal } from '../../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	errors: state.errors.session,
	assets: state.entities.assets,
	accountId: state.modalAccount
});

const mapDispatchToProps = dispatch => ({
	createHolding: holding => dispatch(createHolding(holding)),
	fetchAsset: symbol => dispatch(fetchAsset(symbol)),
	fetchPrice: symbol => dispatch(fetchPrice(symbol)),
	closeModal: () => dispatch(closeModal()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddHoldingForm));