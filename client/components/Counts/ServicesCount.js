import React, { useState, useEffect } from 'react';

function ServicesCount(props) {
  const { services } = props;
  const servicesCount = services.length ? services.length : '-';
  return <div>ServicesCount {servicesCount}</div>;
}

export default ServicesCount;
