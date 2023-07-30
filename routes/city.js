module.exports = async ({ context }) => {
  let { enqueueLinks, $ } = context;
  const links = $(".facilities h2>a");
  console.log(`facilities found : ${links.length}`);
  await enqueueLinks({
    selector: ".facilities h2>a",
    forefront: true,
    label: "NURSING_HOME", // <= different label for STATE
  });
};
