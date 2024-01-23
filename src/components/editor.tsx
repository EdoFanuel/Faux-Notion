import { ReactNode } from "react"
import { HeaderEditor } from "./header"
import { ParagraphEditor } from "./paragraph"
import { ContentProps, ContentType, HeaderProps, ParagraphProps, getContentType } from "../common/props"


type EditorProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
    onCreate: (type: ContentType, content: ContentProps) => void
    onUpdate: (id: string | undefined, type: ContentType, content: ContentProps, shouldReset: boolean) => void,
    onDelete: (id: string) => void
}

export default function Editor(props: EditorProps) {
    const {contentId, type, contentData, onCreate, onUpdate, onDelete} = props

    function renderContentEditor(type: ContentType, content: ContentProps): ReactNode {
        switch(type) {
            case ContentType.Paragraph: {
                const paraProps = content as ParagraphProps
                return (<ParagraphEditor content={paraProps.content} onContentChange={(newProps: ContentProps) => onUpdate(contentId, type, newProps, false)}/>)
            }
            case ContentType.Header: {
                const headerProps = content as HeaderProps
                return (<HeaderEditor level={headerProps.level} title={headerProps.title} onContentChange={(newProps: ContentProps) => onUpdate(contentId, type, newProps, false)}/>)
            }
        }
    }
    let actionButtons: ReactNode
    if (contentId) {
        actionButtons = (
            <>
                <button type='button' onClick={e => onUpdate(contentId, type, contentData, true)} className='btn btn-info btn-xs sm:btn-sm md:btn-md lg:btn-lg col-span-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    Save {ContentType[type]}
                </button>
                <button type='button' onClick={e => onDelete(contentId)} className='btn btn-error col-span-6 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete {ContentType[type]}
                </button>
            </>
        )
    } else {
        actionButtons = (
            <button type='button' onClick={e => onCreate(type, contentData)} className='btn btn-success col-span-12 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new {ContentType[type]}
            </button>
        )
    }
    

    return (
        <>
            <div className='container mx-auto grid grid-cols-3 py-2'>
                <label className='font-bold'>Item ID</label>
                <label className='col-span-2 font-semibold text-sm'>
                    <a href={'#' + contentId} className="link">{contentId}</a>
                </label>
            </div>
            <div className='container mx-auto grid grid-cols-3'>
                <label className='font-bold'>Item Type</label> 
                <select value={type} onChange={e => onUpdate(contentId, getContentType(Number(e.target.value), ContentType.Header), contentData, false)} className='select select-bordered w-full col-span-2'>
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