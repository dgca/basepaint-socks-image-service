import { Hono } from "hono";
import satori from "satori";
import { format } from "date-fns";
import { Resvg } from "@resvg/resvg-js";
import { fonts } from "@/fonts";
import { BasepaintImage } from "@/components/RenderImage";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/image/:tokenId", async (c) => {
  const tokenId = c.req.param("tokenId");

  const tokenDataResponse = await fetch(
    `https://basepaint.xyz/api/art/${Number(tokenId).toString(16)}`
  );

  if (!tokenDataResponse.ok) {
    return c.text("Internal server error", 500);
  }

  const tokenData = await tokenDataResponse.json();

  const title = tokenData.attributes.find(
    (attr: Record<string, string>) => attr.trait_type === "Theme"
  )?.value;
  const colors = tokenData.attributes
    .filter((attr: Record<string, string>) =>
      attr.trait_type.startsWith("Color #")
    )
    .map((attr: Record<string, string>) => attr.value);
  const contributorCount = tokenData.attributes.find(
    (attr: Record<string, string>) => attr.trait_type === "Contributor Count"
  )?.value;
  const proposer = tokenData.attributes.find(
    (attr: Record<string, string>) => attr.trait_type === "Proposer"
  )?.value;
  const mintDate = tokenData.attributes.find(
    (attr: Record<string, string>) => attr.trait_type === "Mint Date"
  )?.value;
  const formattedDate = format(new Date(mintDate * 1000), "MMM d, yyyy");

  const svg = await satori(
    <BasepaintImage
      tokenId={tokenId}
      palette={colors}
      image={tokenData.image}
      title={title}
      contributorCount={contributorCount}
      proposer={proposer}
      mintDate={formattedDate}
      requestOrigin={"http://localhost:3000"}
    />,
    {
      width: 3000,
      height: 5200,
      fonts,
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const png = pngData.asPng().buffer as ArrayBuffer;

  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET");
  c.header("Content-Type", "image/png");
  c.header("Cache-Control", "public, max-age=31536000, immutable");

  return c.body(png);
});

export default app;
