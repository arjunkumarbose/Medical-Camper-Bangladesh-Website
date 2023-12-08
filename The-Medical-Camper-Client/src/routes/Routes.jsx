import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../Layout/Dashboard";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import AddEvent from "../pages/Dashboard/Organizers/Event_Management/AddEvent";
import Events from "../pages/Events/Events";
import PrivateRoute from "./PrivateRoute";
import MyEvents from "../pages/Dashboard/Organizers/Event_Management/MyEvents";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageEvents from "../pages/Dashboard/Organizers/Event_Management/ManageEvents";
import PaymentHistory from "../pages/Dashboard/Participants/PaymentHistory";
import Payment from "../pages/Dashboard/Participants/Payment";
import AdminRoute from "./AdminRoute";
import UpdateEvent from "../pages/Dashboard/Organizers/Event_Management/UpdateEvent";
import MinDashBoard from "../pages/Dashboard/MinDashBoard";
import OrganizerRoute from "./OrganizerRoute";
import Organizers from "../pages/home/Organizers/Organizers";
import SelectedEvents from "../pages/Dashboard/Participants/SelectedEvents";
import EnrolledEvents from "../pages/Dashboard/Participants/EnrolledEvents";
import AboutUs from "../pages/home/About/AboutUs";
import EventDetails from "../pages/Events/EventDetails";

import HealthProfessionalRoute from "./HealthProfessionalRoute";
import AllEvents from "../pages/Dashboard/HealthProfessional/AllEvents";
import ProfileInfo from "../pages/Dashboard/HealthProfessional/ProfileInfo";
import UpdateProfileInfo from "../pages/Dashboard/HealthProfessional/UpdateProfileInfo";
import UpdateParticipantInfo from "../pages/Dashboard/Participants/UpdateParticipantInfo";
import ParticipantInfo from "../pages/Dashboard/Participants/ParticipantInfo";
import InterestList from "../pages/Dashboard/HealthProfessional/InterestList";
import PendingList from "../pages/Dashboard/Organizers/Health_Professionals/PendingList";
import AllParticipants from "../pages/Dashboard/Organizers/Manage_Participant/AllParticipants";
import AllHealthProfessionals from "../pages/Dashboard/Organizers/Health_Professionals/AllHealthProfessionals";
import ViewHealthProfessional from "../pages/Dashboard/Organizers/Health_Professionals/ViewHealthProfessional";
import ViewParticipant from "../pages/Dashboard/Organizers/Manage_Participant/ViewParticipant";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/organizers",
        element: <Organizers />,
      },
      {
        path: "/events",
        element: (
          <PrivateRoute>
            <Events title={"All Events"} />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/eventdetails/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/event/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <MinDashBoard />
          </PrivateRoute>
        ),
      },
      {
        path: "addevent",
        element: (
          <OrganizerRoute>
            <AddEvent />
          </OrganizerRoute>
        ),
      },
      {
        path: "myevents",
        element: (
          <OrganizerRoute>
            <MyEvents />
          </OrganizerRoute>
        ),
      },
      {
        path: "updateevent/:id",
        element: (
          <OrganizerRoute>
            <UpdateEvent />
          </OrganizerRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/singleevents/${params.id}`),
      },
      {
        path: "manageevents",
        element: (
          <OrganizerRoute>
            <ManageEvents />
          </OrganizerRoute>
        ),
      },
      {
        path: "pending-interest-list",
        element: (
          <OrganizerRoute>
            <PendingList />
          </OrganizerRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "selectedevents",
        element: (
          <PrivateRoute>
            <SelectedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "enrolledevents",
        element: (
          <PrivateRoute>
            <EnrolledEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateParticipantInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "allevents",
        element: <AllEvents />,
      },
      {
        path: "interest-list",
        element: (
          <HealthProfessionalRoute>
            <InterestList />
          </HealthProfessionalRoute>
        ),
      },
      {
        path: "profileinfo",
        element: (
          <PrivateRoute>
            <ProfileInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "updateprofileinfo",
        element: (
          <PrivateRoute>
            <UpdateProfileInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "participantinfo",
        element: (
          <PrivateRoute>
            <ParticipantInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "updateparticipantinfo",
        element: (
          <PrivateRoute>
            <UpdateParticipantInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "allparticipants",
        element: (
          <PrivateRoute>
            <AllParticipants />
          </PrivateRoute>
        ),
      },
      {
        path: "allhealthprofessionals",
        element: (
          <PrivateRoute>
            <AllHealthProfessionals />,
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/viewhealthprofessional/:email",
        element: <ViewHealthProfessional />,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_URL}/healthprofessionalInfo/${params.email}`
          ),
      },

      {
        path: "/dashboard/viewparticipant/:email",
        element: <ViewParticipant />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/get-participant/${params.email}`),
      },

      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/payforevent/${params.id}`),
      },
    ],
  },
]);

export default Routes;
