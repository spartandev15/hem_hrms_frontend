import { ChangeEvent, useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHook";
import { ProfileCardProps } from "../../types";

const profilePhoto = "/images/profile.png";

const ProfileCard = ({ data, onProfileChange }: ProfileCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const profilePicRef = useRef<HTMLInputElement | null>(null);
  const { status } = useAppSelector((state) => state.authUser);
  const { pathname } = useLocation();

  const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(data);
    try {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string" || reader.result === null) {
            setPreviewImage(reader.result); // Set preview image URL
          } // Set preview image URL
        };
        reader.readAsDataURL(file);

        if (onProfileChange) {
          if (data.id) onProfileChange(file, data?.id);
          else onProfileChange(file);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-div">
        <div className="profile-image-container">
          {previewImage ? (
            <div
              style={{
                border: "2px solid #BE8E37",
                borderRadius: "100%",
              }}
            >
              <img
                src={previewImage}
                className="rounded-circle object-cover cursor-pointer profile-image"
                onClick={() => {
                  profilePicRef?.current?.click();
                }}
              />
            </div>
          ) : (
            <div
              style={{
                border: "2px solid #BE8E37",
                borderRadius: "100%",
              }}
            >
              <img
                src={`${data?.profile_photo || profilePhoto}`}
                className="rounded-circle object-cover cursor-pointer profile-image"
                onClick={() => {
                  if (pathname !== "/profile") {
                    if (status === "HR") profilePicRef?.current?.click();
                    else if (status === "owner" && data?.status === "HR")
                      profilePicRef?.current?.click();
                  } else {
                    profilePicRef?.current?.click();
                  }
                }}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          ref={profilePicRef}
          className="d-none"
          onChange={changeProfilePicture}
        />

        <h2 className="font-weight-bold text-large profile-heading">
          {data?.first_name} {data?.last_name}
          {/* {userData?.user?.last_name as string}  */}
        </h2>

        <div className="profile-contact">
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <FaPhoneAlt size={14} /> {data?.phone || "Not Available"}
          </Link>
          <Link
            to={"/"}
            className="d-flex align-items-center gap-1 text-gray-primary text-xsmall"
          >
            <IoIosMail size={16} /> {data?.email}
          </Link>
        </div>

        <div className="text-blue-primary profile-detials">
          {/* <h2 className="text-small m-0">Department</h2> */}
          {/* <h2 className="text-small m-0">{data?.line_manager}</h2>
          <p className="text-muted text-xsmall">{data?.name}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
