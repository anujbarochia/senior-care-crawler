module.exports = async ({ context, pushData }) => {
  let { $, request } = context;
  // data = [];
  const nursingHomeName = $("h1").text(); //Nursing Home Name
  const parts = $("#featured_bg_content")
    .clone()
    .children("h2")
    .remove()
    .end()
    .html()
    .trim()
    .split("<br>");
  const address1 = parts[0];
  const address2 = parts[1];
  const addressCounty = parts[parts.length - 2].split(":")[1].trim();
  const result = {
    url: request.url,
    Nursing_Home_Name: nursingHomeName,
    Address_Line_1: address1,
    Address_Line_2: address2,
    County: addressCounty,
  };
  $("table.table-condensed")
    .filter((i, el) => $(el).text().includes("Legal Business Name"))
    .find("tr")
    .each((i, el) => {
      result[$("td", el).first().text()] = $("td", el).last().text();
    });
  // data.push(result);
  // await csvWriter.writeRecords(result);
  await pushData(result).then("csv written");
};
