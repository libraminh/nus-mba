import { combineReducers } from 'redux';
// import flashcardReducer from "@/store/slices/FlashcardSlice";
import GlobalSlice from '@/store/slices/GlobalSlice';

export default combineReducers({
  globalSlice: GlobalSlice,
});
