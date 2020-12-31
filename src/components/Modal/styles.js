const style = (theme) => ({
    modal: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 4),
        outline: 'none'
    },

    header: {
        backgroundColor: theme.color.primary,
        color: theme.color.textColor,
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    icon: {
        cursor: 'pointer',
        fontSize: 30
    },

    title: {
        color: theme.color.textColor,
        fontWeight: 700,
        textTransform: 'captitalize'
    },

    content: {
        padding: theme.spacing(2)
    }
})

export default style