const { CheerioCrawler, Dataset, ProxyConfiguration } = require("crawlee");
require("dotenv").config();

const routes = require("./routes");
const { createObjectCsvWriter } = require("csv-writer");
const csvWriter = createObjectCsvWriter({
  path: "data.csv",
  header: [
    { id: "url", title: "url" },
    { id: "Nursing_Home_Name", title: "Nursing_Home_Name" },
    { id: "Address_Line_1", title: "Address_Line_1" },
    { id: "Address_Line_2", title: "Address_Line_2" },
    { id: "County", title: "County" },
    { id: "Legal Business Name", title: "Legal Business Name" },
    { id: "Ownership Type", title: "Ownership Type" },
    {
      id: "Changed Ownership In The Last 12 Months",
      title: "Changed Ownership In The Last 12 Months",
    },
    { id: "First Accepted Medicare", title: "First Accepted Medicare" },
    { id: "Capacity", title: "Capacity" },
    { id: "Average Residents", title: "Average Residents" },
    { id: "Percent Occupied", title: "Percent Occupied" },
    { id: "Program Participation", title: "Program Participation" },
    {
      id: "Resident And Family Councils",
      title: "Resident And Family Councils",
    },
    { id: "In Hospital", title: "In Hospital" },
    {
      id: "Continuing Care Retirement Community",
      title: "Continuing Care Retirement Community",
    },
    { id: "Special Focus Facility", title: "Special Focus Facility" },
    {
      id: "Auto Sprinkler System In Required Areas",
      title: "Auto Sprinkler System In Required Areas",
    },
  ],
});
const pushData = async (item) => {
  // Dataset.pushData(item);
  return csvWriter.writeRecords([item]);
  // return Dataset.pushData(item);
};

const proxyConfiguration = new ProxyConfiguration({
  proxyUrls: [process.env.proxy],
});

const crawler = new CheerioCrawler({
  proxyConfiguration,
  maxConcurrency: 1,
  useSessionPool: true,
  postNavigationHooks: [
    async ({ session, response, request }) => {
      if (response.statusCode === 403 || response.statusCode === 429) {
        session.retire();
        console.log(
          `Request blocked with status code : ${response.statusCode} - ${request.url} `
        );
        throw new Error(
          `Request blocked with status code : ${response.statusCode} - ${request.url}`
        );
      }
    },
  ],
  requestHandler: async (context) => {
    let { request } = context;
    console.log(`Opening page ${request.label} : ${request.url}`);
    switch (request.label) {
      case "NURSING_HOME":
        return routes.handleNursingHome({ context, pushData, csvWriter });
      case "CITY":
        return routes.handleCity({ context, pushData });
      // break;
      case "STATE":
        return routes.handleState({ context, pushData });
      // break;
      default:
        return routes.handleLanding({ context, pushData });
    }
  },
});

(async () => {
  await crawler.run(["https://www.seniorcare.com/nursing-homes/"]);
})();
