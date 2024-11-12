import React, { useEffect, useState } from "react";
import "./Card.css";
import { FaRegCircle } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { BsCheckCircleFill, BsFillExclamationSquareFill } from "react-icons/bs";

const Card = ({ id, title, tag, status, priority }) => {
  const [name, setName] = useState("User");
  const [isActive, setIsActive] = useState(false);

  // Example data fetch function - replace with your actual API call
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment"); // Replace with actual API
        const data = await response.json();
        setName(data.name || "User");
        setIsActive(data.isActive || false); // Assuming `isActive` is a boolean in the API
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div className="imageContainer relative" style={{ width: "30px", height: "30px" }}>
          <div
            className="initials"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#cccccc",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.8em",
            }}
          >
            {getInitials(name)}
          </div>
          <div
            className="statusDot"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: isActive ? "green" : "gray",
              border: "1px solid white",
            }}
          ></div>
        </div>
      </div>

      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {!isStatus &&
          (status === "Backlog" ? (
            <BiLoader style={{ fontSize: "14px" }} />
          ) : status === "Todo" ? (
            <FaRegCircle style={{ fontSize: "13px", color: "#ddeded" }} />
          ) : status === "In progress" ? (
            <BiAdjust style={{ fontSize: "14px", color: "#f2d750" }} />
          ) : status === "Done" ? (
            <BsCheckCircleFill />
          ) : (
            <IoMdCloseCircleOutline />
          ))}
        <span style={{ margin: "4px" }}>{title}</span>
      </div>

      <div className="cardTags">
        {!isPriority ? (
          <div className="tags color-grey">
            {priority === 1 || priority === 2 || priority === 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-signal"
                viewBox="0 0 16 16"
              >
                <rect x="1" y="10" width="3" height="2" />
                <rect
                  x="5"
                  y="7"
                  width="3"
                  height="5"
                  opacity={priority === 2 || priority === 3 ? 1 : 0.25}
                />
                <rect
                  x="9"
                  y="4"
                  width="3"
                  height="8"
                  opacity={priority === 3 ? 1 : 0.25}
                />
              </svg>
            ) : priority === 4 ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4H9L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="#FB773F"/>
</svg>
            ) : (
              <p>...</p>
            )}
          </div>
        ) : null}

        {tag?.map((element, index) => (
          <div key={index} className="tags color-grey">
            <span className="big-circle"></span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
