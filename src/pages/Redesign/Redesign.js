import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import home from "../../resources/icons/home.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import setting from "../../resources/icons/setting.svg";
import { Button } from "react-bootstrap";
import round from "../../resources/icons/round.svg";
import tobe from "../../resources/icons/tobediagram.png";
import asis from "../../resources/icons/asisdiagram.png";
import Modal from "react-modal";
import axios from "axios";
import fileDownload from "js-file-download";
import "./Redesign.css";

export default function Redesign() {
  Modal.setAppElement("div");
  const inputFile = useRef(null);
  const openFile = () => {
    inputFile.current.click();
  };
  const [btnClass, setBtnClass] = React.useState("");
  const handleClick = () => {
    setBtnClass("btnOp");
    setBtnClass2("");
    setBtnClass3("");
  };

  const [btnClass2, setBtnClass2] = React.useState("");
  const handleClick2 = () => {
    setBtnClass2("btnOp");
    setBtnClass("");
    setBtnClass3("");
  };

  const [btnClass3, setBtnClass3] = React.useState("");
  const handleClick3 = () => {
    setBtnClass3("btnOp");
    setBtnClass("");
    setBtnClass2("");
  };
  const nav = useNavigate();

  const [modalRedesignIsOpen, setRedesignIsOpen] = React.useState(false);

  function openModalRedesign() {
    setRedesignIsOpen(true);
  }

  function closeModalRedesign() {
    setRedesignIsOpen(false);
  }
  
  const RedesignStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40vw",
      height: "200px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  }

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const handleDownloadTXT = (url) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="row">
      <Modal
        isOpen={modalRedesignIsOpen}
        onRequestClose={closeModalRedesign}
        style={RedesignStyles}
        appElement={document.getElementById("app")}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalRedesign();
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Tái thiết kế quy trình thành công. Bạn có muốn tải lược đồ quy trình không?
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
                background: "#168414",
                width: "180px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "50px",
              }}
              variant=""
              onClick={()=>{
                handleDownloadTXT(
                  "https://drive.google.com/uc?id=1uYJ-6th7OU8ZCWSotpNKIuJ1WnHYudTv&export=download"
                );
                nav("/dashboardUser")
              }}
            >
              <span style={{ width: 10 }}></span>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                Tải xuống
              </div>
            </Button>
            <Button
              style={{
                background: "#FF4651",
                width: "200px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant=""
              onClick={() => {
                nav("/dashboardUser")
              }}
            >
              <span style={{ width: 10 }}></span>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                Về Dashboard
              </div>
            </Button>
          </div>
        </div>
      </Modal>
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
              href="#!"
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              style={{ display: "flex", alignItems: "center" }}
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
      <div className="col-10 bg-light">
        <div className="row p-4 ms-4 p-4 m-0 p-0 ">
          <div className="d-flex justify-content-end mb-4">
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
            className="mt-3 text-center"
            style={{
              paddingLeft: "5px",
              boxShadow:
                "0 6px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
              paddingBottom:"10px"
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Quy trình trước khi tái thiết kế
            </div>
            <img
              src={asis}
              style={{
                width: "1050px",
                marginTop: "10px",
              }}
            />
          </div>
          <div className="mt-3 text-center" style={{
              paddingLeft: "5px",
              boxShadow:
                "0 6px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
              paddingBottom:"10px"
            }}>
              <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Quy trình sau khi tái thiết kế
            </div>
            <img
              src={tobe}
              style={{
                width: "1050px",
              }}
            />
          </div>
          {/* <div
            className="row scroll-button"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: "70vw",
              overflowX: "scroll",
              paddingTop: 10,
              paddingBottom: 20,
              marginTop: "20px",
            }}
          >
            <Button
              className={btnClass}
              style={{
                height: "150px",
                width: "150px",
                border: "1px solid white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginLeft: "27px",
                marginRight: "50px",
              }}
              variant=""
              onClick={handleClick}
            >
              <div className="row text-align-left">
                <div
                  className="col m-auto"
                  style={{ fontSize: 28, fontWeight: "bold" }}
                >
                  Option 1
                </div>
              </div>
            </Button>
            <Button
              className={btnClass2}
              style={{
                height: "150px",
                width: "150px",
                border: "1px solid white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginLeft: 10,
                marginRight: "50px",
              }}
              variant=""
              onClick={handleClick2}
            >
              <div className="row text-align-left">
                <div
                  className="col m-auto"
                  style={{ fontSize: 28, fontWeight: "bold" }}
                >
                  Option 2
                </div>
              </div>
            </Button>
            <Button
              className={btnClass3}
              style={{
                height: "150px",
                width: "150px",
                border: "1px solid white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginLeft: 10,
                marginRight: "50px",
              }}
              variant=""
              onClick={handleClick3}
            >
              <div className="row text-align-left">
                <div
                  className="col m-auto"
                  style={{ fontSize: 28, fontWeight: "bold" }}
                >
                  Option 3
                </div>
              </div>
            </Button>
          </div> */}
          <div
            style={{
              marginLeft: 25,
              width: "70vw",
              height: 300,
              marginTop: 20,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 28, color: "#20297C" }}>
              Description:
            </div>
            <div>
              <dl>
                <dt>Giải thuật 1</dt>
                <dd>
                  - Tác vụ tích hợp mô hình phân lớp: Create payment
                  construction
                </dd>
                <dd>- Tác vụ bị xóa khỏi quy trình: Refund Customer</dd>
                <dt>Giải thuật 2</dt>
                <dd>- Tác vụ tích hợp mô hình phân lớp: Search Flight</dd>
                <dd>- Vị trí tác vụ có thể dời liền sau: Notify customer</dd>
                <dd>
                  - Tác vụ bị thay đổi vị trí: Create payment construction
                </dd>
              </dl>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                background: "#8AECE5",
                width: 200,
                height: 70,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={()=>{
                openModalRedesign();
              }}
              variant=""
            >
              <img src={redesign} height="30px" width="30px" />
              <span style={{ width: 10 }}></span>
              <div
                style={{ fontSize: 28, fontWeight: "bold", color: "#20297C" }}
              >
                Confirm
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
