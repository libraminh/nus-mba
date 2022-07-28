import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CarouselWrapper } from './styled';
import { CarouselStyled } from './styled';
import NextBlueArrow from '../../public/images/next-blue-arrow.png';
import Image from 'next/image';

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

const SwitchPersona = ({
  jID,
  handleOnClick = () => {},
  layout = 'grid grid-cols-3 md:grid-cols-4 gap-5',
}) => {
  const queryClient = useQueryClient();
  const cachedJourneys = queryClient.getQueryData(['journeys']);
  const [slickSlider, setslickSlider] = useState(null);
  const sliderRef = useRef(null);
  const afterChangeTimeout = useRef(null);

  useEffect(() => {
    setslickSlider(sliderRef.current);
  }, []);

  const newJourneysIndex = useMemo(() => {
    return cachedJourneys?.data.journeys.findIndex(
      (item) => item.jID === parseInt(jID)
    );
  }, [cachedJourneys?.data]);

  const settings = {
    swipeToSlide: true,
    draggable: true,
    arrows: true,
    dots: true,
    nextArrow: <SampleNextArrow handleOnClick={handleOnClick} />,
    prevArrow: <SamplePrevArrow handleOnClick={handleOnClick} />,
    afterChange: function (index) {
      if (afterChangeTimeout.current) clearTimeout(afterChangeTimeout.current);
      afterChangeTimeout.current = setTimeout(() => {
        handleOnClick(cachedJourneys?.data.journeys[index]);
      }, 1000);
    },
  };

  useEffect(() => {
    if (!!!slickSlider) return;
    slickSlider.goTo(newJourneysIndex);
  }, [slickSlider]);

  useEffect(() => {
    return () => {
      clearTimeout(afterChangeTimeout.current);
    };
  }, []);

  return (
    <CarouselWrapper className={`${layout}`}>
      <CarouselStyled
        {...settings}
        ref={sliderRef}
        className='p-5 md:py-10 md:px-16 flex justify-between items-center space-x-2 md:space-x-4 min-w-220 md:min-w-0 rounded-xl border border-solid border-black'
      >
        {cachedJourneys?.data.journeys?.map((item, index) => (
          <div key={item.jID}>
            <div className='cursor-pointer md:flex md:items-center md:justify-between space-y-5 md:space-y-0 md:space-x-20 '>
              <figure className='text-center md:text-left'>
                <h1 className='text-26 leading-31 md:text-3xl font-bold mb-2'>
                  {item.detail_title}
                </h1>
                <h3 className='text-base'>{item.detail_desc}</h3>
              </figure>

              <figure>
                <div className='mx-auto w-[160px] h-[145px] relative'>
                  <Image
                    src={item.img}
                    alt='thumb'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              </figure>
            </div>
          </div>
        ))}
      </CarouselStyled>
    </CarouselWrapper>
  );
};

export default SwitchPersona;
