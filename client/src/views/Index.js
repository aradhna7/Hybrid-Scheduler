import React from 'react';

// core components
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import PageHeader from 'components/PageHeader/PageHeader.js';

export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle('index-page');
    return function cleanup() {
      document.body.classList.toggle('index-page');
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className='wrapper'>
        <PageHeader />
        <div className='main'></div>
      </div>
    </>
  );
}
