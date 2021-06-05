
import Editor from 'react-pell/plugins/markdown'

const MarkdownEditor = ({ handleChange,defaultContent }) => {

    return (<Editor
        style={{margin:5}}
        defaultContent={defaultContent}
        actions={['bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'olist', 'ulist', 'quote', 'code', 'line']}
        onChange={handleChange}
        gmf={true}
    />)
}

export default MarkdownEditor;