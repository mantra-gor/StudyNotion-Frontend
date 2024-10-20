import { MdOutlineAutoDelete } from "react-icons/md";

function AccountDeletion() {
  return (
    <div className="flex gap-5 bg-pink-900 p-6 rounded-md border border-pink-700">
      <div className="flex justify-center items-center w-fit h-fit rounded-full bg-pink-700 text-pink-200 p-3">
        <MdOutlineAutoDelete size={26} />
      </div>
      <div className="text-pink-5">
        <h4 className="font-bold text-lg">Delete Account</h4>
        <p>Would you like to delete account?</p>
        <p>
          This account contains Paid Courses. Deleting your account will remove
          all the contain associated with it.
        </p>
        <p className="text-sm mt-3 text-pink-25 italic">
          If you delete your account now, it will be permanently removed from
          our database in next four days. If you want to keep it, then you have
          to login again with the same credentials!
        </p>
        <button className="py-2 px-4 mt-4 rounded-md bg-pink-300 hover:brightness-95 transition-all duration-200 active:bg-pink-400 border border-pink-200">
          I want to delete my account
        </button>
      </div>
    </div>
  );
}

export default AccountDeletion;
