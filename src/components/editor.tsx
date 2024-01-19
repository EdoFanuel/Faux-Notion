import { ReactNode } from "react"
import { HeaderEditor, HeaderProps } from "./header"
import { ParagraphEditor, ParagraphProps } from "./paragraph"
import { ContentProps, ContentType, getContentType } from "./component_type"


type EditorProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
    onTypeChange: (newType: ContentType) => void
    onContentChange: (content: ContentProps) => void
}

export default function Editor(props: EditorProps) {
    const {contentId: id, type, contentData: content, onTypeChange, onContentChange} = props

    function handleTypeChange(newType: string) {
        onTypeChange(getContentType(Number(newType)))
    }

    function handleContentChange(content: ContentProps) {
        onContentChange(content)
    }

    function renderContentEditor(type: ContentType, content: ContentProps): ReactNode {
        switch(type) {
            case ContentType.Paragraph: {
                const paraProps = content as ParagraphProps
                return (<ParagraphEditor content={paraProps.content} onContentChange={handleContentChange}/>)
            }
            case ContentType.Header: {
                const headerProps = content as HeaderProps
                return (<HeaderEditor level={headerProps.level} title={headerProps.title} onContentChange={handleContentChange}/>)
            }
        }
    }
    return (
        <div>
            <label>Item ID: {id}</label><br/>
            <label>
                Item Type:&nbsp; 
                <select value={type} onChange={e => handleTypeChange(e.target.value)}>
                    {
                        Object.keys(ContentType).filter(v => isNaN(Number(v))).map((key, index) => 
                            <option key={index} value={index}>
                                {key}
                            </option>
                        )
                    }
                </select>
            </label>
            <hr/>
            {renderContentEditor(type, content)}
        </div>
    )
}