import path from 'path';
import extendedPropmts, {
  Answers,
} from './dev-center-registration/extended-prompts';
import TemplateModel from './TemplateModel';
import getQuestions from './getQuestions';

export default async (workingDir = process.cwd()) => {
  const questions = getQuestions();

  let answers: Answers<string> = {};

  try {
    answers = await extendedPropmts<{}>(questions, {});
  } catch (e) {
    // We want to show unhanded errors
    if (e.message === 'Aborted') {
      console.log();
      console.log('Aborting ...');
      process.exit(0);
    }
  }

  // use the basename of the current working directory if projectName wasn't supplied
  answers.projectName = answers.projectName || path.basename(workingDir);

  return new TemplateModel(answers as any);
};
