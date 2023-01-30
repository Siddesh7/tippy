import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import "../App.css";
export default function Main() {
  const { address } = useAccount();
  return (
    <div className="px-6 py-12 lg:py-24 md:px-12 text-center lg:text-left h-[80vh] main">
      <div className="container mx-auto text-gray-800">
        <div className="grid lg:grid-cols-[3fr,1fr] gap-12 flex items-center">
          <div className="mt-12 lg:mt-0" style={{ zIndex: 10 }}>
            <h1
              className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Start Streaming
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                tip to your favorite threador
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
