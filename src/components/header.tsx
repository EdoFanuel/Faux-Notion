import { clamp } from "@/common/common_functions";
import { HeaderProps } from "@/common/props";


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
        <>
            <label className='font-bold col-span-4'>Level</label>
            <div className='col-span-8'>
                <input 
                    type='range'
                    min={1}
                    max={6}
                    className='range input-bordered' 
                    value={level} 
                    onChange={e => onContentChange({level: Number(e.target.value), title: title})}
                />
                <div className='w-full flex justify-between text-xs px-2'>
                    { [1, 2, 3, 4, 5, 6].map(level => (<span key={level}>{level}</span>)) }
                </div>
            </div>

            <label className='font-bold col-span-4'>Title</label> 
            <input className='col-span-8 input input-bordered' type="text" value={title} onChange={e => onContentChange({level: level, title: e.target.value})}/>
        </>
    )
}