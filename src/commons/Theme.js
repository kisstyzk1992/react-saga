import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    color: {
        primary: "#3f51b5",
        secondary: "#00BCD4",
        error: "#E64A19",
        textColor: '#FFFFFF',
        defaultTextColor: '#00000',
        hover: 'rgba(0,0,0,0.08)'
    },
    typography: {
        fontFamily: "Roboto"
    },
    shape: {
        borderRadius: 4,
        backgroundColor: "#7B1FA2",
        textColor: "#FFFFFF",
        border: "#CCCCCC"
    }
})

export default theme