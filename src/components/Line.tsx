/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import useTheme from '@mui/material/styles/useTheme'
import { border } from "@mui/system";

type LineProps = {
    id1: string
    id2: string
    thickness: number
    mousePos: number[]
    acceleration: number[]
}

function Line(props: LineProps) {

    const theme = useTheme();

    const off1 = document.getElementById(props.id1)!.getBoundingClientRect()
    const x1 = off1.left + off1.width / 2;
    const y1 = off1.top + off1.height / 2;

    let color

    let x2: number
    let y2: number

    if (props.id2 != '') {
        const off2 = document.getElementById(props.id2)!.getBoundingClientRect()
        x2 = off2.left + off1.width / 2;
        y2 = off2.top + off1.height / 2;
        color = theme.palette.primary.main
    } else {
        x2 = props.mousePos[0]
        y2 = props.mousePos[1]
        color = theme.palette.secondary.main
    }

    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

    // center
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (props.thickness / 2);

    // angle
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

    // make hr
    return <div style={{
        position: 'absolute',
        left: cx - props.acceleration[0] + 'px',
        top: cy - props.acceleration[1] + 'px',
        width: length + 'px',
        height: props.thickness + 'px',
        transform: 'rotate(' + angle + 'deg)',
        backgroundColor: color,
        lineHeight: '1px',
    }} />
}

function getOffset(el: HTMLElement) {

    const rect = el.getBoundingClientRect()

    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    }

}

export default Line