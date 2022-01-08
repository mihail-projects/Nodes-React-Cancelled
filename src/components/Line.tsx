/* eslint-disable react/react-in-jsx-scope */
interface lineProps {
    fx: number
    fy: number
    tx: number
    ty: number
    style1: string
}

function Line({ fx, fy, tx, ty, style1 }: lineProps) {

    if (tx < fx) {
        const tfx = fx
        const tfy = fy
        const ttx = tx
        const tty = ty
        fx = ttx
        fy = tty
        tx = tfx
        ty = tfy
    }

    const len = Math.sqrt(Math.pow(fx - tx, 2) + Math.pow(fy - ty, 2))
    const angle = Math.atan((ty - fy) / (tx - fx))

    return (
        <div style={{
            position: 'absolute',
            transform: 'translate(' + (fx - .5 * len * (1 - Math.cos(angle))) + 'px,' + (fy + .5 * len * Math.sin(angle)) + 'px),' + 'rotate(' + angle + 'rad)',
            width: len + 'px',
            height: '0px',
            borderBottom: style1 || '1px solid black'
        }}></div>
    )

}

export default Line