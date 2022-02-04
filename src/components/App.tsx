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
import useMobileDetect from './Hooks/DetectDevice';
import Alert from '@mui/material/Alert'
import useCookies from 'react-cookie/es6/useCookies'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'

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
type AlertSeverity = 'error' | 'success' | 'info' | 'warning' | undefined;


function App() {

  const detectDevice = useMobileDetect()
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const [pan, setPan] = useState(false)

  const [mouseIn, setMouseIn] = useState<boolean>(true)
  const [mousePos, setmousePos] = useState<number[]>([])
  const [show, setShow] = useState(false)
  const [acceleration, setAcceleration] = useState<number[]>([-vw(200) / 2, -vh(200) / 2])

  const [nodesProps, setNodesProps] = useState<NodePropsNoSetters[]>([])
  const [selected, setSelected] = useState(-1)

  const [connections, setConnections] = useState<string[][]>([])
  const [draggingID, setDraggingID] = useState('')

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  const panSpeed = 10

  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertLink, setAlertLink] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverity>('info')


  useEffect(() => {
    showAlert(`Welcome to Node! I will be guiding you through your first building experience :)`, '', 'info')
  }, [])

  useEffect(() => {

    document.documentElement.addEventListener('mouseleave', () => setMouseIn(false))
    document.documentElement.addEventListener('mouseenter', () => setMouseIn(true))

    return () => {
      document.documentElement.removeEventListener('mouseleave', () => setMouseIn(false))
      document.documentElement.removeEventListener('mouseenter', () => setMouseIn(true))
    }

  }, [mousePos])

  function showAlert(message: string, link: string, severity: AlertSeverity) {
    setAlertText(message)
    setAlertLink(link)
    setAlertSeverity(severity)
    setAlert(true)
  }

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

    if (draggingID !== '' || !mouseIn) return

    if (e.key === 'Control') {
      if (mousePos[0] < getPercent(20, width)) {
        setAcceleration([acceleration[0] + panSpeed, acceleration[1]])
      } else if (mousePos[0] > width - getPercent(20, width)) {
        setAcceleration([acceleration[0] - panSpeed, acceleration[1]])
      } else if (mousePos[1] < getPercent(20, height)) {
        setAcceleration([acceleration[0], acceleration[1] + panSpeed])
      } else if (mousePos[1] > height - getPercent(20, height)) {
        setAcceleration([acceleration[0], acceleration[1] - panSpeed])
      }
    }

  }

  function keyUp(e: KeyboardEvent<HTMLDivElement>) {

    if (draggingID !== '' || !mouseIn) return

    if (e.key === 'Delete' && selected !== -1) {
      setNodesProps(nodesProps.filter(prop => prop.id !== selected))
    } else if (e.key === 'Control') {
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
    if (!mouseIn) return
    e.preventDefault()
    draggingID == '' ? setShow(true) : disconnect()
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

    if (draggingID == '') return

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
          top: setPosition(acceleration)[1],
          left: setPosition(acceleration)[0],
          width: '200vw',
          height: '200vh',
          /*backgroundImage: 'url(' + require('../bg.png') + ')',
          backgroundRepeat: 'repeat',
          backgroundSize: '2vw'*/
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
            acceleration={acceleration}
            select={setSelected}
            newLine={newLine}
            connect={connect}
            {...nodeProps}
          />
        ))}

      </div>

      <ContextMenu show={show} mousePos={mousePos} add={newNode} />
      <TopBar projectName='Project Name' />
      {alert ? <Alert
        sx={{ position: 'absolute', top: '95px', left: '10px', userSelect: 'none' }}
        onClose={() => setAlert(false)}
        severity={alertSeverity}>
        <Typography variant='subtitle1'>{alertText}</Typography>
        {alertLink != '' ? <Link variant='subtitle1' href={alertLink}>Docs</Link> : null}
      </Alert> : null}

    </>
  )
}

function setPosition(acc: number[]) {

  const newAcc = []

  if (acc[1] < -vh(200) / 2) {
    newAcc[1] = -vh(200) / 2
  } else if (acc[1] > 0) {
    acc[1] = 0
  } else {
    newAcc[1] = acc[1]
  }

  if (acc[0] < -vw(200) / 2) {
    newAcc[0] = -vh(200) / 2
  } else if (acc[0] > 0) {
    acc[0] = 0
  } else {
    newAcc[0] = acc[0]
  }

  return newAcc

}

function getPercent(percent: number, value: number) {
  return (percent * value) / 100
}

function vh(v: number) {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v: number) {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

export default App