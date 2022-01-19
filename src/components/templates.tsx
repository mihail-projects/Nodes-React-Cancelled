/* eslint-disable @typescript-eslint/ban-types */

export interface menuProps {
    show: boolean
    xPos: number
    yPos: number
    add: Function
}

export interface coordinates {
    x1: number | undefined
    y1: number | undefined
    x2: number | undefined
    y2: number | undefined
}

export interface nodeProps {
    id: number
    title: string
    posX: number
    posY: number
    properties: {
        name: string
        leftC: boolean
        rightC: boolean
    }[]
    select: Function
    addLine: Function
    connect: Function
}

export const templates = [
    {
        ifTemplate: {
            title: 'Condition',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        forTemplate: {
            title: 'Loop',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ],
        }
    },
    {
        classTemplate: {
            title: 'Class',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]

        }
    },
    {
        compareTemplate: {
            title: 'Comparison',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        setVariableTemplate: {
            title: 'Variable',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        httpReqTemplate: {
            title: 'HTTP Request',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        functionTemplate: {
            title: 'Function',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        textTemplate: {
            title: 'Text',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        eventTemplate: {
            title: 'Event',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        mediaTemplate: {
            title: 'Media',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        tweenTemplate: {
            title: 'Tween',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
    {
        containerTemplate: {
            title: 'Container',
            properties: [
                { name: 'wtv', leftC: false, rightC: false },
            ]
        }
    },
]