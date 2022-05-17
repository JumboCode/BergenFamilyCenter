import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const colors = [
  "#9FE4EDdd",
  "#FFEAC2dd",
  "#C9F2B3ff",
  "#FFC5C3dd",
  "#aab9ff",
  "#DBC5EEdd",
  "#DDE1E8dd",
];

const colorsBorder = [
  "#45AFBC",
  "#FEC150",
  "#a7dc8b",
  "#E6413E",
  "#8196f3",
  "#9E7FBA",
  "#a6adb9",
];

export default function CheckboxLabels({
  divisions,
  setDivisions,
  gtDivisions,
}) {
  const initialState = [];
  for (let i = 0; i < gtDivisions.length; i++) {
    initialState.push(false);
  }
  for (let i = 0; i < divisions.length; i++) {
    const index = gtDivisions.indexOf(divisions[i]);
    initialState[index] = true;
  }

  const [checked, setChecked] = React.useState(initialState);
  const makeCheckboxes = gtDivisions.map((divisionName, i) => {
    return (
      <FormControlLabel
        key={i}
        sx={{ display: "flex", m: 0, width: `${100 / 2}%` }}
        control={
          <Checkbox
            checked={checked[i]}
            sx={{
              color: colorsBorder[i],
              '&.Mui-checked': {
                color: colorsBorder[i],
              },
            }}
            onChange={() => {
              const temp = [...checked];
              temp[i] = !temp[i];
              setChecked(temp);
              handleChange(divisionName, checked[i]);
            }}
            id={divisionName}
          />
        }
        label={<Typography align="center" variant="body2">{divisionName}</Typography>}
      />
    );
  });

  const handleChange = (division, checked) => {
    if (checked) {
      const index = divisions.indexOf(division);
      const temp = [...divisions];
      if (index > -1) {
        temp.splice(index, 1);
        setDivisions(temp);
      }
    } else {
      setDivisions([...divisions, division]);
    }
  };

  return <FormGroup row>{makeCheckboxes}</FormGroup>;
}
