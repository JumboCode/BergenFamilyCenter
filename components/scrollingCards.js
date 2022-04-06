import MediaCard from "./event";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { firebaseFilterEventsPaginate } from "../src/firebaseEvents";
import { useState, useEffect } from "react";

export default function ScrollingCard({ division }) {
  const [listCards, setListCards] = useState([]);

  const makeCards = () => {
    firebaseFilterEventsPaginate(division, 200, 0).then((value) => {
      console.log(value)
      setListCards(
        value.map((card) => {
          return (
            <div key={card.id}>
              <MediaCard
                description={card.data().description}
                title={card.data().name}
                image={"/sunset.jpg"} /* STILL TO-DO:: images */
                startTime={card.data().startTime?.toDate()}
                endTime={card.data().endTime?.toDate()}
                manager={card.data().manager}
                attendees={card.data().attendeesRef}
                event={card.id}
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
      items: 3,
      slidesToSlide: 3,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        shouldResetAutoplay={false}
        autoPlay={false}
        animation={"fade"}
      >
        {listCards}
      </Carousel>
    </div>
  );
}
