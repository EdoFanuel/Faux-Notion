export interface ParagraphProps { 
    content: string 
}

export const defaultProps = { content: ''}

export function Paragraph({ content  = ''}: ParagraphProps) {
    return <p>{content}</p>
}

export function ParagraphEditor(props: ParagraphProps & { onContentChange: (content: ParagraphProps) => void }) {
    const { content, onContentChange } = props
    return (
        <div>
            <label>
                Paragraph Content: <input type='textarea' value={content} onChange={e => onContentChange({content: e.target.value})}/>
            </label>
        </div>
    )
}