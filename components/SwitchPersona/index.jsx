import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SampleNextArrow, SamplePrevArrow } from './PersonaArrows';
import { CarouselStyled, CarouselWrapper } from './styled';

const SwitchPersona = ({
  jID,
  handleOnClick = () => {},
  layout = 'grid grid-cols-3 md:grid-cols-4 gap-5',
}) => {
  const queryClient = useQueryClient();

  const journeyData = queryClient.getQueryData(['journeys']) || {};

  const [slickSlider, setslickSlider] = useState(null);
  const sliderRef = useRef(null);
  const afterChangeTimeout = useRef(null);

  useEffect(() => {
    setslickSlider(sliderRef.current);
  }, []);

  const newJourneysIndex = useMemo(() => {
    return journeyData?.data.journeys.findIndex(
      (item) => item.jID === parseInt(jID)
    );
  }, [journeyData?.data, jID]);

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
        console.log('clicked');
        handleOnClick(journeyData?.data.journeys[index]);
      }, 1000);
    },
  };

  useEffect(() => {
    if (!!!slickSlider) return;
    console.log('12312312');
    slickSlider.goTo(newJourneysIndex);
  }, [slickSlider, newJourneysIndex]);

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
        {journeyData?.data.journeys?.map((item, index) => (
          <React.Fragment key={item.jID}>
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
          </React.Fragment>
        ))}
      </CarouselStyled>
    </CarouselWrapper>
  );
};

export default SwitchPersona;
