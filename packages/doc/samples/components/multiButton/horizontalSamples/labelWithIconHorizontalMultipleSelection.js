import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Map";
import LocationPin from "@hv/uikit-react-icons/dist/LocationPin";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map />, selected: true },
  {
    id: "satellite",
    value: "Satellite",
    icon: <LocationPin />,
    selected: true
  },
  { id: "map1", value: "Navigate", icon: <Map />, selected: true },
  { id: "satellite1", value: "Place", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "460px" }}>
    <MultiButton buttons={buttonsDefinitions} type={"mixed"} multi />
  </div>
);
