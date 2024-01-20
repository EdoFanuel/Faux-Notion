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
    onCreate: (type: ContentType, content: ContentProps) => void
}

export default function Editor(props: EditorProps) {
    const {contentId, type, contentData, onTypeChange, onContentChange, onCreate} = props

    function renderContentEditor(type: ContentType, content: ContentProps): ReactNode {
        switch(type) {
            case ContentType.Paragraph: {
                const paraProps = content as ParagraphProps
                return (<ParagraphEditor content={paraProps.content} onContentChange={onContentChange}/>)
            }
            case ContentType.Header: {
                const headerProps = content as HeaderProps
                return (<HeaderEditor level={headerProps.level} title={headerProps.title} onContentChange={onContentChange}/>)
            }
        }
    }
    return (
        <div>
            <label>Item ID: {contentId}</label><br/>
            <label>
                Item Type:&nbsp; 
                <select value={type} onChange={e => onTypeChange(getContentType(Number(e.target.value)))}>
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
            {renderContentEditor(type, contentData)}
            <hr/>
            {contentId ? '' : <button onClick={e => onCreate(type, contentData)}>Add new {ContentType[type]}</button>}
        </div>
    )
}