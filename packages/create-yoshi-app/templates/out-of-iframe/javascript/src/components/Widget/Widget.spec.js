import React from 'react';
import { mount } from 'enzyme';
import { Widget } from './Widget';
import { I18nextProvider } from '@wix/wix-i18n-config';
import i18n from '../../../__tests__/helpers/i18n.mock';
import { ExperimentsProvider } from '@wix/wix-experiments-react';

describe('Widget', () => {
  let wrapper;

  afterEach(() => wrapper.unmount());

  it('should render a title correctly', async () => {
    const name = 'World';

    wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ExperimentsProvider options={{ experiments: {} }}>
          <Widget name={name} />
        </ExperimentsProvider>
      </I18nextProvider>,
    );

    const key = 'app.hello';

    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe(`${key}!`);
  });
});
