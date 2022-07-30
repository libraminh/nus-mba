import Image from 'next/image';
import NextBlueArrow from '../../public/images/next-blue-arrow.png';

function SampleNextArrow({ currentSlide, slideCount, ...props }) {
  const { className, style, onClick } = props;

  return (
    <div
      className='hidden absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer w-8 h-8 md:flex items-center justify-center'
      onClick={onClick}
    >
      <Image src={NextBlueArrow} alt='icon' />
    </div>
  );
}

function SamplePrevArrow({ currentSlide, slideCount, ...props }) {
  const { className, style, onClick } = props;

  return (
    <div
      className='hidden absolute left-5 top-1/2 -translate-y-1/2 rotate-180 cursor-pointer w-8 h-8 md:flex items-center justify-center'
      onClick={onClick}
    >
      <Image src={NextBlueArrow} alt='icon' />
    </div>
  );
}

export { SampleNextArrow, SamplePrevArrow };
