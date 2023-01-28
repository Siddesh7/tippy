import AddTipModal from "../components/AddTip";
import EditProfile from "../components/editProfile";

export default function ProfilePage() {
  return (
    <div className="w-[80%] m-auto">
      <div>
        <div className="mb-4 flex gap-4 items-center">
          <img
            src="https://mdbootstrap.com//img/Photos/Square/1.jpg"
            class="w-[80px] h-auto rounded-full"
            alt=""
          />
          <h3>Name</h3>
        </div>
        <div className="mb-4 flex gap-4 items-center">
          <h3> Your Account Details </h3>
          <EditProfile />
        </div>
        <div className="mb-4 flex gap-4 items-center">
          <h3>Tipping Streams </h3>
          <AddTipModal />
        </div>
      </div>
    </div>
  );
}
