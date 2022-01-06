import { useEffect, useState, useRef } from 'react'
import '../styles/App.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Node from './Node'
import TopBar from './TopBar'
import ContextMenu from './ContextMenu'

interface props {
  title: string,
  posX: number,
  posY: number,
  properties: {
    name: string
    leftC: boolean
    rightC: boolean
  }[]
}

function App() {

  const [xPos, setxPos] = useState(0)
  const [yPos, setyPos] = useState(0)
  const [show, setShow] = useState(false)

  let nodesProps = useRef<props[]>([])

  const addNode = (props: props) => {
    nodesProps.current = [...nodesProps.current, props]
  }

  useEffect(() => {

    const addNodeSQL = (props: props) => {
      nodesProps.current = [...nodesProps.current, props]
    }

    //sql
    addNodeSQL({ title: 'Smth', properties: [{ name: 'wtv', leftC: true, rightC: false }], posX: 100, posY: 100 })

  }, [])

  useEffect(() => {

    const update = (e: MouseEvent) => {
      if (!show) {
        setxPos(e.x)
        setyPos(e.y)
      }
    }

    const handleClick = (e: Event) => {

      e.preventDefault()

      if (e.type === 'click') {
        setShow(false)
      } else if (e.type === 'contextmenu') {
        setShow(true)
      }

    }

    window.addEventListener('mousemove', update)
    window.addEventListener('click', handleClick)
    window.addEventListener('contextmenu', handleClick)

    return () => {
      window.removeEventListener('mousemove', update)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('contextmenu', handleClick)
    }

  }, [show, xPos, yPos])

  return (

    <div id='bg'>

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
            {nodesProps.current.map(props => { return (<Node {...props} />) })}
          </div>
        </TransformComponent>

      </TransformWrapper>

      <ContextMenu show={show} xPos={xPos} yPos={yPos} func={addNode} />
      <TopBar projectName='Project Name' />

    </div>

  )

}

export default App;
