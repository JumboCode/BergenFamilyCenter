import MediaCard from "./event";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { firebaseFilterEventsPaginate } from "../src/firebaseEvents";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from '../src/languageContext';
import { Typography } from "@mui/material";

export default function ScrollingCard({ division, user, gtDivisions }) {
  const [listCards, setListCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, _ } = useContext(LanguageContext);
  const inEnglish = language === "English";

  const makeCards = () => {
    firebaseFilterEventsPaginate(division, 200, 0).then((value) => {
      setLoading(false);
      setListCards(
        value.map((card) => {
          return (
            <div key={card.id}>
              <MediaCard
                description={card.data().description}
                title={card.data().name}
                image={card.data().image} /* STILL TO-DO:: images */
                startTime={card.data().startTime}
                endTime={card.data().endTime}
                manager={card.data().manager}
                attendees={card.data().attendeesRef}
                ageLow={card.data().ageLow}
                ageHigh={card.data().ageHigh}
                maxAttendees={card.data().maxAttendees}
                event={card.id}
                division={card.data().division}
                user={user}
                gtDivisions={gtDivisions}
              />
            </div>
          );
        })
      );
    });
  };

  useEffect(() => {
    makeCards();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <div>
      {loading ? null : listCards.length == 0 ?
        <Typography variant="subtitle2">{inEnglish ? "No Upcoming Events" : "No hay próximas eventos"}</Typography> :
        <Carousel
          responsive={responsive}
          shouldResetAutoplay={false}
          autoPlay={false}
          animation={"fade"}
        >
          {listCards}
        </Carousel>
      }
    </div>
  );
}
