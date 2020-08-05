import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./styles/User.css";
import { getUserInfo } from "../actions/users";
import {
  UserProfileView,
  CampaignsView,
} from "./sub-components/UserProfileViews";

const User = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { campaigns } = useSelector((state) => state.campaigns);
  const { contributionsCount } = useSelector((state) => state.contributions);
  const [profileNav, setProfileNav] = useState("selected-nav");
  const [campaignNav, setCampaignNav] = useState("");

  const handleNav = (event) => {
    setProfileNav("");
    setCampaignNav("");

    const name = event.target.getAttribute("name");
    console.log(name);

    if (name === "profileNav") {
      setProfileNav("selected-nav");
    } else if (name === "campaignNav") {
      setCampaignNav("selected-nav");
    }
  };

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [id]);

  if (!user) {
    return null;
  }
  return (
    <main>
      <div className="user-page-container container is-widescreen">
        <header className="user-page-header hero">
          <div className="hero-body">
            <h1 className="user-name title">
              {user.firstName} {user.lastName}
            </h1>
            <h2 className="user-location">
              <i className="fas fa-map-marker-alt"></i>
              {`  ${user.city}, ${user.stateProvince}, ${user.country}`}
            </h2>
          </div>
          <nav className="navbar user-navbar">
            <div className="navbar-start">
              <a
                className={`navbar-item is-link ${profileNav}`}
                name="profileNav"
                onClick={handleNav}
              >
                Profile
              </a>
              <a
                className={`navbar-item is-link ${campaignNav}`}
                name="campaignNav"
                onClick={handleNav}
              >
                Campaigns
              </a>
            </div>
          </nav>
        </header>
        {profileNav ? (
          <UserProfileView
            user={user}
            campaigns={campaigns}
            contributionsCount={contributionsCount}
          ></UserProfileView>
        ) : (
          <></>
        )}
        {campaignNav ? <CampaignsView></CampaignsView> : <></>}
        {/* PART 1 PROFILE VIEW */}
        {/* PART 2 CAMPAIGN VIEW */}
      </div>
    </main>
  );
};

export default User;
