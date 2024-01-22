import { ContentType, ContentProps } from "@/common/component_type";

type DebugProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
}

export default function DebugWindow(props: DebugProps) {
    const { contentId, type, contentData } = props
    return (
        <details className='collapse collapse-arrow border'>
            <summary className='collapse-title font-medium'>Debug</summary>
            <ul title="Debug" className='collapse-content'>
                <li>Selected ID: {contentId}</li>
                <li>Selected type: {ContentType[type]}</li>
                <li>Selected content: {JSON.stringify(contentData)}</li>
            </ul>
        </details>
    )
}