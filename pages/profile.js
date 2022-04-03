import * as React from "react";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards.js";
import PhotoPopUp from "../components/photoPopUp.js";
import Button from "@mui/material/Button";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <NavBar page={"profile"}></NavBar>
      <ScrollingCard division={["Child"]}></ScrollingCard>
      <Button onClick={() => setOpen(true)} variant="outlined">
        Photo Pop Up Test
      </Button>
      <PhotoPopUp open={open} setOpen={setOpen}></PhotoPopUp>;
    </div>
  );
}
