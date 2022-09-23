import React from "react";
import Avatar from "react-avatar-edit";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import avatar from "../../resources/icons/avatar.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import redesign from "../../resources/icons/redesign.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import setting from "../../resources/icons/setting.svg";
import logo1 from "../../resources/icons/logo1.png";

export default function Dashboard() {
  const nav = useNavigate();
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
    id: "user02",
    name: "Hồ Anh Khiết",
    phoneNumber: "0706665086",
    birth: "1999-02-04",
    email: "khiet@gmail.com",
    address: " AG",
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
              onClick={()=>{
                nav("/home");}
              }
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
              onClick={()=>{
                nav("/dashboardUser");}
              }
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
              style={{ display: "flex", alignItems: "center"}}
              onClick={()=>{
                nav("/dashboard");}
              }
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
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
                  Họ và Tên
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
                    placeholder="Họ và Tên"
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
                    value={userInfo.name}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, name: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
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
                    value={userInfo.phoneNumber}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, phoneNumber: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
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
                    value={userInfo.birth}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, birth: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
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
                    value={userInfo.address}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, address: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
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
