import React, { useState, useEffect } from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
const ServicesStatus = (props) => {
  const { services } = props;
  console.log(services);
  return <ComponentWrapper title='Service Status'>TBD</ComponentWrapper>;
  //   const podsObj = {};
  //   for (let pod of pods) {
  //     podsObj[pod.metadata.name] = pod.status.phase;
  //   }
  //   console.log(podsObj);
  //   return <div className='podsStatus'></div>;
};

export default ServicesStatus;
