import { Content, ContentType } from "./component_type"
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
        <div id={id}>
            {contentComponent}
            <button onClick={e => onEdit(id)}>Edit</button>
            <button onClick={e => onDelete(id)}>Delete</button>
        </div>
    )
}