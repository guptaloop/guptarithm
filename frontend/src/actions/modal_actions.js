export const OPEN_MODAL = 'OPEN_MODAL';
export const OPEN_HOLDING_MODAL = 'OPEN_HOLDING_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = modal => {
	return {
		type: OPEN_MODAL,
		modal
	};
};

export const openHoldingModal = (modal, accountId) => {
	return {
		type: OPEN_HOLDING_MODAL,
		modal,
		accountId
	};
};

export const closeModal = () => {
	return {
		type: CLOSE_MODAL
	};
};