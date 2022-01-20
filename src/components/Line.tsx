/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from "@mui/material";
import { coordinates } from "./templates"

function Line(coordinates: coordinates) {
    
    const theme = useTheme();

    return (
        <svg width={'100%'} height={'100%'}>
            <line x1={coordinates.x1} y1={coordinates.y1} x2={coordinates.x2} y2={coordinates.y2} stroke={theme.palette.text.secondary} strokeWidth='2'/>
        </svg>
    )

}

export default Line