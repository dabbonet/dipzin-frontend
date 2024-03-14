// components/UserDetailsForm.tsx
import React from "react";
import Icons from "../../components/icons/Icons";

interface UserDetailsFormProps {
  userDetails: {
    name: string;
    username: string;
    file: File | null;
    src: string | null;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  userDetails,
  onChange,
  onSubmit,
}) => {
  return (
    <form action="" onSubmit={onSubmit}>
      <div className="flex gap-4 mt-4 mb-4">
        <div className=" bg-slate-800 p-1 border border-dotted border-slate-600 rounded-2xl">
          <div className="bg-slate-700 w-14 h-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
            <label
              htmlFor="label"
              className=" w-full h-full cursor-pointer flex justify-center items-center relative z-50"
            >
              {userDetails.src ? (
                <img
                  src={userDetails.src}
                  className="w-full h-full object-cover"
                  id="image"
                />
              ) : (
                <Icons.addImage className="absolute bottom-2 right-2" />
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              className=" hidden"
              id="label"
              onChange={onChange}
              // onClick={(e) => {
              //     let { files }: any = e.target
              //     files = {}
              //     console.log(files)
              // }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className=" text-sm text-white">Upload a Profile Picture</p>
          <p className=" text-slate-600 text-sm">
            Supported formats: jpg, png maximum size: 2MB
          </p>
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 mb-4">
        <label htmlFor="name" className=" text-slate-300">
          Name <span className=" text-aqua-300">*</span>
        </label>
        <input
          required
          type="text"
          onChange={onChange}
          id="name"
          value={userDetails.name}
          placeholder="Full Name"
          className=" bg-slate-950/70 border border-solid border-slate-800 rounded-xl px-4 py-3"
        />
      </div>
      <div className=" flex flex-col gap-y-2 mb-4">
        <label htmlFor="username" className=" text-slate-300">
          Username <span className=" text-aqua-300">*</span>
        </label>
        <input
          required
          type="text"
          onChange={onChange}
          id="username"
          value={userDetails.username}
          placeholder="@dipzin"
          className=" bg-slate-950/70 border border-solid border-slate-800 rounded-xl px-4 py-3"
        />
      </div>
      <div className=" mb-4">
        <p className=" text-slate-300">
          Notifications <span className=" text-aqua-300">*</span>
        </p>
        <p className=" text-slate-500 font-medium text-xs">
          Choose type of notifications you want to receive
        </p>
      </div>
      <div className=" flex justify-end gap-x-4">
        <button
          className=" rounded-lg bg-gradient-to-tr from-aqua-400 to-aqua-600 py-2 px-9 text-sm font-medium text-aqua-950"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default UserDetailsForm;
