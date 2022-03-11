// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Checkbox from "@mui/material/Checkbox";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// export default function PhotoPopUp() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [checked, setChecked] = React.useState(true);
//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   const [value, setValue] = React.useState("female");
//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Photo Consent Dialog
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>
//           Consent Form for Photograph, Audio, and Visual Recording
//         </DialogTitle>
//         <DialogContent>
//           <Checkbox checked={checked} onChange={handleChange}>
//             I/We hereby give consent to Bergen Family Center to photograph, make
//             an audio, and/or visual recording
//           </Checkbox>
//           <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             defaultValue="female"
//             name="radio-buttons-group"
//           >
//             <FormControlLabel
//               value="female"
//               control={<Radio />}
//               label="Female"
//             />
//             <FormControlLabel value="male" control={<Radio />} label="Male" />
//             <FormControlLabel value="other" control={<Radio />} label="Other" />
//           </RadioGroup>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
