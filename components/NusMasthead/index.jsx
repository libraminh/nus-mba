import Image from 'next/image';
import MastheadImage from '../../public/images/masthead-img.png';

const NusMasthead = ({ headingContent }) => {
  return (
    <section className='px-7'>
      <div className='text-center'>
        <h2
          className='text-26 leading-31 md:text-2.5xl font-bold mb-8'
          dangerouslySetInnerHTML={{ __html: headingContent.title }}
        />
      </div>

      <div className='flex max-w-4xl mx-auto space-x-5'>
        <div
          className='text-sm md:text-base flex-1'
          dangerouslySetInnerHTML={{ __html: headingContent.desc }}
        />

        <figure className='basis-[300px] self-end hidden md:block'>
          <Image src={MastheadImage} alt='image' />
        </figure>
      </div>
    </section>
  );
};

export default NusMasthead;
