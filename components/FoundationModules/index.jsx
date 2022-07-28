import React from 'react';
import { FOUNDATION_NAME } from '../../constant';
import BaseModuleWrapper from '../BaseModuleWrapper';
import FoundationHeading from '../FoundationHeading';
import ModuleCore from '../ModuleCore';

const FoundationModules = ({ journeyData, layout, showHeading = true }) => {
  const coreModules = journeyData?.base_modules.filter(
    (item) => !item.is_experiential
  );

  const experientialModules = journeyData?.base_modules.filter(
    (item) => item.is_experiential
  );

  const specialModules = journeyData?.modules || [];

  const desc = journeyData?.general.sections[0].desc;
  const title = journeyData?.general.sections[0].title;

  return (
    <BaseModuleWrapper className='py-10 md:p-10 bg-nus-blue-200 rounded-xl '>
      {showHeading && <FoundationHeading desc={desc} title={title} />}

      <ModuleCore
        layout={layout}
        items={coreModules}
        title={FOUNDATION_NAME[0]}
      />

      {experientialModules?.length > 0 && (
        <ModuleCore
          layout={layout}
          items={experientialModules}
          title={FOUNDATION_NAME[1]}
        />
      )}

      {specialModules?.length > 0 && (
        <ModuleCore
          layout={layout}
          items={specialModules}
          title={FOUNDATION_NAME[2]}
        />
      )}
    </BaseModuleWrapper>
  );
};

export default FoundationModules;
