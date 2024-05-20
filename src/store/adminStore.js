import { create } from 'zustand';
import axios from 'axios';
import { apiAllParticipant, apiParticipant, apiAllBooth, apiBooth } from '../api/api';

const useAdminStore = create((set) => ({
  participantData: [],
  boothData: [],
  csrfToken: '',
  
  fetchParticipants: async () => {
    try {
      const res = await axios.get(apiAllParticipant);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ participantData: formattedData });
      console.log('Participants Data:', formattedData);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  },
  
  fetchBooths: async () => {
    try {
      const res = await axios.get(apiAllBooth);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ boothData: formattedData });
      console.log('Booths Data:', formattedData);
    } catch (error) {
      console.error('Error fetching booths:', error);
    }
  },
  
  deleteParticipant: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiParticipant}/${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        participantData: state.participantData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  },
  
  deleteBooth: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a booth
      await axios.delete(`${apiBooth}/${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        boothData: state.boothData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting booth:', error);
    }
  },
  
  updateParticipant: async (id, updatedData, csrfToken) => {
    try {
      await axios.put(`${apiParticipant}/${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        participantData: state.participantData.map((participant) =>
          participant.id === id ? { ...participant, ...updatedData } : participant
        ),
      }));
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  },
  
  updateBooth: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a booth
      await axios.put(`${apiBooth}/${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        boothData: state.boothData.map((booth) =>
          booth.id === id ? { ...booth, ...updatedData } : booth
        ),
      }));
    } catch (error) {
      console.error('Error updating booth:', error);
    }
  },
  
  setCsrfToken: (token) => set({ csrfToken: token }),
}));

export default useAdminStore;
