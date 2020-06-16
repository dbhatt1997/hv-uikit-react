import React, { useState } from "react";
import {
  BarChart,
  Components,
  Email,
  Energy,
  GameController,
  Ghost,
  Help,
  LogOut,
  People,
  Research,
  User,
  WhiteBoard
} from "@hv/uikit-react-icons/dist";
import HvButton from "../../Button";
import HvUserPreferences, { Action, Actions, Group, Label, Option, Options } from "..";

export default {
  title: "Components/User Preferences",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvUserPreferences } from '@hv/uikit-react-core/dist'",
    subcomponents: { Action, Actions, Group, Options, Option, Label }
  },
  component: HvUserPreferences
};

export const Main = () => (
  <HvUserPreferences
    id="userPreferences"
    isOpen
    userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
  >
    <Actions>
      <Action
        label="Logout"
        icon={<LogOut />}
        onClick={(event, data) => {
          alert(`action ${data.label} selected`);
        }}
      />
    </Actions>
    <Options onClick={(event, payload) => alert(`id:${payload.id} label:${payload.label}`)}>
      <Group>
        <Option label="Personal Information" icon={<User />} />
        <Option label="Manage Groups" icon={<People />} />
        <Option label="Usage" icon={<BarChart />} />
        <Option label="Devices" icon={<GameController />} />
        <Option label="Recover Files" icon={<Components />} />
      </Group>
      <Group aria-labelledby="messages">
        <Label id="messages">Messages</Label>
        <Option label="Sharing Messages" icon={<Email />} />
        <Option label="File Conflicts" icon={<Energy />} />
      </Group>
      <Group label="Display Settings">
        <Option label="Appearance" icon={<Ghost />} />
        <Option label="Accessibility" icon={<WhiteBoard />} />
      </Group>
      <Group label="Help and Documentation">
        <Option label="Online Help" icon={<Help />} />
        <Option label="Documentation" icon={<Research />} />
      </Group>
    </Options>
  </HvUserPreferences>
);

export const WithOpenControl = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</HvButton>
      <HvUserPreferences
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
      >
        <Actions>
          <Action
            label="Logout"
            icon={<LogOut />}
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </Actions>
        <Options
          onClick={(event, payload) => console.log(`id:${payload.id} label:${payload.label}`)}
        >
          <Group>
            <Option label="Personal Information" icon={<User />} />
            <Option label="Manage Groups" icon={<People />} />
            <Option label="Usage" icon={<BarChart />} />
            <Option label="Devices" icon={<GameController />} />
            <Option label="Recover Files" icon={<Components />} />
          </Group>
          <Group aria-labelledby="messages">
            <Label id="messages">Messages</Label>
            <Option label="Sharing Messages" icon={<Email />} />
            <Option label="File Conflicts" icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option label="Appearance" icon={<Ghost />} />
            <Option label="Accessibility" icon={<WhiteBoard />} />
          </Group>
          <Group label="Help and Documentation">
            <Option label="Online Help" icon={<Help />} />
            <Option label="Documentation" icon={<Research />} />
          </Group>
        </Options>
      </HvUserPreferences>
    </>
  );
};
WithOpenControl.story = {
  parameters: {
    docs: {
      storyDescription: "User Preferences controlled."
    }
  }
};

export const TwoButtons = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton id="buttonTop" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
      <HvUserPreferences
        id="user-preferences"
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
      >
        <Actions>
          <Action
            id="action1"
            label="Logout"
            icon={<LogOut />}
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </Actions>
        <Options
          onClick={(event, data) => {
            console.log(`Option ${data.label} selected`);
          }}
        >
          <Group aria-labelledby="messages">
            <Label id="messages">Messages</Label>
            <Option id="option1" label="Sharing Messages" icon={<Email />} />
            <Option id="option2" label="File Conflicts" icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option id="option3" label="Appearance" icon={<Ghost />} />
            <Option id="option4" label="Accessibility" icon={<WhiteBoard />} />
          </Group>
        </Options>
      </HvUserPreferences>
      <HvButton id="buttonBottom" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
    </>
  );
};

TwoButtons.story = {
  parameters: {
    docs: {
      disable: true
    }
  }
};