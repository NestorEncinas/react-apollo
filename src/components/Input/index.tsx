import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

interface IInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputComponent: React.FC<IInputProps> = ({ value, onChange, label }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      id={value}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      variant="outlined"
    />
  );
};

export default InputComponent;
