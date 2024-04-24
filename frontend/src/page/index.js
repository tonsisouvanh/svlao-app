import React from "react";

export const Dashboard = React.lazy(() => import("./dashboard/DashboardPage"));

export const Signin = React.lazy(() => import("./auth/Signin"));
export const Signup = React.lazy(() => import("./auth/Signup"));
export const UserProfile = React.lazy(() => import("./student/UserProfile"));
export const NotFoundPage = React.lazy(() => import("./NoFoundPage"));

export const StudentList = React.lazy(() => import("./student/StudentList"));
export const EditStudent = React.lazy(() => import("./student/EditStudent"));
export const AddStudent = React.lazy(() => import("./student/AddStudent"));

export const UniversityList = React.lazy(() => import("./university/UniversityList"));
export const AddUniversity = React.lazy(() => import("./university/AddUniversity"));
export const EditUniversity = React.lazy(() => import("./university/EditUniversity"));

export const MajorList = React.lazy(() => import("./major/MajorList"));
export const AddMajor = React.lazy(() => import("./major/AddMajor"));
export const EditMajor = React.lazy(() => import("./major/EditMajor"));

export const ResidenceAddressList = React.lazy(() => import("./residenceAddress/ResidenceAddressList"));
export const EditResidenceAddress = React.lazy(() => import("./residenceAddress/EditResidenceAddress"));
export const AddResidenceAddress = React.lazy(() => import("./residenceAddress/AddResidenceAddress"));

export const AnnouncementList = React.lazy(() => import("./announcement/private/AnnouncementList"));
export const AddAnnouncement = React.lazy(() => import("./announcement/private/AddAnnouncement"));
export const EditAnnouncement = React.lazy(() => import("./announcement/private/EditAnnouncement"));
export const AnnouncementDetail = React.lazy(() => import("./announcement/AnnouncementDetail"));

export const DocumentPage = React.lazy(() => import("./document/DocumentPage"));
export const AnnouncementPage = React.lazy(() => import("./announcement/AnnouncementPage"));

export const DocumentList = React.lazy(() => import("./document/private/DocumentList"));
export const AddDocument = React.lazy(() => import("./document/private/AddDocument"));
export const EditDocument = React.lazy(() => import("./document/private/EditDocument"));
