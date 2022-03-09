import * as React from "react";
import MediaCard from "./event";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { firebaseFilterEventsPaginate } from "../src/firebaseEvents";
import { useState, useEffect } from "react";

export default function ScrollingCard({ division }) {
  const [listCards, setListCards] = useState([]);

  const makeCards = () => {
    firebaseFilterEventsPaginate(division, 200, 0).then((value) => {
      setListCards(
        value.map((card) => {
          return (
            <MediaCard
              key={card.id}
              description={card.data().description}
              title={card.data().title}
              image={"/TransparentTree.png"} /* STILL TO-DO:: images */
              startTime={card.data().startTime}
              endTime={card.data().endTime}
            />
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
      items: 5,
      slidesToSlide: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  return (
    <div>
      <Carousel responsive={responsive} autoPlay={false} animation={"fade"}>
        {listCards}
      </Carousel>
    </div>
  );
}
