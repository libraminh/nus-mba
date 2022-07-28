import { createSlice } from '@reduxjs/toolkit';

let initState = {
  isVisiblePrimaryModal: false,
  isVisibleSecondModal: false,
  sideBarProps: {
    visible: false,
    type: null,
  },
  modalContent: null,
  sidebarContent: null,
  timelineView: false,
  locationState: null,
  shouldResetForm: false,
  journeyName: {},
};

const GlobalSlice = createSlice({
  name: 'globalSlice',
  initialState: initState,
  reducers: {
    toggleTimelineView(state, action) {
      state.timelineView = action.payload;
    },
    resetFormSubmit(state, action) {
      state.shouldResetForm = action.payload;
    },
    setLocationState(state, action) {
      state.locationState = {
        ...state.locationState,
        ...action.payload,
      };
    },
    setJourneyName(state, action) {
      state.journeyName = action.payload;
    },
    setSidebarContent(state, action) {
      state.sidebarContent = action.payload;
    },
    setModalContent(state, action) {
      state.modalContent = action.payload;
    },
    toggleIsVisiblePrimaryModal(state, action) {
      state.isVisiblePrimaryModal = !state.isVisiblePrimaryModal;
    },
    toggleIsVisibleSecondModal(state, action) {
      state.isVisibleSecondModal = !state.isVisibleSecondModal;
    },
    setSideBarProps(state, action) {
      state.sideBarProps = { ...action.payload };
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const {
  toggleTimelineView,
  toggleIsVisiblePrimaryModal,
  toggleIsVisibleSecondModal,
  setSideBarProps,
  setModalContent,
  setSidebarContent,
  setLocationState,
  resetFormSubmit,
  setJourneyName,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
