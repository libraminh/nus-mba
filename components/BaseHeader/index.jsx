import Image from 'next/image';
import Link from 'next/link';
import NUSLogo from '../../public/images/nus-logo.png';

const BaseHeader = () => {
  return (
    <header className='md:px-10'>
      <div className='py-9 px-7 md:px-0'>
        <Link href='/'>
          <a>
            <Image src={NUSLogo} alt='logo' priority />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default BaseHeader;
