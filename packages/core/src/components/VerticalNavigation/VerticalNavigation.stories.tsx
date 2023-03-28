import {
  BarChart,
  Deploy,
  LogOut,
  Open,
  User,
} from "@hitachivantara/uikit-react-icons";
import { StoryObj } from "@storybook/react";
import { useEffect, useMemo, useState } from "react";
import { HvVerticalNavigationAction } from "./Actions/Action";
import { HvVerticalNavigationActions } from "./Actions/Actions";
import { HvVerticalNavigationHeader } from "./Header/Header";
import {
  HvVerticalNavigationTree,
  NavigationData,
} from "./Navigation/Navigation";
import {
  HvVerticalNavigation,
  HvVerticalNavigationProps,
} from "./VerticalNavigation";

export default {
  title: "Widgets/Vertical Navigation",
  component: HvVerticalNavigation,
};

export const Main: StoryObj<HvVerticalNavigationProps> = {
  args: {},
  argTypes: {},
  render: () => {
    const navigationData = useMemo(
      () => [
        { id: "00", label: "Overview" },
        { id: "01", label: "Analytics", selectable: false },
        {
          id: "02",
          label: "Storage",
          data: [
            {
              id: "02-01",
              label: "Cloud",
              data: [
                {
                  id: "02-01-01",
                  label: "Servers",
                  href: "https://www.hitachivantara.com/en-us/news.html",
                },
                {
                  id: "02-01-02",
                  label: "HCP Anywhere",
                  href: "/?path=/story/structure-vertical-navigation--main",
                },
                {
                  id: "02-01-03",
                  label: "This Computer",
                  disabled: true,
                },
              ],
            },
          ],
        },
        {
          id: "03",
          label: "Administration",
          data: [
            {
              id: "03-01",
              label: "Rest API",
              data: [
                {
                  id: "03-01-01",
                  label: "Log Bundle",
                },
              ],
            },
          ],
        },
      ],
      []
    );

    const [value, setValue] = useState("00");
    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation id="sample1">
          <HvVerticalNavigationTree
            aria-label="Example 1 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              if (data.id === "02-01-01") {
                event.preventDefault();
                event.stopPropagation();
              }
              setValue(data.id);
            }}
            data={navigationData}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const TreeViewMode: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const navigationData = useMemo(
      () => [
        { id: "00", label: "Instalation Overview" },
        {
          id: "01",
          label: "Hardware",
          data: [
            {
              id: "01-01",
              label: "Ambient Monitoring",
            },
            {
              id: "01-02",
              label: "Server Status Summary",
            },
          ],
        },
        {
          id: "02",
          label: "System",
          data: [
            {
              id: "02-01",
              label: "Buckets",
            },
            {
              id: "02-02",
              label: "Admin Users",
            },
            {
              id: "02-03",
              label: "Log Bundle",
              data: [
                {
                  id: "02-03-01",
                  label: "Rest API",
                },
                {
                  id: "02-03-02",
                  label: "License",
                },
              ],
            },
          ],
        },
      ],
      []
    );

    const [value, setValue] = useState("01-01");

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation>
          <HvVerticalNavigationTree
            mode="treeview"
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              setValue(data.id);
            }}
            data={navigationData}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const WithoutActions: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const navigationData = useMemo(
      () => [
        {
          id: "01",
          label: "System",
          data: [
            {
              id: "01-01",
              label: "SCPodF",
              data: [
                {
                  id: "01-01-01",
                  label: "Compute",
                },
                {
                  id: "01-01-02",
                  label: "Storage",
                },
                {
                  id: "01-01-03",
                  label: "Ethernet",
                },
                {
                  id: "01-01-04",
                  label: "Fiber Channel",
                  payload: { path: "/hello/world", params: { a: 2, b: "3" } },
                },
              ],
            },
          ],
        },
        {
          id: "02",
          label: "Administration",
          data: [
            {
              id: "02-01",
              label: "Rest API",
            },
            {
              id: "02-02",
              label: "License",
            },
            {
              id: "02-03",
              label: "Some big text that shouldn't fit",
              data: [
                {
                  id: "02-03-01",
                  label: "Rest API",
                },
                {
                  id: "02-03-02",
                  label: "License",
                },
              ],
            },
            {
              id: "02-04",
              label: "Log Bundle",
            },
          ],
        },
      ],
      []
    );

    const [value, setValue] = useState("02-03-02");

    return (
      <div style={{ display: "flex", width: 220 }}>
        <HvVerticalNavigation id="sample2">
          <HvVerticalNavigationTree
            aria-label="Example 1 navigation"
            selected={value}
            onChange={(event, data) => {
              setValue(data.id);
            }}
            data={navigationData}
          />
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const Collapsible: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
        { id: "00", label: "Instalation Overview" },
        {
          id: "01",
          label: "Hardware",
          icon: <BarChart />,
          data: [
            {
              id: "01-01",
              label: "Ambient Monitoring",
            },
            {
              id: "01-02",
              label: "Server Status Summary",
            },
          ],
        },
        {
          id: "02",
          label: "System",
          data: [
            {
              id: "02-01",
              label: "Buckets",
            },
            {
              id: "02-02",
              label: "Admin Users",
            },
            {
              id: "02-03",
              label: "Log Bundle",
              data: [
                {
                  id: "02-03-01",
                  label: "Rest API",
                },
                {
                  id: "02-03-02",
                  label: "License",
                },
              ],
            },
          ],
        },
      ]);
    }, []);

    const [value, setValue] = useState("01-01");

    const [show, setShow] = useState(false);

    const handleIsExpanded = () => {
      setShow(!show);
    };

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation open={show} collapsedMode={"simple"}>
          <HvVerticalNavigationHeader
            title="Menu"
            onClick={handleIsExpanded}
            buttonProps={{
              "aria-label": "collapseButton",
              "aria-expanded": show,
            }}
          />
          <HvVerticalNavigationTree
            mode="treeview"
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              setValue(data.id);
            }}
            data={navigationDataState}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};

