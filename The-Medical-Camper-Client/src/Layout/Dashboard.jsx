import { MdEvent, MdOutlineDashboard } from "react-icons/md";
import Nav from "../components/shared/Navbar/Nav";
import Container from "./Container";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaRegClone,
  FaRegCaretSquareRight,
  FaPhoneAlt,
  FaRegCalendarCheck,
  FaCheckCircle,
  FaHistory,
  FaEdit,
  FaUserEdit,
  FaSignOutAlt,
  FaPager,
  FaHeart,
  FaSpinner,
  FaUser,
  FaHandHoldingMedical,
} from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import useAdmin from "../Hooks/useAdmin";
import useOrganizer from "../Hooks/useOrganizer";
import useHealthProfessional from "../Hooks/useHealthProfessional";
import Footer from "../components/shared/footer/Footer";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isOrganizer] = useOrganizer();
  const [isHealthProfessional] = useHealthProfessional();

  const navItems = (
    <>
      {/* organizers dashboard items */}
      {isOrganizer && (
        <>
          <li>
            <NavLink to={"allevents"}>
              <MdEvent className="inline-block text-2xl text-error"></MdEvent>{" "}
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"addevent"}>
              {" "}
              <FaRegClone className="inline-block text-2xl text-error"></FaRegClone>{" "}
              Add Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"myevents"}>
              {" "}
              <FaRegCaretSquareRight className="inline-block text-2xl text-error"></FaRegCaretSquareRight>{" "}
              My Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"manageevents"}>
              <FaEdit className="inline-block text-2xl text-error"></FaEdit>{" "}
              Manage Events
            </NavLink>
          </li>
          <div className="py-2">
            <hr />
          </div>
          <li>
            <NavLink to={"allparticipants"}>
              <FaUser className="inline-block text-2xl text-error"></FaUser>{" "}
              Participants
            </NavLink>
          </li>
          <div className="py-2">
            <hr />
          </div>
          <li>
            <NavLink to={"allhealthprofessionals"}>
              <LuUsers className="inline-block text-2xl text-error"></LuUsers>{" "}
              Health Professionals
            </NavLink>
          </li>
          <li>
            <NavLink to={"pending-interest-list"}>
              <FaHandHoldingMedical className="inline-block text-2xl text-error"></FaHandHoldingMedical>{" "}
              Pending Interest List
            </NavLink>
          </li>
        </>
      )}

      {/* Admin dashboard items  */}
      {isAdmin && (
        <>
          <li>
            <NavLink to={"manageusers"}>
              <FaUserEdit className="inline-block text-2xl text-error"></FaUserEdit>{" "}
              Manage Users
            </NavLink>
          </li>
        </>
      )}

      {/* Health Professional dashboard items  */}
      {isHealthProfessional && (
        <>
          <li>
            <button>
              <NavLink to={"allevents"}>
                <FaRegClone className="inline-block text-2xl text-error"></FaRegClone>{" "}
                All Events
              </NavLink>
            </button>
          </li>

          <li>
            <button>
              <NavLink to={"interest-list"}>
                <FaHeart className="inline-block text-2xl text-error"></FaHeart>{" "}
                Accepted List
              </NavLink>
            </button>
          </li>

          <div className="py-2">
            <hr />
          </div>

          <li>
            <button>
              <NavLink to={"profileinfo"}>
                <FaUser className="inline-block text-2xl text-error"></FaUser>{" "}
                Profile Info
              </NavLink>
            </button>
          </li>
          <li>
            <button>
              <NavLink to={"updateprofileinfo"}>
                <FaUserEdit className="inline-block text-2xl text-error"></FaUserEdit>{" "}
                Update Info
              </NavLink>
            </button>
          </li>
        </>
      )}

      {/* participant dashboard items */}
      {!isAdmin && !isOrganizer && !isHealthProfessional && (
        <>
          <li>
            <NavLink to={"selectedevents"}>
              <FaRegCalendarCheck className="inline-block text-2xl text-error"></FaRegCalendarCheck>{" "}
              Selected Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"enrolledevents"}>
              <FaCheckCircle className="inline-block text-2xl text-error"></FaCheckCircle>{" "}
              Enrolled Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"paymenthistory"}>
              <FaHistory className="inline-block text-2xl text-error"></FaHistory>{" "}
              Payment History
            </NavLink>
          </li>
          <div className="py-2">
            <hr />
          </div>

          <li>
            <NavLink to={"participantinfo"}>
              <FaUser className="inline-block text-2xl text-error"></FaUser>{" "}
              User Profile Info
            </NavLink>
          </li>
          <li>
            <NavLink to={"update-profile"}>
              <FaUserEdit className="inline-block text-2xl text-error"></FaUserEdit>{" "}
              Update profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <Nav />
      <Container>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ms-5 mb-16">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden me-auto"
            >
              <MdOutlineDashboard className="text-2xl"></MdOutlineDashboard>
            </label>
            {/* Page content here */}

            <Outlet></Outlet>
          </div>
          <div className="drawer-side z-50 fixed">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-2/3 md:w-64 h-full bg-[#0f172a] text-white">
              {user && (
                <div className="avatar mx-auto border-4 border-error p-2 rounded-full border-dashed">
                  <div title={user?.displayName} className="w-20 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              )}
              <div className="text-center text-2xl py-5 font-semibold text-white">
                <h3>{user?.displayName}</h3>
                <p className="text-center text-sm text-slate-20000">
                  {user?.email}
                </p>
              </div>
              {/* Sidebar content here */}
              {navItems}

              <hr className="my-5" />

              <button className="btn btn-sm" onClick={logOut}>
                <FaSignOutAlt className="rotate-180 inline-block text-2xl text-error"></FaSignOutAlt>
                LogOut
              </button>
            </ul>
          </div>
        </div>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default Dashboard;
