import { Typography } from "@mui/material";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards.js";

export default function Profile() {
  return (
    <div>
      <NavBar page={"profile"}></NavBar>
      <ScrollingCard division={["Child"]}></ScrollingCard>
    </div>
  );
}
