import { create } from 'zustand';

interface ModalState {
    activeModal: MODALS;
}

export const useModalStore = create<ModalState>()(() => ({
    activeModal: 'NONE',
}));

export function setModalMode(mode: MODALS) {
    useModalStore.setState({ activeModal: mode });
}
