import { ContentType, ContentProps } from "@/common/component_type";

type DebugProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
}

export default function DebugWindow(props: DebugProps) {
    const { contentId, type, contentData } = props
    return (
        <>
            <button
                type="button"
                className="hs-collapse-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-collapse='#debug-menu'
            >
                Debug
                <svg
                    className="hs-collapse-open:rotate-180 flex-shrink-0 w-4 h-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div
                id='debug-menu'
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-100"
            >
                <div className="mt-5 text-gray-500 dark:text-gray-400">
                    <ul title="Debug">
                        <li>Selected ID: {contentId}</li>
                        <li>Selected type: {ContentType[type]}</li>
                        <li>Selected content: {JSON.stringify(contentData)}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}