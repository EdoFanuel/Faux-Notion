'use client'

import { useState } from "react";
import Editor from "./editor";
import { Content, ContentProps, ContentType, convertType } from "../common/props";
import { generateUUID } from "@/common/common_functions";
import { ContentWrapper } from "./content_wrapper";
import DebugWindow from "./debug_window";

export default function Article() {
    const [contents, setContents] = useState<Record<string, Content>>({})
    const [contentOrder, setContentOrder] = useState<string[]>([])
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [selectedType, setSelectedType] = useState(ContentType.Header)
    const [selectedContent, setSelectedContent] = useState<ContentProps>(convertType(ContentType.Unknown))

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

    function updateContent(id: string | undefined, newType: ContentType, newContent: ContentProps, shouldReset: boolean) {
        console.log(`Update content ID = ${id}`)        
        let content = newContent;
        if (newType != selectedType) {
            content = convertType(newType, {type: selectedType, content: selectedContent})
            setSelectedType(newType)
        }
        setSelectedContent(content)
        console.log({
            beforeType: ContentType[selectedType], 
            beforeContent: selectedContent, 
            afterType: ContentType[newType],
            afterContent: content
        })


        if (id && id in contents) {
            contents[id] = { type: newType, content: content }
            setContents(contents)
        }
        //TODO: call API to save data on backend
        if (shouldReset) {
            resetEditor()
        }
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
        setSelectedContent(convertType(ContentType.Unknown))
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
                    onCreate={createContent}
                    onUpdate={updateContent}
                    onDelete={deleteContent}
                />
                <span className='divider'/>
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