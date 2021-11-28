import {makeStyles, Theme} from "@material-ui/core";

export const useUsersItemStyles = makeStyles((theme: Theme) => ({
    container: {
        cursor: 'pointer',
        borderBottom: "1px solid rgb(239, 243, 244)",
        '& .MuiListItem-root .MuiListItem-gutters': {
            padding: "0px 0px 0px 0px",
        },
        '& .MuiListItemAvatar-root': {
            minWidth: 50,
            "& .MuiAvatar-root": {
                width: "46px !important",
                height: "46px !important",
            },
        },
        '&:hover': {
            backgroundColor: '#edf3f6',
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
    userInfo: {
        width: 120,
    },
    fullName: {
        lineHeight: "20px",
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontSize: 15,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    username: {
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    outlinedButton: {
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 79,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    primaryButton: {
        marginLeft: 29,
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        // TODO '& .MuiButton-containedPrimary':
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    modalWrapper: {
        width: 280,
        height: 176,
        textAlign: "center",
        margin: "32px 20px",
    },
    modalFullName: {
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 24,
    },
    modalButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: theme.palette.text.primary,
        backgroundColor: "rgb(239, 243, 244)",
        borderRadius: '25px',
    },
    modalUnfollowButton: {
        width: 134,
        height: 40,
        border: '1px solid',
        borderRadius: '25px',
    },
}));
