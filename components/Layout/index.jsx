import { Modal } from 'antd';
import Head from 'next/head';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsVisiblePrimaryModal } from '../../store/slices/GlobalSlice';
import BaseHeader from '../BaseHeader';
import ModalContent from '../ModalContent';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isVisiblePrimaryModal, sideBarProps, isVisibleSecondModal } =
    useSelector((state) => state.globalSlice);

  const handleCancel = useCallback(() => {
    dispatch(toggleIsVisiblePrimaryModal());
  }, []);

  return (
    <div className='app-wrapper max-w-1456 mx-auto'>
      <Head>
        <title>NUS MBA Programme Builder</title>
        <meta name='description' content='NUS MBA Programme Builder' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <BaseHeader />

      <div>{children}</div>

      <Modal
        centered
        onCancel={handleCancel}
        footer={null}
        title={null}
        visible={isVisiblePrimaryModal}
        className='primary_modal'
      >
        <ModalContent />
      </Modal>

      {/* <Modal
        centered
        onCancel={handleCancelSecond}
        footer={null}
        title={null}
        visible={isVisibleSecondModal}
        width={600}
        className='primary_modal'
      >
        <EmailConfirm />
      </Modal> */}
    </div>
  );
};

export default Layout;
