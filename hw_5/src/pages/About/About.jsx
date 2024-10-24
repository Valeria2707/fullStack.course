import React from "react";
import { ABOUT_TITLE, ABOUT_TEXT } from "../../constants/about.constants";
import InfoCard from "../../components/InfoCard/InfoCard";

function About() {
  return <InfoCard title={ABOUT_TITLE} text={ABOUT_TEXT} />;
}

export default About;
