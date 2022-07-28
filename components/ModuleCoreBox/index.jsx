import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setModalContent,
  toggleIsVisiblePrimaryModal,
} from '../../store/slices/GlobalSlice';
import ModuleBox from '../ModuleBox';

const ModuleCoreBox = ({ title, items }) => {
  const dispatch = useDispatch();

  const handleModalContent = (item) => {
    dispatch(toggleIsVisiblePrimaryModal());
    dispatch(setModalContent(item));
  };

  return (
    <div>
      <h3 className='text-lg font-bold mb-4 text-nus-black-200'>{title}</h3>

      <div className='flex md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 overflow-x-auto'>
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {item.selected && (
              <ModuleBox
                onClick={() => handleModalContent(item)}
                key={index}
                title={item.title}
                thumbnail={item.img}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ModuleCoreBox;
