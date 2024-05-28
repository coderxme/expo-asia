import { create } from 'zustand';
import axios from 'axios';
import { apiMilitaryBranch, apiParticipant, apiBooth,  apiCompanyOrg, apiCompanyOrgType, apiEvent, apiBoothAttendee, apiEventAttendee, apiMyAccount, apiInvite, apiForum, apiUsers} from '../api/api';

const useAdminStore = create((set) => ({
  participantData: [],
  boothData: [],
  boothAttendeeData: [],
  eventData: [],
  eventAttendeeData: [],
  companyData: [],
  companyTypeData: [],
  myAccountData: [],
  inviteData: [],
  forumData:[],
  usersData:[],
  militaryBranchData:[],
  csrfToken: '',


  fetchMilitaryBranch: async () => {
    try {
      const res = await axios.get(apiMilitaryBranch);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ militaryBranchData: formattedData });
      console.log('Military Branch Data:', formattedData);
    } catch (error) {
      console.error('Error fetching military branch:', error);
    }
  },

  fetchUsers: async () => {
    try {
      const res = await axios.get(apiUsers);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ usersData: formattedData });
      console.log('users Data:', formattedData);
    } catch (error) {
      console.error('Error fetching Forum:', error);
    }
  },

  fetchForum: async () => {
    try {
      const res = await axios.get(apiForum);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ forumData: formattedData });
      console.log('Forum Data:', formattedData);
    } catch (error) {
      console.error('Error fetching Forum:', error);
    }
  },

  fetchInvite: async () => {
    try {
      const res = await axios.get(apiInvite);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ inviteData: formattedData });
      console.log('Invite Data:', formattedData);
    } catch (error) {
      console.error('Error fetching Invite:', error);
    }
  },
  
  fetchParticipants: async () => {
    try {
      const res = await axios.get(apiParticipant);
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
      const res = await axios.get(apiBooth);
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

  fetchBoothAttendee: async () => {
    try {
      const res = await axios.get(apiBoothAttendee);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ boothAttendeeData: formattedData });
      console.log('Booth Attendee Data:', formattedData);
    } catch (error) {
      console.error('Error fetching booths:', error);
    }
  },


  fetchCompany: async () => {
    try {
      const res = await axios.get(apiCompanyOrg);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ companyData: formattedData });
      console.log('company Data:', formattedData);
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  },

  fetchCompanyType: async () => {
    try {
      const res = await axios.get(apiCompanyOrgType);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ companyTypeData: formattedData });
      console.log('company  Type:', formattedData);
    } catch (error) {
      console.error('Error fetching company type:', error);
    }
  },

  fetchEvent: async () => {
    try {
      const res = await axios.get(apiEvent);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ eventData: formattedData });
      console.log('Event:', formattedData);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  },

  fetchEventAttendee: async () => {
    try {
      const res = await axios.get(apiEventAttendee);
      const formattedData = res.data.success.map((item, index) => ({
        key: index,
        ...item,
      }));
      set({ eventAttendeeData: formattedData });
      console.log('Event Attendee :', formattedData);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  },

  fetchMyAccount: async () => {
    try {
      const res = await axios.get(apiMyAccount);
      const formattedData = {
        key: 0, // Since there is only one item, we can set a static key
        ...res.data.success,
      };
      set({ myAccountData: formattedData });
      console.log('My Account:', formattedData);
    } catch (error) {
      console.error('Error fetching My Account:', error);
    }
  },



  createMilitaryBranch: async (newMilitaryBranch, csrfToken) => {
    try {
      const res = await axios.post(apiMilitaryBranch, newMilitaryBranch, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdMilitaryBranch = { key: res.data.id, ...res.data };
      set((state) => ({
        militaryBranchData: [...state.militaryBranchData, createdMilitaryBranch],
      }));
      console.log('Created Military Branch:', createdMilitaryBranch);
    } catch (error) {
      console.error('Error creating military branch:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  },


  createUsers: async (newForum, csrfToken) => {
    try {
      const res = await axios.post(apiUsers, newForum, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdUser = { key: res.data.id, ...res.data };
      set((state) => ({
        usersData: [...state.usersData, createdUser],
      }));
      console.log('Created Users:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  },

  

  createForum: async (newForum, csrfToken) => {
    try {
      const res = await axios.post(apiForum, newForum, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdForum = { key: res.data.id, ...res.data };
      set((state) => ({
        forumData: [...state.forumData, createdForum],
      }));
      console.log('Created Forum:', createdForum);
    } catch (error) {
      console.error('Error creating Forum:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  },

  createCompany: async (newCompany, csrfToken) => {
    try {
      const res = await axios.post(apiCompanyOrg, newCompany, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdCompany = { key: res.data.id, ...res.data };
      set((state) => ({
        companyData: [...state.companyData, createdCompany],
      }));
      console.log('Created Company:', createdCompany);
    } catch (error) {
      console.error('Error creating company:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  },
  
  
  createCompanyType: async (newCompanyType, csrfToken) => {
    try {
      const res = await axios.post(apiCompanyOrgType, newCompanyType, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdCompanyType = { key: res.data.id, ...res.data };
      set((state) => ({
        companyTypeData: [...state.companyTypeData, createdCompanyType],
      }));
      console.log('Created Company Type:', createdCompanyType);
    } catch (error) {
      console.error('Error creating company type:', error);
    }
  },

  createEvent: async (newEvent, csrfToken) => {
    try {
      const res = await axios.post(apiEvent, newEvent, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdEvent = { key: res.data.id, ...res.data };
      set((state) => ({
        eventData: [...state.eventData, createdEvent],
      }));
      console.log('Created Event:', createdEvent);
    } catch (error) {
      console.error('Error creating Event:', error);
    }
  },

  createBooth: async (newBooth, csrfToken) => {
    try {
      const res = await axios.post(apiBooth, newBooth, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdBooth = { key: res.data.id, ...res.data };
      set((state) => ({
        boothData: [...state.boothData, createdBooth],
      }));
      console.log('Created Booth:', createdBooth);
    } catch (error) {
      console.error('Error creating Booth:', error);
    }
  },

  createBoothAttendee: async (newBoothAttendee, csrfToken) => {
    try {
      const res = await axios.post(apiBoothAttendee, newBoothAttendee, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdBoothAttendee = { key: res.data.id, ...res.data };
      set((state) => ({
        boothAttendeeData: [...state.boothAttendeeData, createdBoothAttendee],
      }));
      console.log('Created Booth Attendee:', createdBoothAttendee);
    } catch (error) {
      console.error('Error creating Booth Attendee:', error);
    }
  },


  createParticipant: async (newParticipant, csrfToken) => {
    try {
      const res = await axios.post(apiParticipant, newParticipant, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      const createdParticipant = { key: res.data.id, ...res.data };
      set((state) => ({
        participantData: [...state.participantData, createdParticipant],
      }));
      console.log('Created Participant:', createdParticipant);
    } catch (error) {
      console.error('Error creating Participant:', error);
    }
  },


    
  deleteMilitaryBranch: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiMilitaryBranch}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        militaryBranchData: state.militaryBranchData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting military branch:', error);
    }
  },

    
  deleteUsers: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiUsers}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        usersData: state.usersData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },


  deleteForum: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiForum}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        forumData: state.forumData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting forum:', error);
    }
  },
  
  deleteInvite: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiInvite}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        inviteData: state.inviteData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting invite:', error);
    }
  },

  deleteParticipant: async (id, csrfToken) => {
    try {
      await axios.delete(`${apiParticipant}${id}`, {
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
      await axios.delete(`${apiBooth}${id}`, {
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

  deleteBoothAttendee: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a booth
      await axios.delete(`${apiBoothAttendee}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        boothAttendeeData: state.boothAttendeeData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting booth attendee:', error);
    }
  },

  deleteCompany: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a company
      await axios.delete(`${apiCompanyOrg}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        companyData: state.companyData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  },

  deleteCompanyType: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a company
      await axios.delete(`${apiCompanyOrgType}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        companyTypeData: state.companyTypeData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting company type:', error);
    }
  },

  
  deleteEvent: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a company
      await axios.delete(`${apiEvent}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        eventData: state.eventData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  },

  deleteEventAttendee: async (id, csrfToken) => {
    try {
      // Assuming there is an API endpoint for deleting a company
      await axios.delete(`${apiEventAttendee}${id}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        eventAttendeeData: state.eventAttendeeData.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting event attendee:', error);
    }
  },


  
  updateMilitaryBranch: async (id, updatedData, csrfToken) => {
    try {
      await axios.put(`${apiMilitaryBranch}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        militaryBranchData: state.militaryBranchData.map((militaryBranch) =>
          militaryBranch.id === id ? { ...militaryBranch, ...updatedData } : militaryBranch
        ),
      }));
    } catch (error) {
      console.error('Error updating military Branch:', error);
    }
  },


  updateUsers: async (id, updatedData, csrfToken) => {
    try {
      await axios.put(`${apiUsers}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        usersData: state.usersData.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        ),
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },

  updateForum: async (id, updatedData, csrfToken) => {
    try {
      await axios.put(`${apiForum}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        forumData: state.forumData.map((forum) =>
          forum.id === id ? { ...forum, ...updatedData } : forum
        ),
      }));
    } catch (error) {
      console.error('Error updating forum:', error);
    }
  },
  
  updateParticipant: async (id, updatedData, csrfToken) => {
    try {
      await axios.put(`${apiParticipant}${id}`, updatedData, {
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
      await axios.put(`${apiBooth}${id}`, updatedData, {
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


  updateBoothAttendee: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a booth
      await axios.put(`${apiBoothAttendee}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        boothAttendeeData: state.boothAttendeeData.map((attendee) =>
          attendee.id === id ? { ...attendee, ...updatedData } : attendee
        ),
      }));
    } catch (error) {
      console.error('Error updating attendee:', error);
    }
  },

  updateCompany: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a company
      await axios.put(`${apiCompanyOrg}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        companyData: state.companyData.map((company) =>
          company.id === id ? { ...company, ...updatedData } : company
        ),
      }));
    } catch (error) {
      console.error('Error updating company:', error);
    }
  },
  
  updateCompanyType: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a company
      await axios.put(`${apiCompanyOrgType}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        companyTypeData: state.companyTypeData.map((company) =>
          company.id === id ? { ...company, ...updatedData } : company
        ),
      }));
    } catch (error) {
      console.error('Error updating company type:', error);
    }
  },

  updateEvent: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a company
      await axios.put(`${apiEvent}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        eventData: state.eventData.map((event) =>
          event.id === id ? { ...event, ...updatedData } : event
        ),
      }));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  },

  updateEventAttendee: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a company
      await axios.put(`${apiEventAttendee}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        eventAttendeeData: state.eventAttendeeData.map((event) =>
          event.id === id ? { ...event, ...updatedData } : event
        ),
      }));
    } catch (error) {
      console.error('Error updating event attendee:', error);
    }
  },


  updateParticipant: async (id, updatedData, csrfToken) => {
    try {
      // Assuming there is an API endpoint for updating a company
      await axios.put(`${apiParticipant}${id}`, updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      set((state) => ({
        participantData: state.participantData.map((event) =>
          event.id === id ? { ...event, ...updatedData } : event
        ),
      }));
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  },


  setCsrfToken: (token) => set({ csrfToken: token }),
}));






export default useAdminStore;
