/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/react-in-jsx-scope */
import '../Styles/Node.css'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import Draggable from './Draggable'
import { Component, useState } from 'react'

type NodeProps = {
    id: number
    title: string
    mousePos: number[]
    acceleration: number[]
    properties: {
        component: Component
        leftC: boolean
        rightC: boolean
        topCode: string
        bottomCode: string
    }[]
    select: Function
    newLine: Function
    connect: Function
}

function Node(props: NodeProps) {

    const theme = useTheme();
    const [drag, setDrag] = useState(false)

    return (

        <Draggable drag={drag} mousePos={props.mousePos} acceleration={props.acceleration}>

            <Paper id='node' onMouseOver={() => props.select(props.id)} onMouseOut={() => props.select(-1)}>

                <Typography id='title' variant="subtitle1" color='text.primary' onMouseDown={() => setDrag(true)} onMouseUp={() => setDrag(false)}>{props.title}</Typography>

                {props.properties.map((element, index) => (

                    <div id='property' key={index}>

                        <div
                            id={props.id + '-' + (index * 2).toString()}
                            className='connector'
                            onClick={() => props.connect(props.id + '-' + (index * 2).toString())}
                            style={{
                                left: '-20px',
                                border: element.leftC ? '2px solid ' + theme.palette.primary.main : '2px solid ' + theme.palette.secondary.main,
                                backgroundColor: element.leftC ? theme.palette.primary.dark : theme.palette.secondary.dark
                            }}
                        />

                        {element.component}

                        <div
                            id={props.id + '-' + (index * 2 + 1).toString()}
                            className='connector'
                            onClick={() => props.newLine(props.id + '-' + (index * 2 + 1).toString())}
                            style={{
                                right: '-20px',
                                border: element.rightC ? '2px solid ' + theme.palette.primary.main : '2px solid ' + theme.palette.secondary.main,
                                backgroundColor: element.rightC ? theme.palette.primary.dark : theme.palette.secondary.dark
                            }}
                        />

                    </div>


                ))}

            </Paper>

        </Draggable >

    )

}

export default Node
