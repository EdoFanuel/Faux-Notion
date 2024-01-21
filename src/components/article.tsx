'use client'

import { useState } from "react";
import Editor from "./editor";
import { defaultProps as headerProps } from "./header";
import { defaultProps as paragraphProps } from "./paragraph";
import { Content, ContentProps, ContentType } from "../common/component_type";
import { generateUUID } from "@/common/common_functions";
import { ContentWrapper } from "./content_wrapper";
import DebugWindow from "./debug_window";

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
        if (selectedId && selectedId in contents) {
            contents[selectedId] = { type: newType, content}
            setContents(contents)
        }
    }

    function handleContentChange(content: ContentProps) {
        console.log(`change content to = ${JSON.stringify(content)}`)
        setSelectedContent(content)
        if (selectedId && selectedId in contents) {
            contents[selectedId].content = content
            setContents(contents)
        }
    }

    function editContent(id: string) {
        console.log(`Editing content ID = ${id}}`)
        setSelectedId(id)
        setSelectedType(contents[id].type)
        setSelectedContent(contents[id].content)
    }

    function createContent(type: ContentType, content: ContentProps) {
        console.log(`Creating new content for type=${ContentType[type]}, content=${JSON.stringify(content)}`)
        const id = generateUUID()
        setContentOrder([...contentOrder, id])

        const newContents = {...contents}
        newContents[id] = {type, content}
        setContents(newContents)

        resetEditor()
    }

    function deleteContent(id: string) {
        console.log(`Deleting content ID = ${id}`)
        setContentOrder(contentOrder.filter(x => x != id))
        
        const newContents = {...contents}
        delete newContents[id]
        setContents(newContents)

        if (id == selectedId) resetEditor()
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
        <div className="container mx-auto px-4 grid grid-cols-6 gap-4">
            <div className="col-span-2">
                <Editor
                    type={selectedType} 
                    contentId={selectedId}
                    contentData={selectedContent}
                    onTypeChange={handleTypeChange} 
                    onContentChange={handleContentChange}
                    onCreate={createContent}
                />
                <DebugWindow 
                    type={selectedType} 
                    contentId={selectedId} 
                    contentData={selectedContent}
                />                
            </div>
            <div className="col-span-4">
                {renderedContent}
            </div>
        </div>
    )
}