export const CollapsibleIcons: StoryObj<HvVerticalNavigationProps> = {
  render: () => {
    const [navigationDataState, setNavigationDataState] = useState<
      NavigationData[]
    >([]);

    useEffect(() => {
      setNavigationDataState([
        { id: "00", label: "Instalation Overview", icon: <Open /> },
        {
          id: "01",
          label: "Hardware",
          icon: <BarChart />,
          selectable: true,
          data: [
            {
              id: "01-01",
              label: "Ambient Monitoring",
            },
            {
              id: "01-02",
              label: "Server Status Summary",
            },
          ],
        },
        {
          id: "02",
          label: "System",
          icon: <Deploy />,
          selectable: true,
          data: [
            {
              id: "02-01",
              label: "Buckets",
              icon: <Deploy />,
            },
            {
              id: "02-02",
              label: "Admin Users",
            },
            {
              id: "02-03",
              label: "Log Bundle",
              data: [
                {
                  id: "02-03-01",
                  label: "Rest API",
                },
                {
                  id: "02-03-02",
                  label: "License",
                },
              ],
            },
          ],
        },
        {
          id: "03",
          label: "System 2",
          // icon: <Deploy />,
          selectable: true,
          data: [
            {
              id: "03-01",
              label: "Buckets",
            },
            {
              id: "03-02",
              label: "Admin Users",
            },
            {
              id: "03-03",
              label: "Log Bundle",
              data: [
                {
                  id: "03-03-01",
                  label: "Rest API",
                },
                {
                  id: "03-03-02",
                  label: "License",
                },
              ],
            },
          ],
        },
      ]);
    }, []);

    const [value, setValue] = useState("01-01");

    const [show, setShow] = useState(false);

    const handleIsExpanded = () => {
      setShow(!show);
    };

    return (
      <div style={{ display: "flex", width: 220, height: 530 }}>
        <HvVerticalNavigation open={show} collapsedMode={"icon"}>
          <HvVerticalNavigationHeader
            title="Menu"
            onClick={handleIsExpanded}
            buttonProps={{
              "aria-label": "collapseButton",
              "aria-expanded": show,
            }}
          />
          <HvVerticalNavigationTree
            mode="treeview"
            collapsible
            defaultExpanded
            aria-label="Example 3 navigation"
            selected={value}
            onChange={(event, data) => {
              console.log(data);
              setValue(data.id);
            }}
            data={navigationDataState}
          />
          <HvVerticalNavigationActions>
            <HvVerticalNavigationAction label="Profile" icon={<User />} />
            <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
          </HvVerticalNavigationActions>
        </HvVerticalNavigation>
      </div>
    );
  },
};
