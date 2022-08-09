import { useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import CalendarIcon from "../components/calendarIcon";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import EventDialog from "./eventDialog";
import Image from 'next/image';
import imageKitLoader from './imageKitLoader';
import { colors } from '../public/colors.js'


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
    gtDivisions,
  } = props;
  const [open, setOpen] = useState(false);
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
                    />
                  </div> :
                  <div style={{ backgroundColor: colors[gtDivisions.indexOf(division)], position: 'relative', height: 60, width: "100%", maxHeight: 60 }}>
                  </div>
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
