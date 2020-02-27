import React from 'react';
import { Icon } from 'semantic-ui-react';

function Footer() {

  return(
    <div style={{ backgroundColor: '#999', padding: '2rem' }}>
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <a href="https://github.com/russ430/running-times-app" target="_blank" rel="noreferrer noopener">
          <Icon name="github" size="big" color="black"/>
        </a>
        <p style={{ marginTop: '0.5rem'}}>This is a portfolio project created by <a href="https://alexrussian.com" target="_blank" rel="noreferrer noopener" style={{ color: '#fff', textDecoration: 'underline' }}>Alex Russian</a></p>
      </div>
    </div>
  );
};

export default Footer;
