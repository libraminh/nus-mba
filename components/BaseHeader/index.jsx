import Image from 'next/image';
import NUSLogo from '../../public/images/nus-logo.png';

const BaseHeader = () => {
  return (
    <header>
      <div className='md:px-10'>
        <div className='py-9 px-7 md:px-0'>
          <a href='#/'>
            <Image src={NUSLogo} alt='logo' priority />
          </a>
        </div>
      </div>
    </header>
  );
};

export default BaseHeader;
