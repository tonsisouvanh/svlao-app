import { Route } from "react-router-dom";
import AddAnnouncement from "./private/AddAnnouncement";
import EditAnnouncement from "./private/EditAnnouncement";
import Announcement from "./Announcement";
import AnnouncementDetail from "./AnnouncementDetail";
import AnnouncementList from "./private/AnnouncementList";

export default function AnnouncementRoutes() {
  return (
    <>
      <Route
        path="/manage-others-data/announcement-list"
        element={<AnnouncementList />}
      />
      <Route
        path="/manage-others-data/announcement-list/page/:pageNumber"
        element={<AnnouncementList />}
      />
      <Route
        path="/manage-others-data/announcement-list/search/:keyword"
        element={<AnnouncementList />}
      />
      <Route
        path="/manage-others-data/announcement-list/search/:keyword/page/:pageNumber"
        element={<AnnouncementList />}
      />
      <Route
        path="/manage-others-data/announcement-list/add"
        element={<AddAnnouncement />}
      />
      <Route
        path="/manage-others-data/announcement-list/:id"
        element={<EditAnnouncement />}
      />

      {/* public */}
      <Route path="/" element={<Announcement />} />
      <Route path="/page/:pageNumber" element={<Announcement />} />
      <Route path="/search/:keyword" element={<Announcement />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<Announcement />}
      />
      <Route
        path="/announcement-list/page/:pageNumber"
        element={<Announcement />}
      />
      <Route
        path="/announcement-list/search/:keyword"
        element={<Announcement />}
      />
      <Route
        path="/announcement-list/search/:keyword/page/:pageNumber"
        element={<Announcement />}
      />
      <Route
        path="/announcement-list/announcement/:id"
        element={<AnnouncementDetail />}
      />
    </>
  );
}
