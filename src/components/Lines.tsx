/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-key */
import Line from './Line'

function Lines(pairs: number[][]) {
    return pairs.map(pair => <Line fx={pair[0]} fy={pair[1]} tx={pair[2]} ty={pair[3]} style1={'5px solid orange'} />)
}

export default Lines