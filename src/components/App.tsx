/* eslint-disable react/jsx-key */
import React, { useEffect, useState, MouseEvent, KeyboardEvent } from 'react'
import '../styles/App.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Node from './Node'
import TopBar from './TopBar'
import ContextMenu from './ContextMenu'
import nodeProps from './nodeProps'

function App() {

  const [xPos, setxPos] = useState(0)
  const [yPos, setyPos] = useState(0)
  const [show, setShow] = useState(false)
  const [nodesProps, setNodesProps] = useState<nodeProps[]>([])
  const [selected, setSelected] = useState(-1)

  const addNode = (nodeProps: nodeProps) => {
    nodeProps.id = Math.floor(Math.random() * 1000)
    nodeProps.posX = xPos
    nodeProps.posY = yPos
    nodeProps.select = setSelected
    setNodesProps([...nodesProps, nodeProps])
  }

  const removeNode = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Delete' && selected !== -1) {
      setNodesProps(nodesProps.filter(prop => prop.id !== selected))
    }
  }

  useEffect(() => {
    //sql
  }, [])

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

  return (

    <div id='bg' tabIndex={0} onMouseMove={mousePosition} onClick={click} onContextMenu={rightClick} onKeyUp={e => removeNode(e)}>

      <TransformWrapper
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
        panning={{ activationKeys: ['Shift'], velocityDisabled: true }}
        limitToBounds={false}
        minScale={.5}
        maxScale={1.5}
        centerOnInit={true}>

        <TransformComponent>
          <div id='bg'>
            {nodesProps.map(nodeProps => { return (<Node {...nodeProps} />) })}
          </div>
        </TransformComponent>

      </TransformWrapper>

      <ContextMenu show={show} xPos={xPos} yPos={yPos} add={addNode} />
      <TopBar projectName='Project Name' />

    </div>

  )

}

export default App;
