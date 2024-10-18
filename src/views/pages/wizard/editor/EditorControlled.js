// ** React Imports
import { useState } from 'react'

// import { EditorState } from 'draft-js'
// import { Editor } from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const EditorControlled = () => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())

  // return (
  //   <Card>
  //     <CardHeader>
  //       <CardTitle tag='h4'>Controlled Editor</CardTitle>
  //     </CardHeader>
  //     <CardBody>
  //       <Editor editorState={value} onEditorStateChange={data => setValue(data)} />
  //     </CardBody>
  //   </Card>
  // )
}

export default EditorControlled
