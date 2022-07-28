// import {
//   setModalContent,
//   toggleIsVisiblePrimaryModal,
// } from "@/store/slices/GlobalSlice";
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setModalContent,
  toggleIsVisiblePrimaryModal,
} from '../../store/slices/GlobalSlice';
import ModulePanel from '../ModulePanel';

const ModuleCore = ({ title, items, type, layout = '' }) => {
  const dispatch = useDispatch();

  if (layout.length === 0) {
    layout = 'flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }

  const handleModalContent = (item) => {
    dispatch(toggleIsVisiblePrimaryModal());
    dispatch(setModalContent(item));
  };

  return (
    <div>
      <h3 className='text-lg font-bold mb-4 text-nus-black-200'>{title}</h3>

      <div className={`${layout} gap-5 overflow-auto`}>
        {items?.map((item, index) => (
          <ModulePanel
            onClick={() => handleModalContent(item)}
            key={index}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleCore;
