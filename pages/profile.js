import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards.js";
import PhotoPopUp from "../components/photoPopUp.js";

export default function Profile() {
  return (
    <div>
      <NavBar page={"profile"}></NavBar>
      <ScrollingCard division={["Child"]}></ScrollingCard>
      {/* <PhotoPopUp></PhotoPopUp> */}
    </div>
  );
}
