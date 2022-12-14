import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import headerHome from "../../resources/icons/headerHome.svg";
import firstHome from "../../resources/icons/firstHome.svg";
import secondHome from "../../resources/icons/secondHome.svg";
import evaluate from "../../resources/icons/evaluate.jpg";
import Modal from "react-modal";
import time from "../../resources/icons/time.svg";
import cost from "../../resources/icons/cost.svg";
import sequential from "../../resources/icons/sequential.jpg";
import andGate from "../../resources/icons/andGate.jpg";
import xorGate from "../../resources/icons/xorGate.jpg";
import reworkGate from "../../resources/icons/rework.jpg";
import seq from "../../resources/icons/seq.png";
import xor from "../../resources/icons/xor.png";
import and from "../../resources/icons/and.png";
import re from "../../resources/icons/re.png";

export default function Home() {
  const nav = useNavigate();

  const [modalTimeIsOpen, setTimeIsOpen] = React.useState(false);

  function openModalTime() {
    setTimeIsOpen(true);
  }

  function closeModalTime() {
    setTimeIsOpen(false);
  }

  const [modalCostIsOpen, setCostIsOpen] = React.useState(false);

  function openModalCost() {
    setCostIsOpen(true);
  }

  function closeModalCost() {
    setCostIsOpen(false);
  }

  const inputTimeStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "70vw",
      height: "500px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const inputCostStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "70vw",
      height: "400px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalTimeIsOpen}
        onRequestClose={closeModalTime}
        style={inputTimeStyles}
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="col-10"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "80px",
            }}
          >
            Th???i gian chu k???
          </div>
          <div
            className="col-1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalCost();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div>
            Th???i gian chu k??? c???a m???t quy tr??nh s??? ???????c t??nh b???ng t???ng th???i gian
            th???c hi???n c??c t??c v??? bao g???m b???n nh??m ch??nh:
          </div>
          <table
            style={{
              width: "100%",
              margin: "30px",
            }}
          >
            <thead>
              <tr>
                <td className="headTD">Lo???i quan h???</td>
                <td className="headTD">Minh h???a</td>
                <td className="headTD">Th???i gian chu k??? (CT)</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">Tu???n t???</td>
                <td className="bodyTD">
                  <img src={sequential}></img>
                </td>
                <td className="bodyTD">
                  <img src={seq} style={{ width: "200px" }}></img>
                </td>
              </tr>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">C???ng XOR</td>
                <td className="bodyTD">
                  <img src={xorGate}></img>
                </td>
                <td className="bodyTD">
                  <img src={xor} style={{ width: "300px" }}></img>
                </td>
              </tr>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">C???ng AND</td>
                <td className="bodyTD">
                  <img src={andGate}></img>
                </td>
                <td className="bodyTD">
                  <img src={and} style={{ width: "200px" }}></img>
                </td>
              </tr>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">L???p</td>
                <td className="bodyTD">
                  <img src={reworkGate}></img>
                </td>
                <td className="bodyTD"><img src={re} style={{ width: "150px" }}></img></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal
        isOpen={modalCostIsOpen}
        onRequestClose={closeModalCost}
        style={inputCostStyles}
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="col-10"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "80px",
            }}
          >
            Chi ph??
          </div>
          <div
            className="col-1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalCost();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div>
            Chi ph?? ??o l?????ng c???a t??c v??? s??? ???????c t??nh d???a theo th???i gian ????n v??? c???a t??c v??? nh??n cho chi ph?? ????n
            v??? c???a quy tr??nh ????. (Chi ph?? ????n v??? l?? chi ph?? m?? m???t b??? ph???n c???a doanh nghi???p t???o ra s???n ph???m cho doanh nghi???p tr??n m???t ????n v??? th???i gian).
            <br></br>
            V?? d??? quy tr??nh c??ng ty X bao g???m hai t??c v??? A v?? B. V???i chi ph?? ????n v??? (USD/ph??t) l?? 4. Th?? chi ph?? th???c hi???n cho t???ng t??c v??? l??:
          </div>
          <table
            style={{
              width: "100%",
              margin: "30px",
            }}
          >
            <thead>
              <tr>
                <td className="headTD">T??n t??c v???</td>
                <td className="headTD">
                  Th???i gian ????n v??? <br></br>(ph??t/giao d???ch)
                </td>
                <td className="headTD">
                  Chi ph?? t??c v???<br></br>(USD/giao d???ch)
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">T??c v??? A</td>
                <td className="bodyTD">12</td>
                <td className="bodyTD">12 * 4</td>
              </tr>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">T??c v??? B</td>
                <td className="bodyTD">15</td>
                <td className="bodyTD">15 * 4</td>
              </tr>
            </tbody>
          </table>
          <div>
            L??u ??: Chi ph?? c???a c??? quy tr??nh s??? ???????c t??nh khi v?? ch??? khi ch??ng ta t??nh ???????c th???i gian th???c hi???n c???a c??? quy tr??nh.
          </div>
        </div>
      </Modal>
      <div
        style={{
          position: "absolute",
          zIndex: -10,
          width: "100vw",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <img
          src={headerHome}
          style={{
            objectFit: "contain",
            width: "50%",
            height: "80%",
            zIndex: -8,
          }}
        ></img>
        <img
          src={firstHome}
          style={{
            width: "65%",
            position: "absolute",
            top: 70,
            zIndex: -9,
          }}
        ></img>
      </div>
      <div
        style={{
          width: "100vw",
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          // backgroundColor:"rgba(0,0,0,0)"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Logo</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "80%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            Ch??ng t??i
          </div>
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            Li??n h???
          </div>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              color: "#4ECDC4",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/login");
            }}
          >
            <div>????ng nh???p</div>
          </div>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "40px",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              color: "#4ECDC4",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/signUp");
            }}
          >
            ????ng k??
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "400px",
          marginTop: "200px",
          position: "absolute",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "40vw",
          justifyContent: "center",
          marginLeft: "100px",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: "30px",
            fontWeight: "bold",
            color: "#201250",
          }}
        >
          V???i BPRe, ch??ng t??i s??? gi??p cho quy tr??nh c???a b???n x??? l?? nhanh h??n!
        </div>
        <div
          style={{
            width: "100%",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          To??n b??? quy tr??nh s??? ???????c ki???m tra v?? t??i thi???t k??? ????? gi???m b???t th???i
          gian v?? chi ph?? v???n h??nh.
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "150px",
              marginTop: "20px",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: "#4ECDC4",
              borderRadius: "15px",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/dashboard");
            }}
          >
            <div>Th??? ngay</div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "650px",
          backgroundColor: "rgba(78,205,196,0.1)",
          // marginTop:"1000px"
          position: "absolute",
          top: 700,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
            fontWeight: "bold",
            fontSize: "30px",
            // color:"#201250"
          }}
        >
          H??y ????? quy tr??nh c???a b???n ???????c hi???u qu??? h??n!
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <img
              src={secondHome}
              style={{
                objectFit: "contain",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            ></img>
          </div>
          <div
            style={{
              width: "50%",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              textAlign: "justify",
              paddingRight: "50px",
            }}
          >
            BPRe s??? l??m vi???c tr???c ti???p tr??n quy tr??nh c???a b???n! Th??ng qua quy
            tr??nh, lu???t ph??n l???p v?? lu???t nghi???p v??? b???n t???i l??n, BPRe s??? ti???n
            h??nh ph??n t??ch v?? ki???m tra to??n b??? quy tr??nh c???a b???n. T??? ????, s??? x??a
            c??c t??c v??? kh??ng c???n thi???t ho???c thay ?????i v??? tr?? t??c v??? ????? ?????t ???????c
            ????? hi???u qu??? cao h??n.
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "650px",
          backgroundColor: "000000",
          // marginTop:"1000px"
          position: "absolute",
          top: 1350,
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <img
              src={evaluate}
              style={{
                width: "800px",
                marginTop: "50px",
              }}
            ></img>
          </div>
          <div style={{}}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
                fontWeight: "bold",
                fontSize: "30px",
                marginLeft: "60px",
              }}
            >
              C??c ph????ng th???c ????nh gi??
            </div>
            <div
              style={{
                background: "#20297C",
                width: "300px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "130px",
                cursor: "pointer",
                marginTop: "80px",
              }}
              onClick={() => {
                openModalTime();
              }}
            >
              <img src={time}></img>
              <div
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "36px",
                  marginLeft: "20px",
                }}
              >
                Time
              </div>
            </div>
            <div
              style={{
                background: "#20297C",
                width: "300px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "130px",
                cursor: "pointer",
                marginTop: "50px",
              }}
              onClick={() => {
                openModalCost();
              }}
            >
              <img src={cost} style={{ marginRight: "20px" }}></img>
              <div
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "36px",
                  marginRight: "5px",
                }}
              >
                Cost
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
