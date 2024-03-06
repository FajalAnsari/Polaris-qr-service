import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TestuseParam = () => {
  const location = useLocation();
  console.log(location);
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);
  const locationParam = searchParams.get('location');
  const tableIdParam = searchParams.get('table_id');

  return (
    <>
    <div>
      <h1>Add Paramemeters  </h1>
      <Link to="/testuseparam?location=LLRWA&table_id=1">Go to Menu</Link>
      <h1>Location: {locationParam}</h1>
      <h1>Table ID: {tableIdParam}</h1>
    </div>
    </>
  );
};

export default TestuseParam;
