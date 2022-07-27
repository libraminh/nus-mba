import tw, { styled } from "twin.macro";
import { Carousel } from "antd";

export const CarouselWrapper = styled.div`
  ${tw`flex overflow-hidden`}

  .ant-carousel {
    ${tw`overflow-hidden`}
  }
`;

export const CarouselStyled = styled(Carousel)`
  .slick-dots li {
    width: auto;

    button {
      width: 10px;
      height: 10px;
      ${tw`rounded-full bg-nus-blue-800 opacity-100 transition-all duration-200 ease-in-out`}
    }

    &.slick-active {
      width: auto;

      button {
        ${tw`bg-nus-orange-400`}
      }
    }
  }

  .slick-dots-bottom {
    ${tw`space-x-3 bottom-0 relative mt-5`}
  }

  .slick-dots li button:hover,
  .slick-dots li button:focus {
    ${tw`opacity-100 bg-nus-orange-400`}
  }
`;
