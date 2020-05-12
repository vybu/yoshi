import { isOutOfIframe } from '../utils';

export default (localAppModelName: string) => {
  if (isOutOfIframe(localAppModelName)) {
    return {
      appId: 'fda9208a-85a4-4482-9f43-59599773e998',
      appName: 'Editor flow test app',
      components: [
        {
          id: '10d35619-006d-4c99-a09d-f4c508533e3f',
          type: 'WIDGET_OUT_OF_IFRAME',
          name: 'button',
        },
      ],
    };
  }
  return {
    appId: '945c0d1a-5d9d-422d-adc0-da8fb3fe8c8f',
    appName: 'Editor flow test app',
    components: [
      {
        id: '945c0d1a-5d9d-422d-adc0-da8fb3fe8c8f-yik50',
        type: 'STUDIO_COMPONENT',
        name: 'firstWidget',
      },
    ],
  };
};
