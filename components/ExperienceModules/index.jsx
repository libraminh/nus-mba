import React from 'react';
import { EXPERIENCE_NAME } from '../../constant';
import BaseModuleWrapper from '../BaseModuleWrapper';
import ExperiencesHeading from '../ExperiencesHeading';
import ModuleCore from '../ModuleCore';
import ModuleCoreBox from '../ModuleCoreBox';

const ExperienceModules = ({
  coreModules,
  specialModules,
  children,
  desc,
  showHeading = true,
  title,
}) => {
  let selectedFiltered = specialModules.filter((item) => item.selected);

  return (
    <BaseModuleWrapper className='py-10 md:p-10 rounded-xl bg-nus-red-200'>
      {showHeading && <ExperiencesHeading title={title} desc={desc} />}

      {coreModules.length != 0 && (
        <ModuleCore items={coreModules} title={EXPERIENCE_NAME[0]} />
      )}

      {selectedFiltered.length > 0 && (
        <ModuleCoreBox items={specialModules} title={EXPERIENCE_NAME[1]} />
      )}

      {children}
    </BaseModuleWrapper>
  );
};

export default ExperienceModules;
