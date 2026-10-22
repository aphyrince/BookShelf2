import { create } from 'zustand';

interface ModalState {
    activeModal: MODALS;
    bookDetail: BookDTO | null;
}

export const useModalStore = create<ModalState>()(() => ({
    activeModal: 'NONE',
    bookDetail: null,
}));

export function setModalMode(mode: MODALS) {
    useModalStore.setState({ activeModal: mode });
}

export function setDetailItem(item: BookDTO | null) {
    useModalStore.setState({ bookDetail: item });
}
