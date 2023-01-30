import AddTipModal from "../components/AddTip";
import Profile from "../components/profile";

export default function ProfilePage() {
  return (
    <div className="main">
      <div className="w-[85%] m-auto pt-[70px]">
        <Profile />

        <div className="mb-4 flex gap-4 items-center mt-[20px]">
          <h3 className="text-xl font-semibold sm:text-2xl text-white ">
            Tipping Streams{" "}
          </h3>
          <AddTipModal />
        </div>
      </div>
    </div>
  );
}
