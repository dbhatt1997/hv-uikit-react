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

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import HvLink from "@hv/uikit-react-core/dist/Link";

class NavigationAnchors extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      selectedIndex: props.selectedIndex || 0
    }
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });

    const { href, onClick } = this.props;
    if (!href && onClick) {
      onClick(event, index);
    }
  };

  render() {
    const { classes, options, href, floating } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Drawer
        className={classNames(classes.drawer, classes.dense)}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: classNames(classes.drawerPaper,{[classes.drawerPaperPositionInherit]: !floating })
        }}
      >
        <List
          dense
          classes={{
            root: classes.listRoot,
            dense: classes.listDense
          }}
        >
          {options.map((option, index) => {
            const listItem = (
              <ListItem
                button
                classes={{
                  selected: classes.listItemSelected,
                  root: classes.listItemRoot,
                  gutters: classes.listItemGutters
                }}
                key={option.key || option.label}
                onClick={event => this.handleListItemClick(event, index)}
                selected={selectedIndex === index}
              >
                <ListItemText
                  className={classNames({
                    [classes.listItemTextSelected]: selectedIndex === index
                  })}
                  classes={{
                    dense: classes.listItemTextDense
                  }}
                  primary={option.label}
                />
              </ListItem>
            );

            if (href) {
              return (
                <HvLink route={`#${options[index].value}`} key={option.key || option.label}>
                  {listItem}
                </HvLink>
              );
            }

            return listItem;
          })}
        </List>
      </Drawer>
    );
  }
}

NavigationAnchors.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (
        propValue[key].label === undefined ||
        propValue[key].value === undefined
      ) {
        return new Error(
          `Invalid prop "${propFullName}" supplied to "${componentName}". Validation Failed.`
        );
      }
      return null;
    }
  ).isRequired,
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href: PropTypes.bool,
  /**
   * A callback called on click of every list item, if the href is false
   */
  onClick: PropTypes.func,
  /**
   * Whether the anchors are always in a fixed position
   */
  floating: PropTypes.bool,
  /**
   * Currently selected index passed from the parent.
   */
  selectedIndex: PropTypes.number,
};

NavigationAnchors.defaultProps = {
  href: true,
  onClick: undefined,
  floating: true,
  selectedIndex: 0
};

export default NavigationAnchors;
