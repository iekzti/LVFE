import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { baseApi } from "utils/api";
import DropdownButton from "../../components/DropdownButton";
import avatar from "../../resources/icons/avatar.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import setting from "../../resources/icons/setting.svg";

export default function Dashboard() {
  const nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    birth: "",
  });

  const resetForm = () =>
    setUser({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      birth: "",
    });

  const getMe = async () => {
    const endpoint = `${baseApi}/users/me`;

    const result = await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      setUser((prev) => ({ ...prev, ...result.data }));
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const handleSaveProfile = async () => {
    const endpoint = `${baseApi}/users/${user.id}`;

    const result = await axios
      .put(
        endpoint,
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          birth: user.birth,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      alert("Thành công");
      getMe();
    }
  };

  const [state, setState] = React.useState({
    preview: "",
    src: "",
  });

  function onClose() {
    setState({ ...state, preview: null });
  }

  function onCrop(preview) {
    setState({ ...state, preview: preview });
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  Modal.setAppElement("div");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const [userInfo, setUserInfo] = React.useState({
    id: "user01",
    name: "Hồ Anh Khiết",
    phoneNumber: "",
    birth: "",
    email: "khiet@gmail.com",
    address: "",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "70vw",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  return (
    <div className="row">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => {
              closeModal();
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            width={390}
            height={390}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            src={state.src}
            style={{
              display: "flex",
              marginLeft: "50px",
            }}
          />

          <div style={{ width: 10 }}></div>

          <img
            src={state.preview}
            alt="Preview"
            style={{
              display: "flex",
              width: "40%",
              height: "40%",
              marginLeft: "50px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#395185",
              color: "#FFFFFF",
              width: "20%",
              cursor: "pointer",
              textAlign: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
            onClick={() => {
              closeModal();
            }}
          >
            Lưu
          </div>
        </div>
      </Modal>
      <div
        className="col-2"
        style={{
          display: "fix",
          flexDirection: "column",
        }}
      >
        <div
          className="border-end bg-white"
          id="sidebar-wrapper"
          style={{ height: "100%" }}
        >
          <h1 className="text-center">Logo</h1>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/home");
              }}
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
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/dashboardUser");
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
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <img
                src={redesign}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Redesign
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
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
      <div className="col-10">
        <div className="row p-4 ms-4 p-4 m-0 p-0 ">
          <div className="d-flex justify-content-end mb-4" shouldFitContainer>
            <DropdownButton
              className="text-center "
              style={{ "justify-content": "center", "align-items": "center" }}
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
            className="row"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 2px #c7c7c7",
              paddingBottom: "30px",
            }}
          >
            <div
              className="col"
              style={{
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
                marginTop: "70px",
              }}
              onClick={() => {
                openModal();
              }}
            >
              <img
                src={state.preview}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatar;
                }}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              ></img>
            </div>
            <div className="col">
              {/* ------------------------------- First Name ------------------------------- */}
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#20297C",
                  }}
                >
                  Họ
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"idName_" + userInfo.id}
                    placeholder="Họ"
                    style={{
                      background: "transparent",
                      borderTop: "1px",
                      borderLeft: "1px",
                      borderRight: "1px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={user.firstName}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                  ></input>
                </div>
              </div>
              {/* -------------------------------- Last Name ------------------------------- */}
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#20297C",
                  }}
                >
                  Tên
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"idName_" + userInfo.id}
                    placeholder="Tên"
                    style={{
                      background: "transparent",
                      borderTop: "1px",
                      borderLeft: "1px",
                      borderRight: "1px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={user.lastName}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                    }}
                  ></input>
                </div>
              </div>
              {/* ---------------------------------- Phone --------------------------------- */}

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#20297C",
                  }}
                >
                  Số điện thoại
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"idPhoneNumber_" + userInfo.phoneNumber}
                    placeholder="Số điện thoại"
                    style={{
                      background: "transparent",
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={user.phone}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                    }}
                  ></input>
                </div>
              </div>
              {/* ---------------------------------- Birth --------------------------------- */}
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#20297C",
                  }}
                >
                  Ngày sinh
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"idBirth_" + userInfo.birth}
                    type="date"
                    style={{
                      background: "transparent",
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={dayjs(user.birth).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        birth: e.target.value,
                      }));
                    }}
                  ></input>
                </div>
              </div>
              {/* --------------------------------- Address -------------------------------- */}
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#20297C",
                  }}
                >
                  Địa chỉ
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"idAddress_" + userInfo.address}
                    placeholder="Địa chỉ"
                    style={{
                      background: "transparent",
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={user.address}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                  ></input>
                </div>
              </div>

              {/* ------------------------------- Save Button ------------------------------ */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  style={{
                    background: "#8AECE5",
                    width: "200px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant=""
                  onClick={handleSaveProfile}
                >
                  <span style={{ width: 10 }}></span>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#20297C",
                    }}
                  >
                    Lưu
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
