import { getBase64Image } from "@/utils/images";

const SOCK_BG_COLOR = "#030712";

export function BasepaintImage({
  tokenId,
  palette,
  image,
  title,
  contributorCount,
  proposer,
  mintDate,
  requestOrigin,
}: {
  tokenId: string;
  palette: string[];
  image: string;
  title: string;
  contributorCount: number;
  proposer: string;
  mintDate: string;
  requestOrigin: string;
}) {
  const withEvenColors =
    palette.length % 2 === 0 ? palette : [...palette, SOCK_BG_COLOR];

  const [oddColors, evenColors] = withEvenColors.reduce<
    [Array<string>, Array<string>]
  >(
    (acc, curr, i) => {
      if (i % 2 === 0) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "RobotoMono",
        backgroundColor: SOCK_BG_COLOR,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Cuff */}
      <div
        style={{
          height: 200,
          backgroundColor: "#014BE5",
        }}
      />

      {/* Pixel art design area */}
      <div
        style={{
          display: "flex",
        }}
      >
        <DesignSidebars colors={evenColors} side="left" tokenId={tokenId} />

        <div
          style={{
            height: 2800,
            width: 2800,
            backgroundImage: `url(${image})`,
            backgroundColor: "red",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />

        <DesignSidebars colors={oddColors} side="right" tokenId={tokenId} />
      </div>

      {/* Empty space */}
      <div
        style={{
          height: 540,
        }}
      />

      {/* Metadata */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <LogoBottom requestOrigin={requestOrigin} />
        <div
          style={{
            flexGrow: 1,
            fontSize: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>{`Day #${tokenId}`}</div>
          <div
            style={{
              display: "flex",
              margin: "80px 0",
              gap: 30,
            }}
          >
            {palette.map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  height: 76,
                  width: 76,
                }}
              />
            ))}
          </div>
          <div>{title}</div>

          <div
            style={{
              height: 121,
              width: 300,
              margin: "277px 0",
              backgroundImage: `url("${getBase64Image("logo-white.png")}")`,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              alignItems: "center",
            }}
          >
            <Datum label="Contributors" value={contributorCount} />
            <Datum label="Proposer" value={proposer} />
            <Datum label="Mint Date" value={mintDate} />
          </div>
        </div>
        <LogoBottom requestOrigin={requestOrigin} />
      </div>
    </div>
  );
}

function DesignSidebars({
  colors,
  side,
  tokenId,
}: {
  colors: string[];
  side: "left" | "right";
  tokenId: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 100,
        padding: side === "left" ? "16px 16px 0px 8px" : "16px 8px 0px 16px",
        gap: 16,
      }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            height: 76,
            width: 76,
            backgroundColor: color,
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 180,
          marginTop: 80,
        }}
      >
        {tokenId.split("").map((digit, i) => (
          <div
            style={{
              marginBottom: "-60px",
              transform:
                side === "left" ? "translateX(-60px)" : "translateX(30px)",
            }}
            key={i}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoBottom({ requestOrigin }: { requestOrigin: string }) {
  return (
    <div
      style={{
        width: 700,
        height: 1760,
        backgroundImage: `url("${getBase64Image("logo-bottom-pattern.png")}")`,
        backgroundSize: "contain",
      }}
    />
  );
}

function Datum({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: "flex",
        fontSize: 50,
        gap: 50,
      }}
    >
      <div style={{ display: "flex", color: "#9CA3AF" }}>{label}</div>
      <div style={{ display: "flex" }}>{value}</div>
    </div>
  );
}
