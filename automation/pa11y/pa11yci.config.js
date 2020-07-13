const puppeteer = require("puppeteer");

const url = (process.env.STORYBOOK_URL || "http://localhost:9001") + "/iframe.html";
const filter = process.env.STORY;

function getStories(url, filter) {
  // only for storybook >= 5.2
  // might need to be changed with storybook 6.x
  const clientAPI = window.__STORYBOOK_CLIENT_API__;
  const stories = clientAPI.raw();

  return Promise.resolve(
    stories
      .filter(
        s =>
          // test only core components
          (s.kind && s.kind.indexOf("Components/") === 0) ||
          // allow lab components if they provide a pa11y configuration (even if empty)
          (s.parameters != null && s.parameters.pa11y != null)
      )
      .filter(
        s =>
          s.parameters == null || s.parameters.pa11y == null || s.parameters.pa11y.disable !== false
      )
      // TODO Remove before major release
      .filter(
        s =>
          s.parameters != null && s.parameters.v3
      )
      .filter(s => filter == null || s.id.indexOf(filter.toLowerCase()) !== -1)
      .map(s => ({
        url: url + "?id=" + s.id,
        ...s.parameters.pa11y
      }))
  );
}

module.exports = (async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  const stories = await page
    .goto(url)
    .then(() => page.evaluate(getStories, url, filter))
    .catch(error => {
      console.log(error.message);
    })
    .finally(() => {
      browser.close();
    });

  if (stories == null) {
    process.exit(1);
  }

  const pa11yciConfig = {
    defaults: {
      timeout: 15000,
      ignore: [
        "region",
        // Disabling contrast tests due to inconsistent false positives
        // https://github.com/pa11y/pa11y/issues/422
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast"
      ],
      runners: ["htmlcs", "axe"],
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporter: "json",
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    urls: stories
  };

  return pa11yciConfig;
})();
