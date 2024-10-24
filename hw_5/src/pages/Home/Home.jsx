import React from "react";
import { HOME_TEXT, HOME_TITLE } from "../../constants/home.constants";
import InfoCard from "../../components/InfoCard/InfoCard";

function Home() {
  return <InfoCard title={HOME_TITLE} text={HOME_TEXT} />;
}

export default Home;
