import { Content, ContentType, HeaderProps, ParagraphProps } from "../common/props"
import { Header } from "./header"
import { Paragraph } from "./paragraph"

export type WrapperProps = {
    id: string
    content: Content
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export function ContentWrapper(props: WrapperProps) {
    const { id, content, onEdit, onDelete } = props
    let contentComponent: React.ReactNode
    if (!content) return (<></>)
    switch(content.type) {
        case ContentType.Header: 
            const headerProps = content.content as HeaderProps
            contentComponent = <Header level={headerProps.level} title={headerProps.title}/>
            break
        case ContentType.Paragraph:
            const paragraphProps = content.content as ParagraphProps
            contentComponent = <Paragraph content={paragraphProps.content}/>
            break
    } 
    return (
        <div id={id} className='mx-auto my-auto grid grid-cols-12'>
            <button type='button' className='btn col-span-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <span className='col-span-9 px-4 py-2'>{contentComponent}</span>
            <button type='button' onClick={e => onEdit(id)} className='btn btn-info col-span-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button type='button' onClick={e => onDelete(id)} className='btn btn-error col-span-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    )
}