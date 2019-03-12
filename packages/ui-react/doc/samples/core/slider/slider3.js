import React from "react";
import HvSlider from "@hv-ui/react/core/Slider";

const threeKnobFixedProperties = [
  {
    color: "yellow",
    dragColor: "black",
    trackColor: "red"
  },
  {
    color: "red",
    dragColor: "red",
    trackColor: "grey"
  },
  {
    color: "purple",
    dragColor: "#orange",
    trackColor: "yellow",
    fixed: true
  }
];

const threeKnobFixedPropertiesDefaults = [10, 50, 80];

export default (
  <HvSlider
    markStep={10}
    knobProperties={threeKnobFixedProperties}
    defaultValues={threeKnobFixedPropertiesDefaults}
  />
);
