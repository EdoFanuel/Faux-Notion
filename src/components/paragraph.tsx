import { ParagraphProps } from "@/common/props"

export function Paragraph({ content  = ''}: ParagraphProps) {
    return <p>{content}</p>
}

export function ParagraphEditor(props: ParagraphProps & { onContentChange: (content: ParagraphProps) => void }) {
    const { content, onContentChange } = props
    return (
        <>
            <label className='col-span-4 font-bold'>Content</label>
            <textarea className='col-span-8 textarea textarea-bordered' placeholder='Content' value={content} onChange={e => onContentChange({content: e.target.value})}/>
        </>
    )
}