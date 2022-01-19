/* eslint-disable react/react-in-jsx-scope */
import '../Styles/Node.css'
import '../Styles/Fonts.css'
import Draggable from 'react-draggable'
import { nodeProps } from './templates'

function Node(props: nodeProps) {

    return (

        <Draggable handle='.handle' defaultPosition={{ x: props.posX, y: props.posY }}>

            <div id='node' onMouseOver={() => props.select(props.id)} onMouseOut={() => props.select(-1)}>

                <div id='title' className='handle'>{props.title}</div>

                {props.properties.map((element: { name: string, leftC: boolean, rightC: boolean }, index: number) => {

                    return (<>

                        <div id='property' style={{ paddingTop: (index + (index === 0 ? 5 : 0)) + 'px' }}>{element.name}</div>

                        <div
                            id={(index * 2).toString()}
                            className='connector'
                            onMouseUp={() => props.connect((index * 2).toString())}
                            style={{ backgroundColor: element.leftC ? '#35363a30' : '#323232', bottom: (index * 20 + 13) + 'px', left: '-6px' }}
                        />

                        <div
                            id={(index * 2 + 1).toString()}
                            className='connector'
                            onMouseDown={() => props.addLine((index * 2 + 1).toString())}
                            style={{ backgroundColor: element.rightC ? '#d3d3d330' : '#323232', bottom: (index * 20 + 13) + 'px', right: '-7px' }}
                        />

                    </>)

                })}

            </div>

        </Draggable>

    )

}

export default Node
