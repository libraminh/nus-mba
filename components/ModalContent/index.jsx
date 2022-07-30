import { useSelector } from 'react-redux';

const ModalContent = (props) => {
  const { modalContent } = useSelector((state) => state.globalSlice);

  return (
    <div className='text-nus-black-200 space-y-7'>
      <h3
        className='text-xl font-bold'
        dangerouslySetInnerHTML={{ __html: modalContent.title }}
      />

      <div
        className='space-y-7 text-sm'
        dangerouslySetInnerHTML={{ __html: modalContent.desc }}
      />
    </div>
  );
};

export default ModalContent;
