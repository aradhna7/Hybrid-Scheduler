import React from 'react';
import { Container } from 'reactstrap';

export default function PageHeader() {
  return (
    <div className='page-header header-filter'>
      <div className='squares square1' />
      <div className='squares square2' />
      <div className='squares square3' />
      <div className='squares square4' />
      <div className='squares square5' />
      <div className='squares square6' />
      <div className='squares square7' />
      <Container>
        <div className='content-center brand'>
          <h1 className='h1-seo'>Hybrid Scheduler</h1>
          <h4 className='d-none d-sm-block'>
            Hybrid classes work in such a manner that half-strength would attend
            college/school and the same lecture would simultaneously be made
            available online for those attending lecture from their respective
            homes.
          </h4>
        </div>
      </Container>
    </div>
  );
}
