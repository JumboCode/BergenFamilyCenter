import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { doc, getDoc } from "firebase/firestore";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import { updateUser } from "../src/userFunctions";
import * as yup from 'yup';

const validationSchema = yup.object({
  // overallConsent: "Both",
  photoPurposes: yup.bool().oneOf([true], 'Accept Terms'),
  acceptTerms: yup.bool().oneOf([true], 'Accept Terms'),
  nameSocialMedia: yup.bool().oneOf([true], 'Accept Terms'),
  noCompensation: yup.bool().oneOf([true], 'Accept Terms'),
  externalPermission: yup.bool().oneOf([true], 'Accept Terms'),
  confidentiality: yup.bool().oneOf([true], 'Accept Terms'),
  ableWithdrawConset: yup.bool().oneOf([true], 'Accept Terms'),
});

export default function PhotoPopUp({ open, setOpen }) {
  const [consent, setConsent] = useState(null);
  console.log(consent);
  const uid = "vIsvXv6bFFNHL6RQnYDGwPZYcdl2"; // auth.currentUser?.uid;
  useEffect(() => {
    if (uid) {
      const userRef = doc(db, "users", uid);
      const userInfo = getDoc(userRef).then(value => {
        setConsent(value.data().consent);
      });
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      overallConsent: consent?.overallConsent,
      photoPurpose: consent?.photoPurpose,
      nameSocialMedia: consent?.nameSocialMedia,
      noCompensation: consent?.noCompensation,
      externalPermission: consent?.externalPermission,
      confidentiality: consent?.confidentiality,
      ableWithdrawConset: consent?.ableWithdrawConset,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUser("vIsvXv6bFFNHL6RQnYDGwPZYcdl2", { consent: values });
      handleClose();
    },
  });


  const handleClose = () => {
    setOpen(false);
  };


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
                  // defaultValue={consent?.overallConsent}
                  value={consent?.overallConsent}
                  id="overallConsent"
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Both"
                    name="overallConsent"
                    control={<Radio />}
                    label="Yes, both (parent/guardian and child)"
                  />
                  <FormControlLabel
                    value="Child only"
                    name="overallConsent"
                    control={<Radio />}
                    label="Yes, child only (under 18)"
                  />
                  <FormControlLabel
                    value="Adult only"
                    name="overallConsent"
                    control={<Radio />}
                    label="Yes, myself only (adult/parent/guardian)"
                  />
                  <FormControlLabel
                    value="No consent"
                    name="overallConsent"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <FormControlLabel
                  // error={formik.touched.photoPurposes && Boolean(formik.errors.photoPurposes)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.photoPurposes && formik.errors.photoPurposes}
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
                  // error={formik.touched.nameSocialMedia && Boolean(formik.errors.nameSocialMedia)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.nameSocialMedia && formik.errors.nameSocialMedia}
                      defaultChecked
                      onChange={formik.handleChange}
                      id="nameSocialMedia"
                    ></Checkbox>
                  }
                  label="Bergen Family Center can mention my (my child's) name on social media"
                />
                <FormControlLabel
                  // error={formik.touched.noCompensation && Boolean(formik.errors.noCompensation)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.noCompensation && formik.errors.noCompensation}

                      defaultChecked
                      onChange={formik.handleChange}
                      id="noCompensation"
                    ></Checkbox>
                  }
                  label="I/We understand that no one will receive compensation for the use
              of this material."
                />
                <FormControlLabel
                  // error={formik.touched.externalPermission && Boolean(formik.errors.externalPermission)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.externalPermission && formik.errors.externalPermission}
                      defaultChecked
                      onChange={formik.handleChange}
                      id="externalPermission"
                    ></Checkbox>
                  }
                  label="I/We understand that photos shared by outside businesses/organizations must obtain permission by Bergen Family Center."
                />
                <FormControlLabel
                  // error={formik.touched.confidentiality && Boolean(formik.errors.confidentiality)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.confidentiality && formik.errors.confidentiality}

                      defaultChecked
                      onChange={formik.handleChange}
                      id="confidentiality"
                    ></Checkbox>
                  }
                  label="I/We understand that this material is confidential and is protected by the agency's policies on confidentiality and may only be used for the purpose(s) described above."
                />
                <FormControlLabel
                  // error={formik.touched.ableWithdrawConsent && Boolean(formik.errors.ableWithdrawConsent)}
                  control={
                    <Checkbox
                      required
                      helperText={formik.touched.ableWithdrawConsent && formik.errors.ableWithdrawConsent}

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
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
