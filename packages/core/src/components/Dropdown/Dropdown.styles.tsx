import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvBaseDropdown,
  HvFormElement,
  HvLabel,
  HvTypography,
} from "components";
import { transientOptions } from "utils/transientOptions";
import dropdownClasses from "./dropdownClasses";

export const StyledHvFormElement = styled(
  HvFormElement,
  transientOptions
)(({ $selectionDisabled }: { $selectionDisabled?: boolean }) => ({
  width: "100%",

  position: "relative",
  display: "inline-block",

  ...($selectionDisabled && {
    color: theme.dropdown.disabledColor,
  }),
}));

export const StyledDropdown = styled(
  (props) => <HvBaseDropdown {...props} />,
  transientOptions
)(
  ({
    $dropdownHeaderInvalid,
    $readOnly,
  }: {
    $dropdownHeaderInvalid?: boolean;
    $readOnly?: boolean;
  }) => ({
    width: "100%",
    borderRadius: 2,

    [`& .${dropdownClasses.dropdownHeader}`]: {
      border: theme.dropdown.headerBorder,
      "&:hover": {
        border: `1px solid ${theme.colors.secondary_80}`,
      },
      ...($dropdownHeaderInvalid && {
        border: "none",
        "&:hover": {
          border: "none",
        },
      }),
      ...($readOnly && {
        border: theme.dropdown.readOnlyBorder,
        backgroundColor: theme.dropdown.readOnlyBackgroundColor,
      }),
    },

    [`& .${dropdownClasses.dropdownHeaderInvalid}`]: {
      border: theme.dropdown.dropdownHeaderInvalidBorder,
      "&:hover": {
        border: theme.dropdown.dropdownHeaderInvalidBorder,
      },
    },

    [`& .${dropdownClasses.dropdownHeaderOpen}`]: {
      border: theme.dropdown.dropdownHeaderOpenBorder,
      "&:hover": {
        border: theme.dropdown.dropdownHeaderOpenBorder,
      },
    },
  })
);

export const StyledLabelContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
});

export const StyledLabel = styled(HvLabel)({
  paddingBottom: "6px",
  display: "block",
});

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(
  ({
    $selectionDisabled,
    $isOpen,
  }: {
    $selectionDisabled?: boolean;
    $isOpen?: boolean;
  }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...(!$isOpen && {
      color: theme.dropdown.placeholderColor,
    }),
    ...($selectionDisabled && {
      lineHeight: theme.space.md,
      color: theme.dropdown.disabledColor,
    }),
  })
);
