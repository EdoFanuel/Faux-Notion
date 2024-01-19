'use client'

import { useState } from "react";
import Editor from "./editor";
import { Header, defaultProps as headerProps } from "./header";
import { Paragraph, defaultProps as paragraphProps } from "./paragraph";
import { ContentProps, ContentType } from "./component_type";

export default function Article() {
    const [selectedType, setSelectedType] = useState(ContentType.Header)
    let [selectedContent, setSelectedContent] = useState<ContentProps>(headerProps)

    function handleTypeChange(newType: ContentType) {
        console.log(`change type to = ${ContentType[newType]}`)
        setSelectedType(newType)
        switch(newType) {
            case ContentType.Header: setSelectedContent(headerProps); break;
            case ContentType.Paragraph: setSelectedContent(paragraphProps); break;
        }
    }

    function handleContentChange(content: ContentProps) {
        console.log(JSON.stringify(content))
        setSelectedContent(content)
    }

    return (    
        <div>
            <Editor 
                type={selectedType} 
                contentId={undefined}
                contentData={selectedContent}
                onTypeChange={handleTypeChange} 
                onContentChange={handleContentChange}
            />
            <hr/>
            <ul title="Debug">
                <li>Selected type: {selectedType} / {ContentType[selectedType]}</li>
                <li>Selected content: {JSON.stringify(selectedContent)}</li>
            </ul>
            <hr/>
            <Header title='Hello World' level={0}/>
            <Paragraph content='lorem ipsum'></Paragraph>
        </div>
    )
}