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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#BB86FC'
        },
        secondary: {
            main: '#03DAC6'
        }
    },
})

ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
