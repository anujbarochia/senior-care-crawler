module.exports = async ({ context }) => {
  let { enqueueLinks, $ } = context;
  const links = $('#articles_container a[style=""]');
  console.log(`states found : ${links.length}`);
  await enqueueLinks({
    selector: '#articles_container a[style=""]',
    forefront: true,
    label: "STATE", // <= different label for STATE
  });
};
