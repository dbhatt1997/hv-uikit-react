import { getClasses } from "utils";

export type HvBaseSwitchClasses = {
  /** Styles applied to the component. */
  root?: string;
  /** Styles applied to the switch when it is disabled. */
  disabled?: string;
  /** Styles applied to the switch when it is in read only mode. */
  readOnly?: string;
  /** Styles applied to the internal Switch component's root class. */
  switch?: string;
  /** Styles applied to the internal SwitchBase component's root class. */
  switchBase?: string;
  /** Pseudo-class applied to the internal SwitchBase component's checked class. */
  checked?: string;
  /** Styles applied to the track element. */
  track?: string;
  /** Styles used to create the thumb passed to the internal SwitchBase component icon prop. */
  thumb?: string;
  /** Class applied to the root element if keyboard focused. */
  focusVisible?: string;
};

const classKeys: string[] = [
  "root",
  "disabled",
  "readOnly",
  "switch",
  "switchBase",
  "checked",
  "track",
  "thumb",
  "focusVisible",
];

export const baseSwitchClasses = getClasses<HvBaseSwitchClasses>(
  classKeys,
  "HvBaseSwitch"
);

export * from "./BaseSwitch";