/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import '../Styles/App.css'
import React, { useEffect, useState, MouseEvent, KeyboardEvent, Component } from 'react'
import useWindowDimensions from './Hooks/Dimensions'
import TopBar from './TopBar'
import ContextMenu from './ContextMenu'
import Line from './Line'
import Node from './Node'
import useTheme from '@mui/material/styles/useTheme'
import produce from 'immer'

type NodeProps = {
  id: number
  title: string
  mousePos: number[]
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

type NodePropsNoSetters = Omit<NodeProps, 'mousePos' | 'select' | 'newLine' | 'connect'>

function App() {

  const [pan, setPan] = useState(false)

  const [mousePos, setmousePos] = useState<number[]>([])
  const [show, setShow] = useState(false)
  const [acceleration, setAcceleration] = useState<number[]>([0, 0])

  const [nodesProps, setNodesProps] = useState<NodePropsNoSetters[]>([])
  const [selected, setSelected] = useState(-1)

  const [connections, setConnections] = useState<string[][]>([])
  const [draggingID, setDraggingID] = useState('')

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  const panSpeed = 2


  useEffect(() => {

    if (pan) {
      if (mousePos[0] < getPercent(30, width)) {
        setAcceleration([acceleration[0] - panSpeed, acceleration[1]])
      } else if (mousePos[0] > width - getPercent(30, width)) {
        setAcceleration([acceleration[0] + panSpeed, acceleration[1]])
      } else if (mousePos[1] < getPercent(30, height)) {
        setAcceleration([acceleration[0], acceleration[1] - panSpeed])
      } else if (mousePos[1] > height - getPercent(30, height)) {
        setAcceleration([acceleration[0], acceleration[1] + panSpeed])
      }
    }

  })

  function newNode(nodeProps: NodePropsNoSetters) {

    setShow(false)

    const props: NodePropsNoSetters = {
      id: Math.floor(Math.random() * 1000),
      title: nodeProps.title,
      properties: nodeProps.properties,
    }

    setNodesProps([...nodesProps, props])

  }

  function keyDown(e: KeyboardEvent<HTMLDivElement>) {

    if (draggingID !== '') return

    if (e.key === 'Shift') {
      setPan(true)
    }

  }

  function keyUp(e: KeyboardEvent<HTMLDivElement>) {

    if (draggingID !== '') return

    if (e.key === 'Delete' && selected !== -1) {
      setNodesProps(nodesProps.filter(prop => prop.id !== selected))
    } else if (e.key === 'Shift') {
      setPan(false)
    }

  }

  function mousePosition(e: MouseEvent<HTMLDivElement>) {
    setmousePos([e.clientX, e.clientY])
  }

  function click() {
    setShow(false)
  }

  function rightClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    draggingID != '' ? disconnect() : setShow(true)
  }

  function newLine(id: string) {
    setDraggingID(id)
    setConnections([...connections, [id, '']])
  }

  function disconnect() {
    console.log('Disconnected')
    setDraggingID('')
    setConnections(connections.filter(conn => conn[1] != ''))
  }

  function connect(id: string) {

    console.log('Connected')
    setConnections(connections.map(([a, b]) => a != '' && b == '' ? [a, id] : [a, b]))

    setNodesProps(
      produce((draft) => {

        for (let i = 0; i < draft.length; i++) {
          for (let j = 0; j < draft[i].properties.length; j++) {

            if (draft[i].id == parseInt(draggingID.split('-')[0]) && (j * 2 == parseInt(draggingID.split('-')[1]) || j * 2 + 1 == parseInt(draggingID.split('-')[1]))) {
              draft[i].properties[j].rightC = true
            }
            if (draft[i].id == parseInt(id.split('-')[0]) && (j * 2 == parseInt(id.split('-')[1]) || j * 2 + 1 == parseInt(id.split('-')[1]))) {
              draft[i].properties[j].leftC = true
            }

          }
        }

      })
    )

    setDraggingID('')

  }

  return (
    <>

      <div

        id='bg'
        tabIndex={0}
        style={{
          position: 'absolute',
          top: acceleration[1],
          left: acceleration[0],
          /*border: '1px solid ' + theme.palette.primary.main,*/
          width: '100vw',
          height: '100vh',
        }}
        onMouseMove={mousePosition}
        onClick={click}
        onContextMenu={rightClick}
        onKeyUp={e => keyUp(e)}
        onKeyDown={e => keyDown(e)}>

        {connections.map((connection, index) => (
          <Line
            key={index}
            id1={connection[0]}
            id2={connection[1]}
            thickness={2}
            mousePos={mousePos}
            acceleration={acceleration}
          />
        ))}

        {nodesProps.map((nodeProps, index) => (
          <Node //always pass functions here to get the latest states
            key={index}
            mousePos={mousePos}
            select={setSelected}
            newLine={newLine}
            connect={connect}
            {...nodeProps}
          />
        ))}

      </div>

      <ContextMenu show={show} mousePos={mousePos} add={newNode} />
      <TopBar projectName='Project Name' />

    </>
  )
}

function getPercent(percent: number, value: number) {
  return (percent * value) / 100
}

export default App;