import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import "../../assets/styles/header.css";
import { useAppSelector } from "../../hooks/ReduxHook";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAuthLogoutMutation } from "../../redux/api/auth";
import { useGetProfileQuery } from "../../redux/api/profile";
import { Nav_List } from "./Nav_List";

const logo = "/images/orpect1.png";
const user = "/images/account.png";

const Header = () => {
  const [profile_data, setProfile_data] = useState("");
  const { data: userData, isLoading } = useGetProfileQuery();
  const [authLogout, { data, isError, error }] = useAuthLogoutMutation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const { status, isAuthenticateUser } = useAppSelector(
    (state) => state.authUser
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async () => {
    try {
      setShowProfileDropDown(false);
      authLogout();
      // dispatch(logoutAuthUser());
      // navigate("/sign-in");
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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <header>
      <nav>
        <div className="container header-container">
          <Link
            to={"/dashboard"}
            className="header-logo"
            onClick={() => navigate("/dashboard")}
          >
            <img src={logo} alt="Orpect" width={150} />
          </Link>

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
              {/* <li
                className="font-light"
                onClick={() => navigate("/dashboard/manage_employee")}
              >
                <NavLink activeclassname="active" className="nav-link" to=" ">
                  Employees
                </NavLink>
              </li>
              <li
                className="nav-item"
                onClick={() => navigate("/dashboard/checklist")}
              >
                <NavLink activeclassname="active" className="nav-link" to=" ">
                  Checklists
                </NavLink>
              </li>

              <li
                className="nav-item"
                onClick={() => navigate("/dashboard/timeoff")}
              >
                <NavLink activeclassname="active" className="nav-link" to=" ">
                  Time Off
                </NavLink>
              </li>
              <li onClick={() => navigate("/dashboard/attendance")}>
                <NavLink activeclassname="active" className="nav-link" to=" ">
                  {" "}
                  Attendance
                </NavLink>
              </li>

              <li onClick={() => navigate("/dashboard/recruitment")}>
                <NavLink activeclassname="active" className="nav-link" to=" ">
                  Recruitment
                </NavLink>
              </li> */}
            </ul>
          </div>

          {/* hamburge menu for toogle  */}
          <div className="ham-burger-menu">
            <MdMenu size={30} />
          </div>

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
                <Link
                  to="/profile"
                  className="nav-txt"
                  onClick={() => setShowProfileDropDown(false)}
                >
                  Profile
                </Link>
                <button className="nav-txt" onClick={onLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
