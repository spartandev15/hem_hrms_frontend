import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { PiUserCircleCheckThin } from "react-icons/pi";

import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import "../../assets/styles/header.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAuthLogoutMutation } from "../../redux/api/auth";
import { useGetProfileQuery } from "../../redux/api/profile";
import { Nav_List } from "./Nav_List";

import logo from "../../assets/images/orpect1.png";
import user from "../../assets/images/account.png";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { logoutAuthUser, setAuthStatus } from "../../redux/slices/authSlice";
import { setIsLoading } from "../../redux/slices/loadingSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const [profile_data, setProfile_data] = useState("");
  const { data: userData, isLoading } = useGetProfileQuery();

  const [authLogout, { data: logoutDetails, isSuccess: logoutIsSuccess }] =
    useAuthLogoutMutation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const { status } = useAppSelector((state) => state.authUser);

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      dispatch(setIsLoading(true));
      setShowProfileDropDown(false);
      authLogout();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const profileDropDwonRef = useOutsideClick<HTMLDivElement>(() => {
    setShowProfileDropDown(false);
  });

  const navLinkRef = useOutsideClick<HTMLUListElement>(() => {
    setActiveIndex(-1);
  });

  console.log(logoutDetails);

  useEffect(() => {
    if (logoutDetails?.result && logoutIsSuccess) {
      dispatch(logoutAuthUser());
      dispatch(setIsLoading(false));
      navigate("/sign-in");
    }
  }, [logoutDetails]);

  return (
    <header>
      <nav>
        <div className="container header-container">
          {/* ORPECT Logo  */}
          <Link
            to={"/dashboard"}
            className="header-logo"
            onClick={() => navigate("/dashboard")}
          >
            <img src={logo} alt="Orpect" width={150} />
          </Link>

          {/* navigation Links  */}
          <div className="nav-bar-container">
            <ul className="nav-bar" ref={navLinkRef}>
              {Nav_List.map((link, index) => (
                <li
                  className="position-relative nav-list p-0"
                  key={`${index}-${link.label}`}
                >
                  <>
                    {link.label === "Employee" &&
                    status !== "HR" ? null : link.subLinks ? (
                      <div
                        className="d-flex"
                        onClick={() => toggleIndex(index)}
                      >
                        {link.label}{" "}
                        <div
                          style={{
                            marginTop: "-2px",
                          }}
                        >
                          <FaCaretDown size={12} />
                        </div>
                      </div>
                    ) : (
                      <Link
                        onClick={() => setActiveIndex(-1)}
                        to={link.href}
                        className=""
                      >
                        {link.label}{" "}
                      </Link>
                    )}
                  </>

                  {link.subLinks && activeIndex == index && (
                    <div className="nav-sublinks position-absolute">
                      {link.subLinks.map((subLink) => (
                        <Link
                          onClick={() => setActiveIndex(-1)}
                          to={subLink.href}
                          className="sub-links-nav-list"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* hamburge menu for toogle  */}
          <div className="ham-burger-menu">
            <MdMenu size={30} />
          </div>

          {/* prfoile dropdown  */}
          <div
            className="d-flex gap-3 align-items-center position-relative"
            ref={profileDropDwonRef}
          >
            <div>
              <FaBell
                size={18}
                style={{
                  color: "#F6A21E",
                }}
              />
            </div>

            <div
              onClick={() => setShowProfileDropDown(!showProfileDropDown)}
              style={{
                cursor: "pointer",
              }}
            >
              <img
                src={profile_data ? profile_data : user}
                className="droplogin"
                alt="user"
                height={35}
                width={35}
              />
              <IoIosArrowDown
                size={18}
                style={{
                  color: "#53A2B7",
                }}
              />
            </div>

            {showProfileDropDown && (
              <div className="drop-down-menu">
                <div className="text-wrap">
                  <h2 className="text-small m-0">developer</h2>
                  <Link
                    to={""}
                    className="text-gray text-xxsmall px-2 text-center text-none"
                  >
                    testdeveloper@gmail.com
                  </Link>
                </div>

                <hr className="m-0" />

                <Link
                  to="/profile"
                  className="nav-txt d-flex gap-1 align-items-center"
                  onClick={() => setShowProfileDropDown(false)}
                >
                  <PiUserCircleCheckThin size={22} />
                  <span>My Profile</span>
                </Link>

                <div
                  className="nav-txt d-flex gap-1 align-items-center"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={onLogout}
                >
                  <CiLogout size={18} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
