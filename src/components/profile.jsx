import EditProfile from "./editProfile";

export default function Profile({ wallet, name, twitter }) {
  return (
    <div className="flex flex-col justify-center w-full p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100 relative">
      <div className="absolute right-[10px] top-[10px] ">
        <EditProfile />
      </div>
      <img
        src="https://source.unsplash.com/150x150/?portrait?3"
        alt=""
        className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">Siddesh</h2>
          <p className="px-5 text-xs sm:text-base dark:text-gray-400">
            {`@0xSiddesh`}
          </p>
        </div>
      </div>
    </div>
  );
}
