import { useEffect, useState } from "react";
import { firebaseGetEvent } from "../src/firebaseEvents";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CalendarIcon from "../components/calendarIcon";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import EventDialog from "./eventDialog";
import Image from 'next/image';
import imageKitLoader from './imageKitLoader';

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

const gtDivisions = [
  "Early Learning Center/Home",
  "Family Success Center",
  "HIV/Outreach Services",
  "Visiting Program",
  "Senior Services",
  "Adolescent Services",
  "Clinical Services",
];


const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

export default function UpcomingEvent(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const {
    description,
    name,
    image,
    className,
    startTime,
    endTime,
    manager,
    event,
    attendees,
    user,
    division,
  } = props;
  const [open, setOpen] = useState(false);
  // const [eventName, updateEventName] = useState("");
  // const [eventDescription, updateEventDesc] = useState("");
  // const [timestamp, updateDate] = useState(null);
  const isImage = image !== "" && image !== undefined && image?.length != 0 && image !== {};

  const date = startTime?.toDate();
  return (
    <div>
      <Card
        elevation={3}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 25,
        }}
      >
        <CardActionArea
          onClick={() => {
            if (!open) {
              setOpen(true);
            }
          }}
          disableRipple={open}
        >
          {open ?
            <EventDialog
              open={open}
              setOpen={setOpen}
              description={props.description}
              title={props.name}
              image={props.image}
              className={""}
              startTime={props.startTime}
              endTime={props.endTime}
              manager={props.manager}
              event={props.id}
              attendees={props.attendeesRef}
              user={props.user}
              ageLow={props.ageLow}
              ageHigh={props.ageHigh}
              maxAttendees={props.maxAttendees}
            /> : null}
          <Grid container>
            <Grid item xs={5}>
              <div
                style={{
                  margin: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CalendarIcon
                  month={monthNames[date.getMonth()]}
                  day={date.getDate()}
                ></CalendarIcon>
              </div>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {isImage ?
                  <div style={{ position: 'relative', height: 60, width: "100%", maxHeight: 60 }}>
                    <Image
                      loader={imageKitLoader}
                      src={image}
                      alt="Event image"
                      objectFit='cover'
                      layout='fill'
                    // style={{ height: 50, width: 100, maxHeight: 20, objectFit: 'cover' }}
                    />
                  </div> :
                  <div style={{ backgroundColor: colors[gtDivisions.indexOf(division)], position: 'relative', height: 60, width: "100%", maxHeight: 60 }}>
                    {/* null */}
                  </div>
                  // <CardMedia
                  //   component="img"
                  //   sx={{ maxHeight: 60 }}
                  //   image="https://source.unsplash.com/random"
                  //   alt="Live from space album cover"
                  // />
                }
                <CardContentNoPadding
                  sx={{
                    flex: "1 0 auto",
                    padding: 0.5,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    WebkitBoxPack: "end",
                    lineHeight: 2,
                  }}
                >
                  <div sx={{ paddingBottom: 4 }}>
                    <Typography
                      component="div"
                      variant="h6"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                        lineHeight: 1,
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                      style={{ maxWidth: "200px" }}
                    >
                      {description}
                    </Typography>
                  </div>
                </CardContentNoPadding>
              </Box>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </div>
  );
}
