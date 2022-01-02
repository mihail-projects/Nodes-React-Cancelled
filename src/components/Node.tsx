import '../styles/Node.css'
import Draggable from 'react-draggable'

type props = {
    text:string
}

function Node({text}:props) {

    return (
        <Draggable>
            <div id='node'>{text}</div>
        </Draggable>
    )

}

export default Node;
