export type HeaderProps = {
    level: number,
    title: string
}

export type ParagraphProps = { 
    content: string 
}

export type DebugProps = {
    contentId ?: string,
    type: ContentType,
    contentData: ContentProps,
}

export enum ContentType {
    Paragraph,
    Header
}
export type ContentProps = HeaderProps | ParagraphProps;
export type Content = { type: ContentType, content: ContentProps }

export const defaultHeaderProps = { level: 1, title: ''}
export const defaultParagraphProps = { content: ''}

export function getContentType(ordinal: number | ContentType, defaultType?: ContentType): ContentType {
    return ContentType[ContentType[ordinal]] ?? defaultType
}

function convertToParagraph(content: Content): ParagraphProps {
    switch(content.type) {
        case ContentType.Paragraph: return content.content as ParagraphProps
        case ContentType.Header: {
            const header = content.content as HeaderProps
            return { content: header.title } as ParagraphProps
        }
    }
}

function convertToHeader(content: Content): HeaderProps {
    switch(content.type) {
        case ContentType.Paragraph: {
            const paragraph = content.content as ParagraphProps
            return {level: defaultHeaderProps.level, title: paragraph.content}
        }
        case ContentType.Header: return content.content as HeaderProps
    }
}

export function convertType(newType: ContentType, oldContent: Content): ContentProps {
    switch(newType) {
        case ContentType.Paragraph: return convertToParagraph(oldContent)
        case ContentType.Header: return convertToHeader(oldContent)
    }
}

