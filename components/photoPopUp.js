import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";

export default function PhotoPopUp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //   const [value, setValue] = React.useState("female");
  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Photo Consent Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Consent Form for Photograph, Audio, and Visual Recording
        </DialogTitle>
        <FormGroup>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText>
                With any questions, please contact Everlin at 201-568-0817
                extension 126 or ykim@bergenfamilycenter.org
              </DialogContentText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="I/We understand that this material may be used for the following
              purpose(s): Posters, Newspaper Announcements, In-house and Brand Publications,
              Internet Social Media - i.e. Facebook, Twitter, etc."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="Bergen Family Center can mention my (my child's) name on social media"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="I/We understand that no one will receive compensation for the use
              of this material."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="I/We understand that photos shared by outside businesses/organizations must obtain permission by Bergen Family Center."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="I/We understand that this material is confidential and is protected by the agency's policies on confidentiality and may only be used for the purpose(s) described above."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  ></Checkbox>
                }
                label="I/We understand that I/we may withdraw this consent at any time and understand that such revocation must be in writing."
              />
              {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup> */}
            </Stack>
          </DialogContent>
        </FormGroup>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
