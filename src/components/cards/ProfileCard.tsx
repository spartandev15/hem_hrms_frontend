import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useRef, useState } from "react";
import { useGetProfileQuery } from "../../redux/api/profile";

const profilePhoto = "/images/profile.png";

const ProfileCard = () => {
  const { data: userData, isLoading } = useGetProfileQuery();
  const [previewImage, setPreviewImage] = useState(null);
  const profilePicRef = useRef<HTMLInputElement | null>(null);

  const changeProfilePicture = (e) => {
    try {
      const file = e.target.files[0];
      // if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setPreviewImage(reader.result); // Set preview image URL
      //   };
      //   reader.readAsDataURL(file);

      //   const formData = new FormData();
      //   formData.append("profile_photo", file);
      //   dispatch(updateProfile(formData));
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="border border-gray-200 rounded-md p-3 shadow-sm viewem">
    //   <div className="">
    //     {previewImage ? (
    //       <img
    //         src={previewImage}
    //         className="rounded-full object-cover  cursor-pointer"
    //         onClick={() => {
    //           // profilePicRef.current.click();
    //         }}
    //       />
    //     ) : (
    //       <img
    //         src={`${
    //           userData?.user?.profile_photo ||
    //           "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
    //         }`}
    //         alt="user-profile-image"
    //         // style={{
    //         //   width: "20px",
    //         //   height: "20px",
    //         // }}
    //         className=" h rounded-full object-cover cursor-pointer"
    //         onClick={() => {
    //           profilePicRef?.current?.click();
    //         }}
    //       />
    //     )}

    //     <input
    //       type="file"
    //       ref={profilePicRef}
    //       className="hidden"
    //       onChange={changeProfilePicture}
    //     />
    //     <h2 className="font-semibold">
    //       {userData?.user?.name as string} {userData?.user?.last_name as string}
    //     </h2>

    //     <div className="flex flex-col gap-1 justify-center items-center border-y w-full text-sm text-gray-600">
    //       <Link to={"/"} className="flex items-center gap-1">
    //         <FaPhoneAlt />{" "}
    //         {(userData?.user?.phone as string) || "Not Available"}
    //       </Link>
    //       <Link to={"/"} className="flex items-center gap-1">
    //         <IoIosMail size={20} /> {userData?.user?.email as string}
    //       </Link>
    //     </div>

    //     <div className="flex flex-col gap-2 items-center justify-center">
    //       <h2 className="text-[#364F78] text-sm font-bold">Department</h2>
    //       <p className="text-[#364F78] text-sm font-bold">Live Manager</p>
    //       <p className="text-xs text-gray-500">Ramesh Kumar</p>
    //     </div>
    //   </div>
    // </div>

    <div className="profile-card">
      <div className="profile-div">
        <div className="profile-image-container">
          {previewImage ? (
            <img
              src={previewImage}
              style={{ width: "7rem", height: "7rem" }}
              className="rounded-circle object-cover cursor-pointer"
              onClick={() => {
                profilePicRef?.current?.click();
              }}
            />
          ) : (
            <img
              src={`${userData?.user?.profile_photo || profilePhoto}`}
              alt=""
              className="rounded-circle object-cover cursor-pointer profile-image"
              onClick={() => {
                profilePicRef?.current?.click();
              }}
            />
          )}
        </div>

        <input
          type="file"
          ref={profilePicRef}
          className="d-none"
          onChange={changeProfilePicture}
        />
        <h2 className="font-weight-bold text-large profile-heading">
          {userData?.user?.name as string}
          {/* {userData?.user?.last_name as string}  */}
        </h2>

        <div className="profile-contact">
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <FaPhoneAlt size={14} />{" "}
            {(userData?.user?.phone as string) || "Not Available"}
          </Link>
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <IoIosMail size={16} /> {userData?.user?.email as string}
          </Link>
        </div>

        <div className="text-blue-primary profile-detials">
          <h2 className="text-small m-0">Department</h2>
          <h2 className="text-small m-0">Live Manager</h2>
          <p className="text-muted text-xsmall">Ramesh Kumar</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
