import LocalAppTemplateModel from '../TemplateModel';
import extendedPropmts, { Answers } from './extended-prompts';
import TemplateModel from './TemplateModel';
import getQuestions from './getQuestions';
import { getInstance } from './auth';
import { initAppService } from './appService';
import getDefaultAnswers from './getDefaultAnswers';

export default async (
  localAppModel: LocalAppTemplateModel,
): Promise<TemplateModel> => {
  const fallbackWithDefaultTemplate = () =>
    new TemplateModel(getDefaultAnswers(localAppModel.templateDefinition.name));

  const instance = await getInstance();
  if (instance) {
    initAppService(instance);
  } else {
    // We should handle default template if auth flow was failed
    return fallbackWithDefaultTemplate();
  }

  const questions = getQuestions();

  let answers: Answers<string>;

  try {
    answers = await extendedPropmts<{ apps?: any } & LocalAppTemplateModel>(
      questions,
      localAppModel,
    );
    if (!answers.appRegistrationState) {
      return fallbackWithDefaultTemplate();
    }
  } catch (e) {
    // We want to show unhanded errors
    if (e.message !== 'Aborted') {
      console.error(e);
      console.log(
        "⚠ Can't register/migrate Dev Center project. The default project will be created instead.",
        '\n',
      );
      return fallbackWithDefaultTemplate();
    }
    console.log();
    console.log('Aborting ...');
    process.exit(0);
  }

  return new TemplateModel(answers as any);
};
