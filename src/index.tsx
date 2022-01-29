/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
//import reportWebVitals from './Rest/reportWebVitals';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { green, purple } from '@mui/material/colors';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#272727'
        },
        primary: {
            main: purple[300]
        },
        secondary: {
            main: green[300]
        }
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
    ,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
