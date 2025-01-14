import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useRef, useState } from "react";
import { useGetProfileQuery } from "../../redux/api/profile";
import { ProfileCardProps } from "../../types";

const profilePhoto = "/images/profile.png";

const ProfileCard = ({
  name,
  last_name,
  email,
  phone,
  line_manager,
}: ProfileCardProps) => {
  const { data: userData, isLoading } = useGetProfileQuery();
  const [previewImage, setPreviewImage] = useState(null);
  const profilePicRef = useRef<HTMLInputElement | null>(null);

  const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
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
          {name} {last_name}
          {/* {userData?.user?.last_name as string}  */}
        </h2>

        <div className="profile-contact">
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <FaPhoneAlt size={14} /> {phone || "Not Available"}
          </Link>
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <IoIosMail size={16} /> {email}
          </Link>
        </div>

        <div className="text-blue-primary profile-detials">
          <h2 className="text-small m-0">Department</h2>
          <h2 className="text-small m-0">{line_manager}</h2>
          <p className="text-muted text-xsmall">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
