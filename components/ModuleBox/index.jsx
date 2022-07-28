import React from 'react';
import PropTypes from 'prop-types';
import BtnArrow from '../BtnArrow';

const ModuleBox = ({ title, thumbnail, onClick = () => {} }) => {
  return (
    <div className='bg-white px-3 py-5 rounded-xl min-w-220 md:min-w-0'>
      <div className='mb-1'>
        <img className='mx-auto h-[162px] w-[162px] object-cover' src={thumbnail} alt='image' />
      </div>

      <div className='flex items-start justify-between space-x-3'>
        <h3 className='text-base font-bold flex-1' dangerouslySetInnerHTML={{ __html: title }} />

        <BtnArrow theme='white' onClick={onClick} />
      </div>
    </div>
  );
};

ModuleBox.propTypes = {};

export default ModuleBox;
