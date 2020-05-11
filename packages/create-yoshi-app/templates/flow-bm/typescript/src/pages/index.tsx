import React, { FC, useEffect } from 'react';
import { notifyViewFinishedLoading } from '@wix/business-manager-api';
import t from '../../translations/en.json';

const Index: FC = () => {
  useEffect(() => {
    notifyViewFinishedLoading('{%projectName%}.pages.index');
  }, []);

  return (
    <div>
      <h1>{t['app.title']}</h1>
    </div>
  );
};

export default Index;
