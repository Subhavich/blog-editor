const fetch = require("node-fetch");
const FormData = require("form-data");

const switchIndex = (array, index, increment) => {
  const targetedIndex = index;
  const targetedSwitchIndex = index + increment;
  const indexValid =
    targetedSwitchIndex >= 0 && targetedSwitchIndex < array.length;
  if (!indexValid) {
    return "forbidden";
  }
  const copiedArray = [...array];
  const saved = copiedArray[targetedIndex];
  copiedArray[targetedIndex] = copiedArray[targetedSwitchIndex];
  copiedArray[targetedSwitchIndex] = saved;
  return copiedArray;
};

async function uploadToCloudflare(imageBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append("file", imageBuffer, `${fileName}.jpg`);
    formData.append("metadata", JSON.stringify({ key: "value" }));
    formData.append("requireSignedURLs", "false");

    const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;
    const buffer = formData.getBuffer();
    const headers = {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      "Content-Length": buffer.length,
    };

    const cfResponse = await fetch(cloudflareUrl, {
      method: "POST",
      headers,
      body: buffer,
    });

    const cfData = await cfResponse.json();
    if (!cfResponse.ok) {
      console.error("❌ Cloudflare Upload Error:", cfData.errors);
      return null;
    }

    // Construct Cloudflare URL
    const imageId = cfData.result?.id;
    if (imageId) {
      return process.env.CLOUDFLARE_IMG_URL.replace(
        "<image_id>",
        imageId
      ).replace("<variant_name>", "public"); // Adjust variant name if needed
    }
    return null;
  } catch (error) {
    console.error("❌ Cloudflare Upload Failed:", error);
    return null;
  }
}

module.exports = { uploadToCloudflare };
