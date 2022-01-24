/* eslint-disable react/react-in-jsx-scope */

import Text from './properties/Text'

export const templates = [
    {
        ifTemplate: {
            title: 'Condition',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        forTemplate: {
            title: 'Loop',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
                { component: <Text />, leftC: false, rightC: false },
            ],
        }
    },
    {
        classTemplate: {
            title: 'Class',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]

        }
    },
    {
        compareTemplate: {
            title: 'Comparison',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        setVariableTemplate: {
            title: 'Variable',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        httpReqTemplate: {
            title: 'HTTP Request',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        functionTemplate: {
            title: 'Function',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        textTemplate: {
            id: undefined,
            title: 'Text',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        eventTemplate: {
            title: 'Event',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        mediaTemplate: {
            title: 'Media',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        tweenTemplate: {
            title: 'Tween',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
    {
        containerTemplate: {
            title: 'Container',
            properties: [
                { component: <Text />, leftC: false, rightC: false },
            ]
        }
    },
]