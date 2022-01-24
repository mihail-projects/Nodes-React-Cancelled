/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import useTheme from '@mui/material/styles/useTheme'

type LineProps = {
    id1: string;
    id2: string;
    thickness: number;
    mousePos: number[]
}

function Line({ id1, id2, thickness, mousePos }: LineProps) {

    const theme = useTheme();

    const div1 = document.getElementById(id1)!
    const off1 = getOffset(div1);
    const x1 = off1.left + off1.width / 2;
    const y1 = off1.top + off1.height / 2;

    let color

    let x2: number
    let y2: number

    if (id2 != '') {
        const div2 = document.getElementById(id2)!
        const off2 = getOffset(div2);
        x2 = off2.left + off1.width / 2;
        y2 = off2.top + off1.height / 2;
        color = theme.palette.primary.main
    } else {
        x2 = mousePos[0]
        y2 = mousePos[1]
        color = theme.palette.secondary.main
    }

    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

    // center
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);

    // angle
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

    // make hr
    return <div style={{
        padding: '0px',
        margin: '0px',
        height: thickness + 'px',
        backgroundColor: color,
        lineHeight: '1px',
        position: 'absolute',
        left: cx + 'px',
        top: cy + 'px',
        width: length + 'px',
        transform: 'rotate(' + angle + 'deg)'
    }} />
}

function getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    }
}

export default Line