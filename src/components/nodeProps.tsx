/* eslint-disable @typescript-eslint/ban-types */
export default interface nodeProps {
    id: number
    title: string
    posX: number
    posY: number
    properties: {
        name: string
        leftC: boolean
        rightC: boolean
    }[]
    select: Function
}