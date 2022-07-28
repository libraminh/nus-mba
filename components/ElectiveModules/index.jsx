import React from 'react';
import ModuleCore from '../ModuleCore';
import { ELECTIVES_NAME } from '../../constant';
import ElectivesHeading from '../ElectivesHeading';
import BaseModuleWrapper from '../BaseModuleWrapper';

const ElectiveModules = ({
  coreModules,
  children,
  layout,
  desc,
  title,
  showHeading = true,
}) => {
  let academicGroup = coreModules.filter(
    (item) => item.is_academy && !item.is_experiential && item.selected
  );
  let experientialGroup = coreModules.filter(
    (item) => item.is_experiential && item.selected
  );
  let specialGroup = coreModules.filter(
    (item) => !item.is_academy && item.selected
  );

  return (
    <BaseModuleWrapper className='py-10 md:p-10 bg-nus-yellow-200 rounded-xl'>
      {showHeading && <ElectivesHeading title={title} desc={desc} />}

      {academicGroup.length > 0 && (
        <ModuleCore
          layout={layout}
          items={academicGroup}
          title={ELECTIVES_NAME[0]}
        />
      )}

      {experientialGroup.length > 0 && (
        <ModuleCore
          layout={layout}
          items={experientialGroup}
          title={ELECTIVES_NAME[1]}
        />
      )}

      {specialGroup.length > 0 && (
        <ModuleCore
          layout={layout}
          items={specialGroup}
          title={ELECTIVES_NAME[2]}
        />
      )}

      {children}
    </BaseModuleWrapper>
  );
};

export default ElectiveModules;
