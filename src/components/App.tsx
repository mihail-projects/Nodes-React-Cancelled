/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import '../Styles/App.css'
import React, { useEffect, useState, MouseEvent, KeyboardEvent, Component } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
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

  const [panning, setPanning] = useState(false)
  const [wheel, setWheel] = useState(false)

  const [mousePos, setmousePos] = useState<number[]>([])
  const [show, setShow] = useState(false)

  const [nodesProps, setNodesProps] = useState<NodePropsNoSetters[]>([])
  const [selected, setSelected] = useState(-1)

  const [connections, setConnections] = useState<string[][]>([])
  const [draggingID, setDraggingID] = useState('')

  const theme = useTheme();


  useEffect(() => {
    //sql
  }, [])

  function newNode(nodeProps: NodePropsNoSetters) {

    setShow(false)

    const props: NodePropsNoSetters = {
      id: Math.floor(Math.random() * 1000),
      title: nodeProps.title,
      properties: nodeProps.properties,
    }

    setNodesProps([...nodesProps, props])

  }

  function removeNode(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Delete' && selected !== -1) {
      setNodesProps(nodesProps.filter(prop => prop.id !== selected))
    }
  }

  function mousePosition(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!show) {
      setmousePos([e.clientX, e.clientY])
    }
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
    setPanning(true)
    setWheel(true)
  }

  function disconnect() {
    console.log('Disconnected')
    setDraggingID('')
    setConnections(connections.filter(conn => conn[1] != ''))
    setPanning(false)
    setWheel(false)
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
    setPanning(false)
    setWheel(false)

  }

  return (
    <>
      {/*<TransformWrapper
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
        panning={{ activationKeys: ['Shift'], velocityDisabled: true, disabled: panning }}
        wheel={{ disabled: wheel }}
        initialPositionX={-1}
        initialPositionY={-1}
        limitToBounds={false}
        minScale={.5}
        maxScale={1.5}>

        <TransformComponent>*/}

      <div
        id='bg'
        tabIndex={0}
        style={{ /*border: '1px solid ' + theme.palette.primary.main, */width: '100vw', height: '100vh' }}
        onMouseMove={mousePosition}
        onClick={click}
        onContextMenu={rightClick}
        onKeyUp={e => removeNode(e)}>

        {connections.map((connection, index) => (
          <Line
            key={index}
            id1={connection[0]}
            id2={connection[1]}
            thickness={2}
            mousePos={mousePos}
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

      {/*</TransformComponent>

        </TransformWrapper>*/}

      <ContextMenu show={show} mousePos={mousePos} add={newNode} />
      <TopBar projectName='Project Name' />
    </>
  )
}

export default App;