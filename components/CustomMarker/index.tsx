import React from "react";
import arrow from "../../assets/arrow3.png";
import { Image } from "react-native";
import { styles } from "./styles";

interface Props {
  heading?: number;
}

export const CustomMarker: React.FC<Props> = (props: Props) => (
  <Image
    source={arrow}
    style={[
      styles.arrowIcon,
      { transform: [{ rotate: `${props.heading}deg` }] },
    ]}
  />
);
