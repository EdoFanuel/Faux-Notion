import { HeaderProps } from "./header";
import { ParagraphProps } from "./paragraph";

export enum ContentType {
    Paragraph,
    Header
}

export function getContentType(ordinal: number | ContentType): ContentType {
    return ContentType[ContentType[ordinal]]
}

export type ContentProps = HeaderProps | ParagraphProps;
export type Content = { type: ContentType, content: ContentProps }
