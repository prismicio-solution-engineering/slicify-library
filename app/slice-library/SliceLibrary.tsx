import React from "react";
import { SliceZone } from "@prismicio/react";
import { SharedSlice } from "@prismicio/types-internal/lib/customtypes";
import { SharedSliceContent } from "@prismicio/types-internal/lib/content";
import { SharedSlice as APISharedSlice, AnyRegularField, RTNode } from "@prismicio/client";

//Configure the list of slice components here by importing all your slice libraries
// Default is 
// import { components as __allComponents } from '@/slices/index'
import { components as ecommerceComponents } from '@/slices/blog/index'
import { components as marketingComponents } from '@/slices/marketing/index'
const __allComponents = { ...ecommerceComponents, ...marketingComponents }

// import Nav which is a client component using @headlessui/react
import SliceLibraryNav from "./SliceLibraryNav";

export function SliceLibrary({
    libraries
}: {
    libraries: { slices: SharedSlice[], name: string, mocks: SharedSliceContent[][] }[]
}) {

    return (
        <>
            <div>
                {/* Static sidebar for desktop */}
                <SliceLibraryNav libraries={libraries} />
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                        <div className="m-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Explore your Slice Libraries</h1>
                        </div>
                    </div>
                    <main>
                        <div className="mx-auto max-w-7xl px-4">
                            {libraries.map((library, index) => {
                                return (
                                    library.slices.map((slice, sliceIndex) => {
                                        return (
                                            slice.variations.map((variation) => {
                                                const type = slice.id;

                                                const key =
                                                    "slice_type" in slice && slice.slice_type
                                                        ? `${index}-${slice.slice_type}-${variation.id}`
                                                        : `${index}-${JSON.stringify(slice)}-${JSON.stringify(slice)}`;

                                                const mock = library.mocks[sliceIndex].find(mock => mock.variation === variation.id)
                                                const mockApi = mapEditorToAPIFormat(mock, type)

                                                return (
                                                    <div className="py-20" id={slice.id + "__" + variation.id} key={key}>
                                                        <div className="border-b border-gray-200 pb-5 mb-5">
                                                            <h3 className="text-lg font-medium leading-6 text-gray-900">{slice.name}</h3>
                                                            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                                                                {variation.name}
                                                            </p>
                                                        </div>
                                                        <div className="isolate bg-white rounded-md">
                                                            <SliceZone slices={[mockApi]} components={__allComponents} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    })
                                );
                            })}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

//Below is the logic to transform mocks into API format, could be improved to use Prismic Internal Types.
function mapEditorToAPIFormat(mock: SharedSliceContent | undefined, slice_type: string): APISharedSlice {
    return (
        {
            id: slice_type,
            slice_type: slice_type,
            slice_label: null,
            version: "",
            variation: mock?.variation || "default",
            primary: Object.fromEntries(
                Object.entries(mock?.primary || {}).map(([key, value]) => [key, transformContent(value)])
            ),
            items: mock?.items.map((item) => {
                const itemData: ItemValueType = {};
                item.value.forEach((groupItem) => {
                    itemData[groupItem[0]] = transformContent(groupItem[1]);
                });
                return itemData;
            }) || []
        }
    )
}

type ItemValueType = {
    [key: string]: AnyRegularField | null;
};

type ContentType = {
    __TYPE__: string;
    [key: string]: any;
};

type ImageContent = {
    origin: {
        id: string;
        url: string;
        width: number,
        height: number
    };
    url: string;
    width: number;
    height: number;
    edit?: {
        background: string,
        zoom: number,
        crop: {
            x: number,
            y: number
        }
    };
    credits?: string | null;
    alt?: string | null;
    __TYPE__: string;
    thumbnails: any;
};

type StructuredTextContent = {
    __TYPE__: string;
    value: Array<{
        type: string;
        content?: {
            text: string;
            spans?: Array<{
                type: string;
                start: number;
                end: number;
                data?: any;
            }>;
        };
        data?: any;
        direction?: string;
    }>;
};

type EmbedContent = {
    __TYPE__: string;
    embed_url: string;
    author_name: string;
    author_url: string;
    html: string;
    type: string;
    cache_age: string;
    provider_name: string;
    provider_url: string;
    version: string;
    width?: number;
    height?: number;
};

type LinkContent = {
    __TYPE__: string;
    value: {
        id?: string;
        __TYPE__: string;
        url: string;
        name?: string;
        kind?: string;
        size?: string;
        height?: string | null;
        width?: string | null;
    };
};

type FieldContent = {
    __TYPE__: string;
    value: string;
    type: string;
};

type BooleanContent = {
    __TYPE__: string;
    value: boolean;
};

function transformContent(content: ContentType): AnyRegularField | null {
    switch (content.__TYPE__) {
        case 'ImageContent':
            const imageContent = content as ImageContent;
            return {
                type: 'image',
                url: imageContent.url,
                alt: imageContent.alt || 'mockAlt',
                dimensions: {
                    width: imageContent.width,
                    height: imageContent.height
                }
            };
        case 'StructuredTextContent':
            const structuredContent = content as StructuredTextContent;
            return structuredContent.value.map((textNode) => {
                if (textNode.type === 'image') {
                    // Handle image nodes
                    return {
                        type: 'image',
                        url: textNode.data.url,
                        alt: textNode.data.alt,
                        copyright: null,
                        dimensions: {
                            width: textNode.data.width,
                            height: textNode.data.height
                        },
                        id: textNode.data.id,
                        edit: {
                            x: textNode.data.x,
                            y: textNode.data.y,
                            zoom: textNode.data.zoom,
                            background: textNode.data.background
                        }
                    }
                } else {
                    const { type, content: textContent, direction } = textNode;
                    const spansTransformed = textContent!.spans?.map(span => {
                        switch (span.type) {
                            case 'hyperlink':
                                if (span.data.__TYPE__ === 'ExternalLink') {
                                    return {
                                        type: 'hyperlink',
                                        start: span.start,
                                        end: span.end,
                                        data: {
                                            link_type: "Web",
                                            url: span.data.url,
                                            target: span.data.target
                                        }
                                    };
                                } else if (span.data.__TYPE__ === 'ImageLink') {
                                    return {
                                        type: 'hyperlink',
                                        start: span.start,
                                        end: span.end,
                                        data: {
                                            link_type: "Media",
                                            url: span.data.url,
                                            id: span.data.id,
                                            name: span.data.name,
                                            kind: "image",
                                            size: span.data.size,
                                            height: span.data.height,
                                            width: span.data.width
                                        }
                                    };
                                }
                                break;
                            default:
                                return span;
                        }
                    }) || [];

                    return {
                        type: type,
                        text: textContent!.text,
                        spans: spansTransformed || [],
                        direction: direction
                    };
                }
            }) as [RTNode, ...RTNode[]];
        case 'EmbedContent':
            const embedContent = content as EmbedContent;
            return {
                type: 'embed',
                embed_url: embedContent.embed_url,
                html: embedContent.html,
                oembed: {
                    author_name: embedContent.author_name,
                    author_url: embedContent.author_url,
                    provider_name: embedContent.provider_name,
                    provider_url: embedContent.provider_url,
                    cache_age: embedContent.cache_age,
                    width: embedContent.width || null,
                    height: embedContent.height || null,
                    version: embedContent.version
                }
            };
        case 'LinkContent':
            const linkContent = content as LinkContent;
            if (linkContent.value.__TYPE__ === "ExternalLink") {
                return {
                    link_type: "Web",
                    url: linkContent.value.url,
                    target: "_blank"
                };
            }
            else if (linkContent.value.__TYPE__ === "DocumentLink") {
                return {
                    "link_type": "Document"
                }
            }
            else if (linkContent.value.__TYPE__ === "FileLink") {
                return {
                    id: linkContent.value.id,
                    "link_type": "Media",
                    name: linkContent.value.name,
                    kind: linkContent.value.kind,
                    url: linkContent.value.url,
                    size: linkContent.value.size,
                    height: linkContent.value.height!,
                    width: linkContent.value.width!
                }
            }
        case 'FieldContent':
            const fieldContent = content as FieldContent;
            return fieldContent.value;
        case 'IntegrationFieldsContent':
            return {}
        case 'BooleanContent':
            const booleanContent = content as BooleanContent;
            return booleanContent.value;
        default:
            return null;
    }
}