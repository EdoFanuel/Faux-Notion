import { clamp } from "@/common/number_functions";

export default function Header(props: { level: number, title: string}) {
    let {level, title} = props 
    const Tag = 'h' + clamp(level, 1, 6);
    return (<Tag>{title}</Tag>)
}