import logo from "../../assets/logo.svg";
import info from "../../assets/info.svg";
import transfer from "../../assets/transfer.svg";
import bgImage from "../../assets/bgImage.png"; // <-- Your background image

export function Header() {
  return (
    <div
      className="relative w-full text-white px-6 pt-6 pb-20 bg-cover bg-bottom bg-no-repeat min-h-[40vh]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center mb-4">
        <img src={logo} alt="Apple" className="h-24 w-24" />
      </div>

      <div className="text-center space-y-1">
        <h1 style={{fontFamily: 'font-sans'}} className="text-4xl font-bold">Welcome, Robert</h1>
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">$0.</p>
          <p className="text-3xl text-white/70">00</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm text-white/70">Available balance</p>
          <img src={info} alt="Apple" className="h-6 w-6 ml-1" />
        </div>
        <div className="flex items-center justify-center">
          <button className="mt-4 bg-lime-200 flex items-center justify-center text-emerald-900 px-4 py-2 rounded-full text-sm font-semibold">
            Transfer in
            <img src={transfer} alt="Apple" className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
