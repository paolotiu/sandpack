import React from "react";

import { styled } from "../../stitches.config";

import {
  ClientIllustration,
  ComponentsIllustration,
  ProviderIllustration,
} from "./illustrations";

const IllustrationWrapper = styled("div", {
  $$wrapperBackground: "#f1f1f1",
  $$backgroundElevation: "1",
  $$contentElevation: "calc(2 * $$backgroundElevation)",

  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  width: "343px",
  height: "512px",

  "&::after": {
    background: "$$wrapperBackground",
    content: "",
    display: "block",
    height: "100%",
    position: "absolute",
    transform: "scaleY(0)",
    transition: "transform 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000)",
    transformOrigin: "center top",
    width: "100%",
    zIndex: "$$backgroundElevation",
  },

  "> div": {
    zIndex: "$$contentElevation",
  },

  "@bp1": {
    height: "572px",
    width: "384px",

    "> div": {
      display: "initial",
    },
  },

  "@bp2": {
    height: "540px",
    width: "360px",
  },

  "@bp3": {
    height: "720px",
    width: "480px",
  },

  variants: {
    visible: {
      true: {
        "&::after": {
          transform: "scaleY(1)",
        },
      },
    },
  },
});

interface ExampleIllustrationProps {
  illustrationKey: string;
  visible: boolean;
}
export const ExampleIllustration: React.FC<ExampleIllustrationProps> = ({
  illustrationKey,
  visible,
}) => {
  return (
    <IllustrationWrapper visible={visible}>
      {
        {
          providers: <ProviderIllustration isActive={visible} />,
          components: <ComponentsIllustration isActive={visible} />,
          client: <ClientIllustration isActive={visible} />,
        }[illustrationKey]
      }
    </IllustrationWrapper>
  );
};
