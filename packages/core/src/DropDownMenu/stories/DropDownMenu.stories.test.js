/* eslint-disable no-console */
import React from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { HvButton, HvDropDownMenu } from "../..";

import { WithIconsAndActions, DisabledItems } from "./DropDownMenu.stories";

export default {
  title: "Tests/Dropdown Menu",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  },
  decorators: [
    storyFn => <div style={{ display: "flex", justifyContent: "center" }}>{storyFn()}</div>
  ]
};

// __________________________________
// Extended robot test scenarios

export const KeyboardNavigation = () => (
  <>
    <HvButton id="button1">button1</HvButton>
    <HvDropDownMenu
      id="dpmKeepOpenedFalse"
      dataList={[{ label: "Label 1" }, { label: "Label 2", disabled: true }, { label: "Label 3" }]}
      onClick={(e, item) => console.log(item.label)}
      keepOpened={false}
    />
    <HvButton id="button2">button2</HvButton>
  </>
);

KeyboardNavigation.story = {
  parameters: {
    v3: true
  }
};

// __________________________________
// Extended pa11y test scenarios

export const A11YClosed = () => (
  <HvDropDownMenu
    id="dropdownmenu-closed"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YClosed.story = {
  parameters: {
    v3: true
  }
};

export const A11YOpen = () => (
  <HvDropDownMenu
    id="dropdownmenu-open"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YOpen.story = {
  parameters: {
    v3: true,
    pa11y: {
      actions: [
        // open menu before testing
        "click element #dropdownmenu-open-icon-button",
        "wait for element #dropdownmenu-open-list to be visible"
      ]
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, With Icons And Actions opened
export const IconsOpened = () => WithIconsAndActions();

IconsOpened.story = {
  parameters: {
    v3: true,
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /dropdownmenu-3/i }));
        return wait(() => screen.getByText("Label 3"));
      }
    }
  }
};

// test scenario, Disabled Items opened
export const DisabledItemsOpened = () => DisabledItems();

DisabledItemsOpened.story = {
  parameters: {
    v3: true,
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /dropdownmenu-disableditems/i }));
        return wait(() => screen.getByText("Label 3"));
      }
    }
  }
};
