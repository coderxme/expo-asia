import { create } from 'zustand';
const useCsrfTokenStore = create((set) => ({
    csrfToken: null,
    setCsrfToken: (csrfToken) => set({ csrfToken }),
}));
export default useCsrfTokenStore;