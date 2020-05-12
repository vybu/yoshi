import testkit from '@wix/wix-bootstrap-testkit';
import {
  createTestkit,
  testkitConfigBuilder,
  anAppConfigBuilder,
} from '@wix/business-manager/dist/testkit';

interface TestKitConfigOptions {
  withRandomPorts: boolean;
}

// start the server as an embedded app
const bootstrapServer = () => {
  return testkit.app(require.resolve('yoshi-server/bootstrap'), {
    env: process.env as Record<string, string>,
  });
};

const getTestKitConfig = async (
  { withRandomPorts }: TestKitConfigOptions = { withRandomPorts: false },
  app: testkit.BootstrapServer,
) => {
  const serverUrl = 'http://localhost:3200/';
  const serviceId = 'com.wixpress.{%projectName%}';
  const path = './app-config-templates/module_{%PROJECT_NAME%}.json';

  const moduleConfig = anAppConfigBuilder()
    .fromJsonTemplate(require(path)) //  replace this line with the next once your config is merged
    // .fromModuleId('{%PROJECT_NAME%}')
    .withArtifactMapping({ [serviceId]: { url: serverUrl } })
    .build();

  let builder = testkitConfigBuilder()
    .registerApi({
      serviceId: '{%projectName%}',
      serverUrl: app.getUrl(),
    })
    .withModulesConfig(moduleConfig)
    .autoLogin();

  if (withRandomPorts) {
    builder = builder.withRandomPorts();
  }

  return builder.build();
};

export const environment = async (envConfig?: TestKitConfigOptions) => {
  const app = bootstrapServer();
  const bmApp = createTestkit(await getTestKitConfig(envConfig, app));
  return {
    app,
    bmApp,
  };
};
