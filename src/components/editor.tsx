import { ReactNode } from "react"
import { HeaderEditor, HeaderProps } from "./header"
import { ParagraphEditor, ParagraphProps } from "./paragraph"
import { ContentProps, ContentType, getContentType } from "../common/component_type"


type EditorProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
    onTypeChange: (newType: ContentType) => void
    onContentChange: (content: ContentProps) => void
    onCreate: (type: ContentType, content: ContentProps) => void
    onUpdate: (id: string, type: ContentType, content: ContentProps) => void,
    onDelete: (id: string) => void
}

export default function Editor(props: EditorProps) {
    const {contentId, type, contentData, onTypeChange, onContentChange, onCreate, onUpdate, onDelete} = props

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
    let actionButtons: ReactNode
    if (contentId) {
        actionButtons = (
            <>
                <button type='button' onClick={e => onUpdate(contentId, type, contentData)} className='btn btn-info col-span-8'>
                    Save {ContentType[type]}
                </button>
                <button type='button' onClick={e => onDelete(contentId)} className='btn btn-error col-span-4'>
                    Delete {ContentType[type]}
                </button>
            </>
        )
    } else {
        actionButtons = (
            <button type='button' onClick={e => onCreate(type, contentData)} className='btn btn-success col-span-12'>
                Add new {ContentType[type]}
            </button>
        )
    }
    

    return (
        <>
            <div className='container mx-auto grid grid-cols-3 py-2'>
                <label className='font-bold'>Item ID</label>
                <label className='col-span-2 font-semibold text-sm'>{contentId}</label>
            </div>
            <div className='container mx-auto grid grid-cols-3'>
                <label className='font-bold'>Item Type</label> 
                <select value={type} onChange={e => onTypeChange(getContentType(Number(e.target.value)))} className='select select-bordered w-full col-span-2'>
                    {
                        Object.keys(ContentType).filter(v => isNaN(Number(v))).map((key, index) => 
                            <option key={index} value={index}>
                                {key}
                            </option>
                        )
                    }
                </select>
            </div>
            <span className='divider'/>
            <span className='container mx-auto grid grid-cols-12 gap-4'>{ renderContentEditor(type, contentData) }</span>
            <span className='divider'/>
            <span className='container mx-auto grid grid-cols-12 gap-4'>{ actionButtons }</span>
        </>
    )
}