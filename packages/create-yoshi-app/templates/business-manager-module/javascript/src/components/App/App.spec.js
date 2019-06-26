import * as React from 'react';
import { mount } from 'enzyme';
import { I18nextProvider } from '@wix/wix-i18n-config';
import App from './App';
import i18n from '../__mocks__/i18n';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('renders a title correctly', () => {
    wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
      { attachTo: document.createElement('div') },
    );

    expect(wrapper.find('h2')).toHaveLength(1);
  });
});
