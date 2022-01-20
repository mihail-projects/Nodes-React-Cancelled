/* eslint-disable react/react-in-jsx-scope */
import '../Styles/Node.css'
import '../Styles/Fonts.css'
import Draggable from 'react-draggable'
import { nodeProps } from './templates'
import { Divider, Paper, Typography, useTheme } from '@mui/material'

function Node(props: nodeProps) {

    const theme = useTheme();

    return (

        <Draggable handle='.handle' defaultPosition={{ x: props.posX, y: props.posY }}>

            <Paper id='node' onMouseOver={() => props.select(props.id)} onMouseOut={() => props.select(-1)}>

                <Typography id='title' className='handle' variant="subtitle1" color='text.primary'>{props.title}</Typography>
                <Divider />

                {props.properties.map((element: { name: string, leftC: boolean, rightC: boolean }, index: number) => {

                    return (

                        <div key={index} id='property'>

                            <Typography color='text.secondary' style={index == 0 ? { paddingTop: '5px' } : {}}>{element.name}</Typography>

                            <div
                                id={(index * 2).toString()}
                                className='connector'
                                onMouseUp={() => props.connect((index * 2).toString())}
                                style={{
                                    top: (index * 20 + 45) + 'px', left: '-20px',
                                    border: element.rightC ? '2px solid ' + theme.palette.primary.main : '2px solid ' + theme.palette.secondary.main,
                                    backgroundColor: element.rightC ? theme.palette.primary.dark : theme.palette.secondary.dark
                                }}
                            />

                            <div
                                id={(index * 2 + 1).toString()}
                                className='connector'
                                onMouseDown={() => props.addLine((index * 2 + 1).toString())}
                                style={{
                                    top: (index * 20 + 45) + 'px', right: '-20px',
                                    border: element.rightC ? '2px solid ' + theme.palette.primary.main : '2px solid ' + theme.palette.secondary.main,
                                    backgroundColor: element.rightC ? theme.palette.primary.dark : theme.palette.secondary.dark
                                }}
                            />

                        </div>

                    )

                })}

            </Paper>

        </Draggable >

    )

}

export default Node
