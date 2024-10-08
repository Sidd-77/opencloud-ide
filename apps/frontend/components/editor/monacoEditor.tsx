import React from 'react'
import Editor from "@monaco-editor/react";
import {File} from '@/lib/file-manager';
import styled from "@emotion/styled";

export const Code = ({selectedFile}: { selectedFile: File | undefined }) => {
  if (!selectedFile)
    return null

  const code = selectedFile.content
  let language = selectedFile.name.split('.').pop()

  if (language === "js" || language === "jsx")
    language = "javascript";
  else if (language === "ts" || language === "tsx")
    language = "typescript"

  return (
    <Div>
      <Editor
        height="100vh"
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: {enabled: false},
          scrollbar: {vertical: 'hidden', horizontal: 'auto'},
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: false
        }}
      />
    </Div>
  )
}

const Div = styled.div`
  width: calc(100% - 250px);
  margin: 0;
  font-size: 16px;
`
