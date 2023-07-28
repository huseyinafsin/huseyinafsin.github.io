import React from 'react'
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

function Footer() {

    const iconSize = { fontSize: "0.70rem" };
    const currentYear =new  Date().getFullYear();
  return (
    <div className="footer">
    <div className="container-footer">
      <span className="mui-icon">
        <RadioButtonUncheckedRoundedIcon style={iconSize} />
      </span>
      <div className="text-2"> Built with React ⚛️</div>
    </div>
    <div className="container-footer">
      <span className="mui-icon">
        <RadioButtonUncheckedRoundedIcon style={iconSize} />
      </span>
      <div className="text-2">Made by </div>
      <div className="text-1">Hüseyin </div>
    </div>
    <div className="container-footer">
      <div className="text-2"> © {currentYear}</div>
    </div>
  </div>  )
}

export default Footer