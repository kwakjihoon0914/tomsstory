
import Editor from 'react-pell'


const HTMLEditor = ({ handleChange,defaultContent }) => {

    const _handleChnage = (html) =>{

        console.log(html,"#")
        handleChange(html)
    }

    return (<Editor
        style={{margin:5}}
        defaultContent={defaultContent}
        actions={['bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'olist', 'ulist', 'quote', 'code', 'line']}
        onChange={_handleChnage}
        
        gmf={true}
    />)
}

export default HTMLEditor;