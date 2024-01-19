import { clamp } from "@/common/number_functions";

export interface HeaderProps {
    level: number,
    title: string
}
export const defaultProps = { level: 1, title: ''}

const headingLevels = [1,2,3,4,5,6]

export function Header({ level = 1, title = ''}: HeaderProps) {
    level = clamp(level, 1, 6);
    switch (level) {
        case 1: return (<h1>{title}</h1>)
        case 2: return (<h2>{title}</h2>)
        case 3: return (<h3>{title}</h3>)
        case 4: return (<h4>{title}</h4>)
        case 5: return (<h5>{title}</h5>)
        case 6: return (<h6>{title}</h6>)
        default: {
            console.error(`Cannot parse heading level = ${level}`)
            throw new RangeError(`Cannot parse heading level = ${level}. Only heading 1-6 are allowed`)        
        }
    }
}

export function HeaderEditor(props: HeaderProps & { onContentChange: (content: HeaderProps) => void}) {
    const { level, title, onContentChange } = props
    return (
        <div>
            <label>Heading Level:&nbsp; 
                <select value={level} onChange={e => onContentChange({level: Number(e.target.value), title: title})}>
                    { headingLevels.map(x => (<option key={x} value={x}>{x}</option>)) }
                </select>
            </label>
            <br/>
            <label>
                Heading Title: <input type="text" value={title} onChange={e => onContentChange({level: level, title: e.target.value})}/>
            </label>
        </div>
    )
}