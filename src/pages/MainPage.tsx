import React from "react";
import FacesShowZone from "../features/showZone/FacesShowZone";
import LoginButton from "../features/profile/LoginButton";
import AuthModal from "../features/auth/AuthModal";

export default function MainPage() {
  return (
    <div>
      <AuthModal />
      <LoginButton />
      <FacesShowZone />
    </div>
  );
}
