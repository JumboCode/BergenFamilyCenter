import * as React from "react";
import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";

export default function PhotoPopUp({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      overallConsent: "Both",
      photoPurpose: true,
      nameSocialMedia: true,
      noCompensation: true,
      externalPermission: true,
      confidentiality: true,
      ableWithdrawConset: true,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            Consent Form for Photograph, Audio, and Visual Recording
          </DialogTitle>
          <FormGroup>
            <DialogContent>
              <Stack spacing={2}>
                <DialogContentText>
                  With any questions, please contact Everlin at 201-568-0817
                  extension 126 or{" "}
                  <Link href="mailto:ykim@bergenfamilycenter.org">
                    ykim@bergenfamilycenter.org
                  </Link>
                </DialogContentText>
                <FormLabel>
                  I/We hereby give consent to Bergen Family Center to
                  photograph, make an audio, and/or visual recording{" "}
                </FormLabel>
                <RadioGroup
                  defaultValue="Both"
                  id="overallConsent"
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Both"
                    control={<Radio />}
                    label="Yes, both (parent/guardian and child)"
                  />
                  <FormControlLabel
                    value="Child only"
                    control={<Radio />}
                    label="Yes, child only (under 18)"
                  />
                  <FormControlLabel
                    value="Adult only"
                    control={<Radio />}
                    label="Yes, myself only (adult/parent/guardian)"
                  />
                  <FormControlLabel
                    value="No consent"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                      id="photoPurposes"
                    ></Checkbox>
                  }
                  label="I/We understand that this material may be used for the following
              purpose(s): Posters, Newspaper Announcements, In-house and Brand Publications,
              Internet Social Media - i.e. Facebook, Twitter, etc."
                  name="photoPurposes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                      id="nameSocialMedia"
                    ></Checkbox>
                  }
                  label="Bergen Family Center can mention my (my child's) name on social media"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                      id="noCompensation"
                    ></Checkbox>
                  }
                  label="I/We understand that no one will receive compensation for the use
              of this material."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                      id="externalPermission"
                    ></Checkbox>
                  }
                  label="I/We understand that photos shared by outside businesses/organizations must obtain permission by Bergen Family Center."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                    ></Checkbox>
                  }
                  label="I/We understand that this material is confidential and is protected by the agency's policies on confidentiality and may only be used for the purpose(s) described above."
                  id="confidentiality"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={formik.handleChange}
                      id="ableWithdrawConsent"
                    ></Checkbox>
                  }
                  label="I/We understand that I/we may withdraw this consent at any time and understand that such revocation must be in writing."
                />
              </Stack>
            </DialogContent>
          </FormGroup>
          <DialogActions>
            <Button onClick={handleClose} type="submit" variant="outlined">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
