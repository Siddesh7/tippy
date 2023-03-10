import { ConnectKitButton } from "connectkit";
export default function Navbar() {
  return (
    <nav className="navbar  py-2 relative flex items-center w-full justify-between py-[14px] bg-white">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <a className="navbar-brand" href="/">
          <h2
            className="font-bold leading-tight text-4xl mt-0 mb-2 bg-gradient-to-r bg-clip-text  text-transparent 
            from-black via-[#91e02a] via-[#e0ce2a] via-[#82e02a] to-black
            animate-text"
          >
            StreamThaTip
          </h2>
        </a>

        <div className="flex items-center lg:ml-auto">
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  );
}
