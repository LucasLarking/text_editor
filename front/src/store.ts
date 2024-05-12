import { create } from "zustand";

interface ActiveLineStore {
    index: number;
    setIndex: (newIndex: number) => void;
    increment: () => void;
    decrement: () => void;
}

export const useActiveLineStore = create<ActiveLineStore>((set) => ({
    index: 0,
    setIndex: (newIndex) => set({ index: newIndex }),
    increment: () => set((state) => ({ index: state.index + 1 })),
    decrement: () => set((state) => ({ index: state.index - 1 })),
}))

export const listen_for_up_arrow = () => {
    document.body.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowUp' && useActiveLineStore.getState().index !== 0) {
            useActiveLineStore.getState().decrement();
        }
        if (event.key == 'ArrowDown' && useActiveLineStore.getState().index !== 5000) {
            useActiveLineStore.getState().increment();
        }
    })
}