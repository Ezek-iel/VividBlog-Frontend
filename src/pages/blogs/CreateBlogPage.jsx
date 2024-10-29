import { MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import { useRef, useState} from 'react'


export function CreateBlogPage() {

    const ref = useRef(null)
    const [markText, setMarkText] = useState('')

    function handleChange(){
        const markdown = ref.current.getMarkdown();
        console.log(markdown)
        setMarkText(markdown)
    }

    return (
        <>
            <MDXEditor ref={ref} markdown={markText} plugins={[headingsPlugin()]} onChange={handleChange} />
        </>
    )
}