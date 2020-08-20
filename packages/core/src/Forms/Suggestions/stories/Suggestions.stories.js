import React, { useState, useRef } from "react";

import { parser } from "html-react-parser";

import { HvFormElement, HvLabel, HvBaseInput, HvButton, HvSuggestions } from "../../..";
import { KeyboardCodes, isKeypress } from "../../../utils";

import countryList from "../../../Input/stories/countries";

export default {
  title: "Components/Forms/Suggestions",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSuggestions } from '@hv/uikit-react-core/dist'",
    v3: true
  },
  component: HvSuggestions,
  decorators: [
    Story => (
      <div style={{ width: 500, height: 200 }}>
        <Story />
      </div>
    )
  ]
};

const { Esc, Tab } = KeyboardCodes;

export const Main = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    const matches = suggestions.filter(v => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput inputRef={inputRef} placeholder="Insert country" onChange={handleChange} />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

Main.story = {
  parameters: {
    v3: true,
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const ServerSideSuggestions = () => {
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // Server-side mock function
  const fetchCountries = input =>
    new Promise(resolve => {
      const countries = countryList
        .filter(c => c.toUpperCase().includes(input.toUpperCase()))
        .slice(0, 8);

      setTimeout(() => resolve(countries), 300);
    });

  const handleChange = (e, val) => {
    setValue(val);
    setOpen(false);
    if (val.length < 1) return;
    fetchCountries(val).then(countries => {
      setSuggestionList(countries);
      setOpen(countries.length >= 1);
    });
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput inputRef={inputRef} placeholder="Insert country" onChange={handleChange} />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

ServerSideSuggestions.story = {
  parameters: {
    v3: true,
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const OpenWithDownArrow = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    const matches = suggestions.filter(v => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleKey = e => {
    if (isKeypress(e, KeyboardCodes.ArrowDown)) {
      setOpen(true);
      document.getElementById("suggestions-list-item-0")?.focus();
    }
  };

  const handleSuggestionsKey = evt => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <>
      <HvFormElement value={value}>
        <HvLabel id="countries" label="Select country">
          <HvBaseInput
            inputRef={inputRef}
            placeholder="Insert country"
            onChange={handleChange}
            onKeyDown={handleKey}
          />
          <HvSuggestions
            id="suggestions"
            expanded={open}
            anchorEl={inputRef.current?.parentElement}
            onClose={() => setOpen(false)}
            onKeyDown={handleSuggestionsKey}
            onSuggestionSelected={handleSelection}
            suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
          />
        </HvLabel>
      </HvFormElement>
      <HvButton category="ghost">Submit</HvButton>
    </>
  );
};

OpenWithDownArrow.story = {
  parameters: {
    v3: true,
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const WithHighlighter = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("auto-complete");
  const inputRef = useRef(null);

  const filterHighlighter = searchString => {
    const reg = new RegExp(searchString, "gi");

    switch (mode) {
      case "auto-complete":
        return suggestions
          .filter(v => v.toUpperCase().startsWith(searchString.toUpperCase()))
          .map(match => ({
            value: match,
            label: parser(`${match.replace(reg, "<b>$&</b>")}`)
          }));

      case "auto-suggest":
        return suggestions
          .filter(v => v.toUpperCase().includes(searchString.toUpperCase()))
          .map(match => ({
            value: match,
            label: parser(`<b>${match.replace(reg, "</b>$&<b>")}</b>`)
          }));

      default:
        return searchString;
    }
  };

  const handleChange = (e, val) => {
    const newList = val.length >= 1 ? filterHighlighter(val) : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.value);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <>
      <HvTypography>
        Current mode:
        <b>{mode}</b>
      </HvTypography>
      <HvButton
        onClick={() => setMode(mode === "auto-complete" ? "auto-suggest" : "auto-complete")}
      >
        Change mode
      </HvButton>
      <p />
      <HvFormElement value={value}>
        <HvLabel id="countries" label="Select country">
          <HvBaseInput inputRef={inputRef} placeholder="Insert country" onChange={handleChange} />
          <HvSuggestions
            expanded={open}
            anchorEl={inputRef.current?.parentElement}
            onClose={() => setOpen(false)}
            onKeyDown={handleSuggestionsKey}
            onSuggestionSelected={handleSelection}
            suggestionValues={suggestionList.map((elem, id) => ({
              id: String(id),
              label: elem.label,
              value: elem.value
            }))}
          />
        </HvLabel>
      </HvFormElement>
    </>
  );
};

WithHighlighter.story = {
  parameters: {
    v3: true,
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};
