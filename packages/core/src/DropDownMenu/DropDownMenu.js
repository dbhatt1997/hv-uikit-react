/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import FocusTrap from "focus-trap-react";
import uniqueId from "lodash/uniqueId";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import Popper from "../utils/Popper";
import List from "../List";

/**
 * Dropdown component with a menu.
 *
 * @param icon
 * @param classes
 * @param placement
 * @param dataList
 * @param id
 * @returns {*}
 * @constructor
 */
const DropDownMenu = ({
  theme,
  icon,
  classes,
  placement,
  dataList,
  id,
  disablePortal,
  onClick,
  keepOpened
}) => {
  const [open, setOpen] = useState(false);
  const [internalId] = useState(id || uniqueId("hv-dropdown-menu"));
  const anchorRef = React.useRef(null);

  const bottom = `bottom-${placement === "right" ? "start" : "end"}`;

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  /**
   * If the ESCAPE key is pressed the close handler must beSpace called.
   *Space
   * @param evt
   */
  const handleKeyDown = evt => {
    if (isKeypress(evt, KeyboardCodes.Esc)) {
      handleClose(evt);
    }
  };

  const handleKeyboardToggle = event => {
    if (
        isKeypress(event, KeyboardCodes.SpaceBar) ||
        isKeypress(event, KeyboardCodes.Enter)
    ) {
      handleToggle(event);
      event.preventDefault();
    }
  };

  return (
    <div id={internalId} className={classes.root}>
      <IconButton
        id={`${internalId}-icon-button`}
        buttonRef={anchorRef}
        aria-controls={open ? `${internalId}-list` : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        onKeyDown={handleKeyboardToggle}
        className={classNames(classes.icon, {
          [classes.iconSelected]: open
        })}
      >
        {icon}
      </IconButton>
      <Popper
        disablePortal={disablePortal}
        open={open}
        anchorEl={anchorRef.current}
        placement={bottom}
        popperOptions={{}}
        style={{ zIndex: theme.zIndex.tooltip }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <FocusTrap
            createOptions={{
              escapeDeactivates: false,
              allowOutsideClick: true,
              fallbackFocus: document.getElementById(
                `${internalId}-icon-button`
              )
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className={classes.menuList} onKeyDown={handleKeyDown}>
              <List
                id={`${internalId}-list`}
                values={dataList}
                selectable={false}
                onClick={item => {
                  if (!keepOpened) {
                    setOpen(false);
                  }
                  onClick(item);
                }}
                condensed
              />
            </div>
          </FocusTrap>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

DropDownMenu.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when selected.
     */
    iconSelected: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    menuList: PropTypes.string
  }).isRequired,
  /**
   * Icon.
   */
  icon: PropTypes.element.isRequired,
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - leftIcon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      leftIcon: PropTypes.func,
      showNavIcon: PropTypes.bool
    })
  ).isRequired,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Function executed in each onClick. Should received the clicked element.
   */
  onClick: PropTypes.func,
  /**
   * Keep the Dropdown Menu opened after clicking one option
   */
  keepOpened: PropTypes.bool
};

DropDownMenu.defaultProps = {
  id: undefined,
  placement: "left",
  disablePortal: false,
  onClick: null,
  keepOpened: true
};

export default DropDownMenu;
