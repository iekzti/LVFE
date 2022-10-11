import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import addUser from "../../resources/icons/addUser.svg";
import Avatar from "react-avatar-edit";
import avatar from "../../resources/icons/avatar.svg";
import DropdownButton from "../../components/DropdownButton";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import home from "../../resources/icons/home.svg";
import history from "../../resources/icons/history.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import setting from "../../resources/icons/setting.svg";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import "../Dashboard/DashboardUser.css";

export default function HistoryAdmin() {
  Modal.setAppElement("div");

  const [searchText, setSearchText] = React.useState("");

  const [listActivity, setListActivity] = React.useState([]);
  useEffect(() => {
    setListActivity([
      {
        activityName: "Tải luật nghiệp vụ",
        userID: "user01",
        userName: "Nguyễn Văn A",
        activityTime: "12:00:10 01/02/2022",
      },
      {
        activityName: "Tải luật phân lớp",
        userID: "user02",
        userName: "Nguyễn Văn B",
        activityTime: "06:00:10 02/02/2022",
      },
    ]);
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "70vw",
      height: "550px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const deleteStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "25vw",
      height: "200px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const nav = useNavigate();

  return (
    <div className="row">
      <div
        className="col-2"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          class="border-end bg-white"
          id="sidebar-wrapper"
          style={{ height: "100%" }}
        >
          <h1 className="text-center">Logo</h1>
          <div class="list-group list-group-flush">
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={home}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Home
            </a>
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/dashboardAdmin");
              }}
            >
              <img
                src={dashboard}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Dashboard
            </a>
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#8AECE5",
              }}
            >
              <img
                src={history}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              History
            </a>
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={setting}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Setting
            </a>
          </div>
        </div>
      </div>
      <div
        className="col-10"
        style={{
          display: "flex",
        }}
      >
        <div className="row p-4 ms-4 p-4 m-0 p-0 ">
          <div className="d-flex justify-content-end">
            <DropdownButton
              className="text-center "
              style={{
                "justify-content": "flex-end",
                "align-items": "center",
              }}
              items={["Profile", "Logout"]}
              itemStart={profile}
              icons_list={[profile, logout_icon]}
              onClick={(item, index) => {
                if (index === 0) {
                  nav("/profile");
                }
                if (index === 1) {
                  localStorage.removeItem("access_token");
                  nav("/login");
                }
              }}
            />
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "500px",
            }}
          >
            <table
              style={{
                borderSpacing: "0 10px",
                borderCollapse: "separate",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "30px",
                    }}
                  >
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name"
                      name="s"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="headTD"
                    width={"400px"}
                  >
                    Hoạt động
                  </td>
                  <td
                    className="headTD"
                    width={"200px"}
                  >
                    Tên User
                  </td>
                  <td
                    className="headTD"
                    width={"200px"}
                  >
                    Thời gian
                  </td>
                  <td
                    className="headTD"
                    width={"200px"}
                  ></td>
                </tr>
              </thead>
              <tbody>
                {listActivity.map((activity, index) => (
                  <tr>
                    <td className="bodyTD">{activity.activityName}</td>
                    <td className="bodyTD">{activity.userName}</td>
                    <td className="bodyTD">{activity.activityTime}</td>
                    <td className="bodyTD" style={{
                      display:"flex",
                      justifyContent:"center"
                    }}><div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            backgroundColor: "#395185",
                            color: "#FFFFFF",
                            width: "50%",
                            cursor: "pointer",
                            textAlign: "center",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            borderRadius: "5px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            marginRight: "20px",
                          }}
                        >
                          Chi tiết
                        </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
