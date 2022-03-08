import { ClassNames } from '@emotion/react';
import { Grid } from '@mui/material';
import Event from "../components/event";
import { Typography } from "@mui/material";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards.js";




export default function Events() {
    return (
        <div>
      <NavBar page={"Events"}></NavBar>
      <div>
          <Typography>Adolescent Events</Typography>
      <ScrollingCard division={["Child"]}></ScrollingCard>
      </div>
      <div>
      <Typography>Teen Events</Typography>
      <ScrollingCard division={["Child"]}></ScrollingCard>
      </div>
      <Typography>Senior Events</Typography>
      <ScrollingCard division={["Child"]}></ScrollingCard>
      
    </div>

    
        
    )
}


