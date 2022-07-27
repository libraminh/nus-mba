import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { Collapse, Form, Select } from 'antd';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { getJourneyOptions } from '../../api';
import NextArrow from '../../public/images/next.png';
import NextBlueArrow from '../../public/images/next-blue-arrow.png';

// import './styles.scss';
import ButtonNext from '../ButtonNext';
import HeadingBox from '../HeadingBox';
import LoadingScreen from '../LoadingScreen';

const { Panel } = Collapse;
const { Option } = Select;

const CustomHeader = ({ bgColor = '', icon, title, index }) => {
  return (
    <figure
      className={`${bgColor} custom_header flex items-center space-x-3 md:space-x-6 p-3 md:px-8 md:py-7 rounded-xl`}
    >
      <HeadingBox>{index + 1}</HeadingBox>

      <span className='text-lg font-bold'>{title}</span>
    </figure>
  );
};

const panelHeadingTitle = ['Create your profile', 'Build your journey'];

const selectHeading = [
  'What role do you aspire to post MBA?',
  'Which industry do you want to advance in post MBA?',
  'What is your area of interest?',
];

const BuildJourneyStep = () => {
  const [activePanel, setActivePanel] = useState(1);
  const [form] = Form.useForm();

  const { data: journeyOptions, isLoading } = useQuery(
    ['journeyOptions'],
    getJourneyOptions
  );

  const handleNext = (step) => {
    setActivePanel(step);
    form.submit();
  };

  const onFinish = (values) => {
    // console.log(values);
  };

  const ArrowDownIcon = () => (
    <Image
      className='transform rotate-90 -translate-x-5'
      src={NextBlueArrow}
      alt='icon'
    />
  );

  const formInitValues = useMemo(() => {
    if (!journeyOptions) return;
    const { industries, interests, roles } = journeyOptions?.data;
    return {
      industries: industries[0].val,
      interests: interests[0].val,
      roles: roles[0].val,
    };
  }, [journeyOptions?.data]);

  if (isLoading) return <LoadingScreen />;

  const renderPanelContent = (index) => {
    switch (index) {
      case 1:
        return (
          <div className='space-y-8'>
            <Form
              form={form}
              name='control-hooks'
              onFinish={onFinish}
              className='space-y-8'
              initialValues={formInitValues}
            >
              {Object.values(journeyOptions?.data)?.map((select, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className='space-y-4'>
                      <h2 className='text-base font-bold'>
                        {selectHeading[index]}
                      </h2>

                      <Form.Item
                        name={Object.keys(journeyOptions?.data)[index]}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          className='w-full'
                          // initialValues={select[0].val}
                          style={{ width: '100%' }}
                          suffixIcon={<ArrowDownIcon />}
                        >
                          {select?.map((option, index) => (
                            <Option key={option.val} value={option.val}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: option.title,
                                }}
                              />
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </React.Fragment>
                );
              })}
            </Form>

            <ButtonNext
              className='space-x-8'
              onClick={() => handleNext(index + 1)}
            >
              <span>Next</span>
              <span>
                <Image src={NextArrow} alt='icon' />
              </span>
            </ButtonNext>
          </div>
        );

      case 2:
        return (
          <div className='space-y-8'>
            <ol className='space-y-7'>
              <div>
                <li className='text-base font-bold mb-1'>
                  STEP 1: Build your foundation
                </li>
                <span className='text-sm'>
                  View a list of unique Dual Core modules that provide you a
                  solid foundation.
                </span>
              </div>

              <div>
                <li className='text-base font-bold mb-1'>
                  STEP 2: Tailor your electives and experience
                </li>
                <span className='text-sm'>
                  Select from more than 50 academic and experiential electives,
                  as well as a host of other learning opportunities, to tailor
                  your experience.
                </span>
              </div>

              <div>
                <li className='text-base font-bold mb-1'>
                  STEP 3: Save and edit your journey
                </li>
                <span className='text-sm'>
                  Submit your email to save and retrieve your journey whenever
                  you want to.
                </span>
              </div>
            </ol>

            <Link
              href={{
                pathname: '/journey',
                state: { ...form.getFieldValue(), fromBuildJourney: true },
              }}
            >
              <a className='inline-block'>
                <ButtonNext className='space-x-8'>
                  <span>Next</span>
                  <span>
                    <Image src={NextArrow} alt='icon' />
                  </span>
                </ButtonNext>
              </a>
            </Link>
          </div>
        );
    }
  };

  return (
    <Collapse
      activeKey={activePanel}
      expandIconPosition={'right'}
      className='space-y-5 border-0 bg-transparent'
      expandIcon={() => <></>}
    >
      {[...Array(2)]?.map((item, index) => (
        <Panel
          className={`${
            index > 0 && index + 1 !== activePanel && 'bg-nus-gray-300'
          } !rounded-xl ${
            activePanel === 2 && index === 0 ? 'bg-nus-green-100' : 'bg-white'
          }`}
          header={
            <CustomHeader
              icon={'money.png'}
              title={panelHeadingTitle[index]}
              index={index}
            />
          }
          key={index + 1}
        >
          <div className='pb-6 pt-3 md:pt-0 px-5 md:px-12'>
            {renderPanelContent(index + 1)}
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export default BuildJourneyStep;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('journeyOptions', getJourneyOptions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
