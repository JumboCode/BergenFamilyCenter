import Head from "next/head";
import { storage } from "../firebase/firebase.js";
import { ref, uploadBytes } from "firebase/storage";
// import CalendarIcon from "react-calendar-icon";

export default function Home() {
  const divisions = ["Child"];
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <CalendarIcon date={new Date()} />
    </div>
  );
}