import React, { ReactNode } from "react";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box } from "@mui/material";

interface Props {
  title: string | ReactNode;
  type: AlertColor;
  children?: ReactNode;
}

export const SnackbarMessage: React.FC<Props> = (props: Props) => {
  return (
    <Box sx={{minWidth: "300px"}}>
      <MuiAlert
        severity={props.type}
        sx={[
          {
            width: "100%",
            alignItems: "start",
            boxShadow: "none",
            "& .MuiAlert-icon": {
              fontSize: "18.43px",
              padding: "0px",
              height: "36px",
              display: "flex",
              alignItems: "center",
            },
          },
          props.type === "success" && {
            color: "#1E4620",
            backgroundColor: "#EEF7ED",
          },
          props.type === "error" && {
            color: "#621B16",
            backgroundColor: "#FEECEB",
          },
          props.type === "warning" && {
            color: "#7B4E2B",
            backgroundColor: "#FDF1E6",
          },
        ]}
        iconMapping={{
          success: (<CheckCircleOutlineIcon fontSize="inherit" sx={{color: "#4CAF50"}} />),
          error: (<InfoOutlinedIcon fontSize="inherit" sx={{color: "#F44336"}} />),
          warning: (<WarningAmberIcon fontSize="inherit" sx={{color: "#ED6C02"}} />)
        }}
      >
        <>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "20px",
            }}
          >
            <Box sx={{marginRight: 3}}>{props.title}</Box>
            <div>
              {props.children}
            </div>
          </Box>
        </>
      </MuiAlert>
    </Box>
  );
};
