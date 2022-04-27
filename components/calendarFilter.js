import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({
  divisions,
  setDivisions,
  gtDivisions,
}) {
  const initialState = [];
  for (let i = 0; i < divisions.length; i++) {
    initialState[i] = false;
  }
  const [checked, setChecked] = React.useState(initialState);
  console.log(divisions);
  const makeCheckboxes = gtDivisions.map((divisionName, i) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => {
              const temp = [...checked];
              temp[i] = !temp[i];
              setChecked(temp);
              handleChange(divisionName, checked[i]);
            }}
            id={divisionName}
          ></Checkbox>
        }
        label={divisionName}
      />
    );
  });

  const handleChange = (division, checked) => {
    console.log(checked);
    console.log(divisions);
    if (checked) {
      const index = divisions.indexOf(division);
      console.log(index);
      const temp = [...divisions];
      if (index > -1) {
        temp.splice(index, 1);
        setDivisions(temp);
      }
    } else {
      setDivisions([...divisions, division]);
    }
  };

  return <FormGroup>{makeCheckboxes}</FormGroup>;
}

// {
//   /* <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[0] = !temp[0];
//               setChecked(temp);
//               handleChange("Family Success Center", checked[0]);
//             }}
//             id="FamilySuccessCenter"
//           ></Checkbox>
//         }
//         label="Family Success Center"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[1] = !temp[1];
//               setChecked(temp);
//               handleChange("Early Learning Center/Home", checked[1]);
//             }}
//             id="EarlyLearningCenter/Home"
//           ></Checkbox>
//         }
//         label="Early Learning Center/Home"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[2] = !temp[2];
//               setChecked(temp);
//               handleChange("HIV/Outreach Services", checked[2]);
//             }}
//             id="HIV/Outreach Services"
//           ></Checkbox>
//         }
//         label="HIV/Outreach Services"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[3] = !temp[3];
//               setChecked(temp);
//               handleChange("Visiting Program", checked[3]);
//             }}
//             id="Visiting Program"
//           ></Checkbox>
//         }
//         label="Visiting Program"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[4] = !temp[4];
//               setChecked(temp);
//               handleChange("Senior Services", checked[4]);
//             }}
//             id="Senior Services"
//           ></Checkbox>
//         }
//         label="Senior Services"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[5] = !temp[5];
//               setChecked(temp);
//               handleChange("Adolescent Services", checked[5]);
//             }}
//             id="Adolescent Services"
//           ></Checkbox>
//         }
//         label="Adolescent Services"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             onChange={() => {
//               const temp = [...checked];
//               temp[6] = !temp[6];
//               setChecked(temp);
//               handleChange("Clinical Services", checked[6]);
//             }}
//             id="Clinical Services"
//           ></Checkbox>
//         }
//         label="Clinical Services"
//       />
//     </FormGroup>
//   );
// } */
// }
