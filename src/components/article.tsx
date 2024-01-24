'use client'

import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable as DefaultDroppable, DroppableProps } from "react-beautiful-dnd";
import { Content, ContentProps, ContentType, convertType } from "../common/props";
import { generateUUID } from "@/common/common_functions";
import { ContentWrapper } from "./content_wrapper";
import Editor from "./editor";
import DebugWindow from "./debug_window";

export const Droppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);
    if (!enabled) {
      return null;
    }
    return <DefaultDroppable {...props}>{children}</DefaultDroppable>;
  };
  

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

    function moveContent(source: number, destination: number) {
        if (destination < 0) {
            return
        }
        const newOrder = [...contentOrder]
        const [removed] = newOrder.splice(source, 1)
        newOrder.splice(destination, 0, removed)
        setContentOrder(newOrder)
    }

    function resetEditor() {
        setSelectedId(undefined)
        setSelectedType(ContentType.Header)
        setSelectedContent(convertType(ContentType.Unknown))
    }

    const renderedContent = contentOrder.map((id, idx) => {
        const content = contents[id]
        return  (
            <Draggable key={id} draggableId={id} index={idx}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <ContentWrapper id={id} content={content} isSelected={id === selectedId} onEdit={editContent} onDelete={deleteContent}/>
                    </div>
                )}
            </Draggable>
        )
    })
    return (    
        <div className="container mx-auto grid grid-cols-6 gap-4 px-1">
            <div className="col-span-2 h-screen sticky top-0 mx-0 bg-gray-800 px-4">
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
                <DragDropContext onDragEnd={(result, provided) => moveContent(result.source.index, result.destination?.index ?? -1)}>
                    <Droppable droppableId="article-content">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                {renderedContent}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}