import { watch } from 'chokidar';
import { environment } from './environment';

(async () => {
  let testkit = await environment();
  await testkit.start();

  const restartTestkit = async () => {
    await testkit.stop();
    testkit = await environment();
    await testkit.start();
  };

  watch(['target/module_{%PROJECT_NAME%}.json']).on('all', async () => {
    await restartTestkit();
  });

  process.on('SIGINT', () => testkit.stop());
  process.on('exit', () => testkit.stop());
})();
