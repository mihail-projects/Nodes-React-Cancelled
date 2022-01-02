import { useCallback, useEffect } from 'react'
import '../styles/App.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Node from './Node'
import TopBar from './TopBar'

function App() {

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  })

  const escFunction = useCallback((event) => {
    console.log(event.key)
  }, []);

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
            <Node text='Text text text'/>
          </div>
        </TransformComponent>

      </TransformWrapper>

      <TopBar projectName='Project Name'/>

    </div>

  )

}

export default App;
