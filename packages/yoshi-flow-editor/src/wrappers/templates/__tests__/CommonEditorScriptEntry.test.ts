import commonEditorScriptEntry from '../CommonEditorScriptEntry';

describe('CommonEditorScriptEntry template', () => {
  it('generates correct template with entry editorScript file for OOI components', () => {
    const generateEditorScriptEntryContent = commonEditorScriptEntry({
      editorEntryFileName: 'project/src/editor.app.ts',
      controllersMeta: [],
      shouldUseAppBuilder: false,
    });

    expect(generateEditorScriptEntryContent).toMatchSnapshot();
  });

  it('generates correct template with entry editorScript file for app builder components', () => {
    const generateEditorScriptEntryContent = commonEditorScriptEntry({
      editorEntryFileName: 'project/src/editor.app.ts',
      controllersMeta: [
        {
          controllerFileName: 'project/src/components/a/editor.controller.ts',
          id: 'FIRST_ID',
          widgetType: 'STUDIO_WIDGET',
        },
      ],
      shouldUseAppBuilder: true,
    });

    expect(generateEditorScriptEntryContent).toMatchSnapshot();
  });

  it('generates correct template with entry editorScript file for multiple app builder components', () => {
    const generateEditorScriptEntryContent = commonEditorScriptEntry({
      editorEntryFileName: 'project/src/editor.app.ts',
      controllersMeta: [
        {
          controllerFileName: 'project/src/components/a/editor.controller.ts',
          id: 'FIRST_ID',
          widgetType: 'STUDIO_WIDGET',
        },
        {
          controllerFileName: 'project/src/components/c/editor.controller.ts',
          id: 'SECOND_ID',
          widgetType: 'STUDIO_WIDGET',
        },
        {
          controllerFileName: 'project/src/components/d/editor.controller.ts',
          id: 'THIRD_ID',
          widgetType: 'STUDIO_WIDGET',
        },
      ],
      shouldUseAppBuilder: true,
    });

    expect(generateEditorScriptEntryContent).toMatchSnapshot();
  });
});
