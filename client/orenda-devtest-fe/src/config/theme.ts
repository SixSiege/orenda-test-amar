import { createTheme } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

let theme = createTheme({
    palette: {
        primary: {
            main: red[700],
        },
        secondary: {
            main: red[50]
        },
        neutral: {
            light: grey[50],
            medium: grey[200],
            normal: grey[700],
            main: grey[900]
        },
        green: {
            main: green[400]
        }
    }
});

export default theme;