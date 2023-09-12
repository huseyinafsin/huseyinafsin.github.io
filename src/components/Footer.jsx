import React from 'react'
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    height: "116px",
    maxHeight: "116px",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary,
    borderTop: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'colomn',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  
  containerFooter: {
    width: '15%',
    height: '30%',
    display: 'flex',
    minWidth: 'max-content',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    verticalAlign: 'middle',
  },
}));

function Footer({style}) {

    const iconSize = { fontSize: "0.70rem" };
    const currentYear =new  Date().getFullYear();
    const classes = useStyles();

    
  return (
    <footer className={classes.footer} style={style}>
    <div className={classes.containerFooter} >
      <span className="mui-icon">
        <RadioButtonUncheckedRoundedIcon style={iconSize} />
      </span>
      <div className="text-2"> Built with React ⚛️</div>
    </div>
    <div className={classes.containerFooter} >
      <span className="mui-icon">
        <RadioButtonUncheckedRoundedIcon style={iconSize} />
      </span>
      <div className="text-2">Made by </div>
      <div className="text-1">Hüseyin </div>
    </div>
    <div className={classes.containerFooter}>
      <div className="text-2"> © {currentYear}</div>
    </div>
  </footer>  )
}

export default Footer