import { Content, ContentType } from "../common/component_type"
import { Header, HeaderProps } from "./header"
import { Paragraph, ParagraphProps } from "./paragraph"

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
        <div id={id} className=' grid grid-cols-12'>
            <button type='button' className='btn col-span-1'>Move</button>
            <span className='col-span-9 px-4 py-2'>{contentComponent}</span>
            <button type='button' onClick={e => onEdit(id)} className='btn col-span-1'>Edit</button>
            <button type='button' onClick={e => onDelete(id)} className='btn col-span-1'>Delete</button>
        </div>
    )
}