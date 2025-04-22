import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { createATA } from "./ata";
import { editor } from 'monaco-editor';

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;

  const handleEditorMount: OnMount = (editorInstance, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      typeRoots: ["node_modules/@types"],
    });

    editorInstance.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL],
      run: () => editorInstance.getAction('editor.action.formatDocument')?.run(),
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
    });

    editorInstance.onDidChangeModelContent(() => {
      ata(editorInstance.getValue());
    });

    ata(editorInstance.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}