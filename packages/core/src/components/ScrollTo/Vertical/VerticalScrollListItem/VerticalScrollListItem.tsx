import { HvBaseProps } from "@core/types";
import { HvTypographyProps } from "@core/components";
import { ExtractNames, setId } from "@core/utils";
import { CurrentStep } from "@hitachivantara/uikit-react-icons";
import { useTheme } from "@core/hooks";
import { staticClasses, useClasses } from "./VerticalScrollListItem.styles";

export { staticClasses as verticalScrollListItemClasses };

export type HvVerticalScrollListItemClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalScrollListItemProps extends HvBaseProps {
  /** A function component that renders a typography wrapped with a tooltip. */
  tooltipWrapper: React.FunctionComponent<{
    id?: string;
    className?: string;
    variant?: HvTypographyProps["variant"];
    children?: React.ReactNode;
  }>;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvVerticalScrollListItemClasses;
  /** Whether the element is selected. */
  selected?: boolean;
  /** The function to be executed when the element is clicked. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** The function to be executed when the element is clicked. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * HvVerticalScrollListItem a focusable item to be used as part of the vertical scroll
 */
export const HvVerticalScrollListItem = ({
  id,
  className,
  classes: classesProp,
  selected,
  "aria-label": ariaLabel,
  onClick,
  onKeyDown,
  tooltipWrapper,
  ...others
}: HvVerticalScrollListItemProps) => {
  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  const variant: HvTypographyProps["variant"] = selected ? "label" : "body";

  const labelId = setId(id, "label");

  const buttonId = setId(id, "button");

  const Tooltip = tooltipWrapper;

  const icon = selected ? (
    <CurrentStep
      height={activeTheme?.scrollTo.dotSelectedSize}
      width={activeTheme?.scrollTo.dotSelectedSize}
    />
  ) : (
    <div className={cx(classes.notSelected)} />
  );

  return (
    <li id={id} className={cx(className, classes.root)} aria-current={selected}>
      <div
        id={buttonId}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={classes.button}
        aria-label={ariaLabel}
        aria-labelledby={labelId}
        {...others}
      >
        <Tooltip id={labelId} className={classes.text} variant={variant}>
          {icon}
        </Tooltip>
      </div>
    </li>
  );
};
