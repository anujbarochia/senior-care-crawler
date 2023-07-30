module.exports = async ({ context }) => {
  let { enqueueLinks, $ } = context;
  const links = $('[style="line-height: 25px"] a');
  console.log(`cities found : ${links.length}`);
  await enqueueLinks({
    selector: '[style="line-height: 25px"] a',
    forefront: true,
    label: "CITY", // <= different label for CITY LINKS
  });
};
