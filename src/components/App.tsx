/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, MouseEvent, KeyboardEvent } from 'react'
import '../Styles/App.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Node from './Node'
import TopBar from './TopBar'
import ContextMenu from './ContextMenu'
import { nodeProps, coordinates } from './templates'
import Line from './Line'

function App() {

  const [panning, setPanning] = useState(false)
  const [wheel, setWheel] = useState(false)

  const [xPos, setxPos] = useState(0)
  const [yPos, setyPos] = useState(0)
  const [show, setShow] = useState(false)

  const [nodesProps, setNodesProps] = useState<nodeProps[]>([])
  const [selected, setSelected] = useState(-1)

  const [lines, setLines] = useState<coordinates[]>([])
  const [currentLine, setCurrentLine] = useState('')


  useEffect(() => {
    //sql
  }, [])

  const addNode = (nodeProps: nodeProps) => {
    nodeProps.id = Math.floor(Math.random() * 1000)
    nodeProps.posX = xPos
    nodeProps.posY = yPos
    nodeProps.select = setSelected
    nodeProps.addLine = addLine
    nodeProps.connect = connect
    setNodesProps([...nodesProps, nodeProps])
  }

  const removeNode = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Delete' && selected !== -1) {
      setNodesProps(nodesProps.filter(prop => prop.id !== selected))
    }
  }

  const mousePosition = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!show) {
      setxPos(e.clientX)
      setyPos(e.clientY)
    }
  }

  const click = () => {
    setShow(false)
  }

  const rightClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setShow(true)
  }

  const addLine = (id: string) => {

    setPanning(true)
    setWheel(true)

    setCurrentLine(id)

    const temp = lines

    temp.push({
      x1: Math.round(document.getElementById(id)!.getBoundingClientRect().left + 5),
      y1: Math.round(document.getElementById(id)!.getBoundingClientRect().top - 60),
      x2: -1,
      y2: -1
    })

    setLines(temp)

  }

  const removeLine = () => {
    const temp = lines
    temp.forEach((element, index) => { if (element.x1 == Math.round(document.getElementById(currentLine)!.getBoundingClientRect().left + 10)) temp.splice(index, 1) })
    setCurrentLine('')
    setPanning(false)
    setWheel(false)
  }

  const connect = () => {
    setPanning(false)
    setWheel(false)


    
  }

  return (

    <div id='bg' tabIndex={0} onMouseMove={mousePosition} onClick={click} onContextMenu={rightClick} onKeyUp={e => removeNode(e)} onMouseUp={removeLine}>

      <TransformWrapper
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
        panning={{ activationKeys: ['Shift'], velocityDisabled: true, disabled: panning }}
        wheel={{ disabled: wheel }}
        limitToBounds={false}
        minScale={.5}
        maxScale={1.5}
        centerOnInit={true}>

        <TransformComponent>
          <div id='bg'>
            {nodesProps.map(nodeProps => { return (<Node {...nodeProps} />) })}
            {lines.map(line => { return (<Line x1={line.x1 == -1 ? xPos : line.x1} y1={line.y1 == -1 ? yPos - 80 : line.y1} x2={line.x2 == -1 ? xPos : line.x2} y2={line.y2 == -1 ? yPos - 80 : line.y2} />) })}
          </div>
        </TransformComponent>

      </TransformWrapper>

      <ContextMenu show={show} xPos={xPos} yPos={yPos} add={addNode} />
      <TopBar projectName='Project Name' />

    </div>

  )

}

export default App;
