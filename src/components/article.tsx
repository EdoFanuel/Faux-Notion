'use client'

import { useState } from "react";
import Editor from "./editor";
import { defaultProps as headerProps } from "./header";
import { defaultProps as paragraphProps } from "./paragraph";
import { Content, ContentProps, ContentType } from "./component_type";
import { generateUUID } from "@/common/common_functions";
import { ContentWrapper } from "./content_wrapper";

export default function Article() {
    const [contents, setContents] = useState<Record<string, Content>>({})
    const [contentOrder, setContentOrder] = useState<string[]>([])
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [selectedType, setSelectedType] = useState(ContentType.Header)
    const [selectedContent, setSelectedContent] = useState<ContentProps>(headerProps)

    function handleTypeChange(newType: ContentType) {
        console.log(`change type to = ${ContentType[newType]}`)
        let content: ContentProps;
        switch(newType) {
            case ContentType.Header: 
                content = headerProps
                break
            case ContentType.Paragraph: 
                content = paragraphProps
                break
        }
        
        setSelectedType(newType)
        setSelectedContent(content)
        if (selectedId) {
            contents[selectedId] = { type: newType, content}
            setContents(contents)
        }
    }

    function handleContentChange(content: ContentProps) {
        console.log(`change content to = ${JSON.stringify(content)}`)
        setSelectedContent(content)
        if (selectedId) {
            contents[selectedId].content = content
            setContents(contents)
        }
    }

    function editContent(id: string) {
        setSelectedId(id)
        setSelectedType(contents[id].type)
        setSelectedContent(contents[id].content)
    }

    function createContent(type: ContentType, content: ContentProps) {
        const id = generateUUID()
        setContentOrder([...contentOrder, id])

        const newContents = {...contents}
        newContents[id] = {type, content}
        setContents(newContents)

        resetEditor()
    }

    function deleteContent(id: string) {
        const contentIdx = contentOrder.indexOf(id)
        if (contentIdx > -1) {
            setContentOrder(contentOrder.splice(contentIdx, 1))
        }
        
        const newContents = {...contents}
        delete newContents[id]
        setContents(newContents)
    }

    function resetEditor() {
        setSelectedId(undefined)
        setSelectedType(ContentType.Header)
        setSelectedContent(headerProps)
    }

    const renderedContent = contentOrder.map(id => {
        const content = contents[id]
        return <ContentWrapper key={id} id={id} content={content} onEdit={editContent} onDelete={deleteContent}/>
    })
    return (    
        <div>
            <Editor 
                type={selectedType} 
                contentId={selectedId}
                contentData={selectedContent}
                onTypeChange={handleTypeChange} 
                onContentChange={handleContentChange}
                onCreate={createContent}
            />
            <hr/>
            <ul title="Debug">
                <li>Selected ID: {selectedId}</li>
                <li>Selected type: {ContentType[selectedType]}</li>
                <li>Selected content: {JSON.stringify(selectedContent)}</li>
            </ul>
            <hr/>
            {renderedContent}
        </div>
    )
}