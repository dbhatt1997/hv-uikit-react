import React from "react";
import HvBanner from "@hv-ui/react/core/Banner";
import Button from "@material-ui/core/Button";

class SimpleBanner extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (action, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const {
      message,
      variant,
      showIcon,
      anchorOrigin,
      action,
      customIcon
    } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          onClick={this.handleClick}
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
        >
          Click Me
        </Button>
        <HvBanner
          open={open}
          message={`This is ${message}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          action={action}
        />
      </div>
    );
  }
}

const ActionButton = () => (
  <a
    href="https://i.imgflip.com/yrj3h.jpg"
    style={{
      color: "#146BD2",
      fontSize: "14px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      "text-decoration": "none"
    }}
  >
    Action
  </a>
);

const ActionButtonCollection = () => (
  <div
    style={{ display: "flex", width: "100px", justifyContent: "space-between" }}
  >
    <ActionButton />
    <ActionButton />
  </div>
);



export default (
  <SimpleBanner
    message="default"
    variant="default"
    showIcon
    action={<ActionButtonCollection />}
  />
);
