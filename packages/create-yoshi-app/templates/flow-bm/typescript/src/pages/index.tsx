import React, { FC, useEffect } from 'react';
import { notifyViewFinishedLoading } from '@wix/business-manager-api';
import { useFedops, useTranslate } from 'yoshi-flow-bm-runtime';

const Index: FC = () => {
  const fedops = useFedops();
  const t = useTranslate();

  useEffect(() => {
    fedops.appLoaded();
    notifyViewFinishedLoading('{%projectName%}.pages.index');
  }, [fedops]);

  return (
    <div>
      <h1>{t('app.title')}</h1>
    </div>
  );
};

export default Index;
