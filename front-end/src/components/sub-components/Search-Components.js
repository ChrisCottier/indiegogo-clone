import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const SearchTile = (props) => {
  const { campaign } = props;
  const [goToCampaign, setGoToCampaign] = useState(false);

  const progress = Math.floor(
    (campaign.currentTotal / campaign.campaignGoal) * 100
  );
  let progressBar = progress;
  if (progress > 100) {
    progressBar = 100;
  }

  if (goToCampaign) {
    return <Redirect to={`/campaigns/${campaign.id}`}></Redirect>;
  }
  if (!campaign) {
    return null;
  }

  return (
    <div
      key={campaign.id}
      className="tile"
      onClick={() => setGoToCampaign(true)}
    >
      <div className="tile is-child box search-tile">
        <div
          className="search-tile-pic"
          style={{ backgroundImage: `url(${campaign.campaignPic})` }}
        ></div>
        <div className="fund-follow card-apart">
          <span>Funding</span>
          <span>
            <i className="far fa-heart follow-heart"></i>
          </span>
        </div>
        <div className="title is-4">{campaign.title}</div>
        <div className="card-tagline subtitle is-6">{campaign.tagline}</div>
        {campaign.Category ? (
          <div className="card-category">{campaign.Category.name}</div>
        ) : (
          <></>
        )}
        <div className="card-progress">
          <div className="fund-follow card-apart">
            <div>
              <span className="card-total">{`$${campaign.currentTotal} `}</span>
              <span className="card-currency">USD raised</span>
            </div>
            <div className="card-progress">{`${progress}%`}</div>
          </div>
        </div>
        <div id="card-progress-bar">
          <div style={{ width: `${progressBar}%` }}></div>
        </div>
        <div className="card-time-left">
          <i className="fas fa-clock"></i>
          <span>{`  ${campaign.daysLeft} days left`}</span>
        </div>
      </div>
    </div>
  );
};

export const SearchFilter = (props) => {
  const { setFilterCategory, filterCategory } = props;
  return (
    <div className="filter-menu">
      <div className="filter-title title is-5">Filter results</div>
      <div className="filter-subtitle subtitle is-6">Category</div>
      <CategoryMenu
        field="Tech and Innovation"
        setFilterCategory={setFilterCategory}
        filterCategory={filterCategory}
      ></CategoryMenu>
      <CategoryMenu
        field="Creative"
        setFilterCategory={setFilterCategory}
        filterCategory={filterCategory}
      ></CategoryMenu>
      <CategoryMenu
        field="Community"
        setFilterCategory={setFilterCategory}
        filterCategory={filterCategory}
      ></CategoryMenu>
    </div>
  );
};

const CategoryMenu = (props) => {
  const { field, setFilterCategory, filterCategory } = props;

  const { categories } = useSelector((state) => state.categories);

  const setCategory = (event) => {
    setFilterCategory(event.target.innerText);
  };

  if (!categories) return null;

  return (
    <div>
      <div className="search-category-field">{field}</div>
      {categories.map((category) => {
        if (field === category.field) {
          let selectedFilter = "";
          if (category.name === filterCategory) {
            selectedFilter = "selected-filter";
          }
          return (
            <div
              key={category.id}
              className={`search-category-name ${selectedFilter}`}
              onClick={setCategory}
            >
              {category.name}
            </div>
          );
        }
      })}
    </div>
  );
};
