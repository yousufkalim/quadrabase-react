import React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import clsx from "clsx";
import { Step, Stepper, StepLabel, StepConnector } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 16,
  },
  active: {
    "& $line": {
      backgroundImage: "#8C1244",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "#8C1244",
    },
  },
  line: {
    height: 4,
    width: 100,
    marginLeft: -15,
    border: 0,
    background: "#8C1244",
    borderRadius: 1,
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    background: "#8C1244",
    zIndex: 1,
    color: "#fff",
    width: 35,
    height: 35,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  active: {
    backgroundColor: "#8C1244",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    width: 60,
    height: 60,
    fontSize: 36,
    fontWeight: 600,
    marginTop: -10,
  },
  completed: {
    backgroundColor: "#8C1244",
  },
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  console.log("topp", completed);
  const icons = {
    1: completed ? <DoneIcon /> : <>1</>,
    2: completed ? <DoneIcon /> : <>2</>,
    3: completed ? <DoneIcon /> : <>3</>,
    4: completed ? <DoneIcon /> : <>4</>,
  };
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
function getSteps() {
  return [
    "Informations générales",
    "Informations de connexion",
    "Formule d'abonnement",
    "Paiement",
  ];
}
export default function CustomizedSteppers({ activeStep, handleStep }) {
  const steps = getSteps();
  return (
    <div className="stepperMain">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className="stepper"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <div
                className="steplabel"
                style={{
                  color: `${activeStep !== index ? "transparent" : "#8C1244"}`,
                  width: 100,
                }}
              >
                <strong>{label}</strong>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
