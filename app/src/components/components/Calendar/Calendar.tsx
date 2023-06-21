import {
  DateRangeProp,
  HvCalendar,
  HvFormElement,
  HvLabel,
  VisibilitySelectorActions,
} from "@hitachivantara/uikit-react-core";
import { useState } from "react";

export const Calendar = () => {
  const [selectionDate, setSelectionDate] = useState<DateRangeProp>({
    startDate: new Date(2020, 7, 15),
    endDate: new Date(2020, 7, 29),
  });

  const [visibleMonth, setVisibleMonth] = useState(8);
  const [visibleYear, setVisibleYear] = useState(2020);

  const onChangeHandler = (
    event:
      | React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement | HTMLButtonElement
        >
      | undefined,
    value: Date | DateRangeProp
  ) => {
    if (value instanceof Date) {
      setSelectionDate({
        startDate: value,
        endDate: undefined,
      });
    }
    if (
      (selectionDate.startDate && selectionDate.endDate) ||
      value < selectionDate.startDate
    ) {
      setSelectionDate({
        startDate: value as Date,
        endDate: undefined,
      });
    } else {
      setSelectionDate({
        startDate: selectionDate.startDate,
        endDate: value as Date,
      });
    }
  };

  const visibleDateChangeHandler = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined,
    action: VisibilitySelectorActions,
    index?: Date | DateRangeProp | number
  ) => {
    if (action === "previous_month") {
      const previousMonth = visibleMonth - 1;
      if (previousMonth < 1) {
        setVisibleMonth(12);

        setVisibleYear(visibleYear - 1);
      } else {
        setVisibleMonth(previousMonth);
      }
    } else if (action === "next_month") {
      const nextMonth = visibleMonth + 1;

      if (nextMonth > 12) {
        setVisibleMonth(1);

        setVisibleYear(visibleYear + 1);
      } else {
        setVisibleMonth(nextMonth);
      }
    } else if (action === "previous_year") {
      setVisibleYear(visibleYear - 1);
    } else if (action === "next_year") {
      setVisibleYear(visibleYear + 1);
    } else if (action === "month") {
      setVisibleMonth(index as number);
    }
  };

  const availableDates = {
    minimumDate: new Date(2020, 5, 1),

    maximumDate: new Date(2020, 11, 10),
  };

  return (
    <div style={{ display: "flex" }}>
      <HvFormElement value={selectionDate}>
        <HvLabel id="multi-label" label="Multi-selection Calendar">
          <HvCalendar
            id="main-calendar"
            onChange={onChangeHandler}
            onInputChange={onChangeHandler}
            onVisibleDateChange={visibleDateChangeHandler}
            visibleMonth={visibleMonth}
            visibleYear={visibleYear}
            minimumDate={availableDates.minimumDate}
            maximumDate={availableDates.maximumDate}
            locale="en-US"
            showDayOfWeek={false}
          />
        </HvLabel>
      </HvFormElement>
    </div>
  );
};
