import { create } from 'zustand';
import axios from 'axios';
import { apiAllParticipant, apiParticipant } from "../api/api";
import useGetToken from '../hooks/useGetToken'
const csrfToken = useGetToken();
const useParticipantStore = create((set) => ({
  participants: [],
  fetchParticipants: async () => {
    const response = await axios.get(apiAllParticipant);
    set({ participants: response.data.success });
  },
  updateParticipant: async (id, updatedData) => {
    const response = await axios.put(
      `${apiParticipant}/${id}`,
      updatedData,
      { headers: { 'X-CSRFToken': csrfToken } }
    );
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.id === id ? response.data.success : participant
      ),
    }));
  },
  deleteParticipant: async (id) => {
    await axios.delete(
      `${apiParticipant}/${id}`,
      { headers: { 'X-CSRFToken': csrfToken } }
    );
    set((state) => ({
      participants: state.participants.filter((participant) => participant.id !== id),
    }));
  },
}));

export default useParticipantStore;
