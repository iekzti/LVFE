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
            Thời gian chu kỳ
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
            Thời gian chu kỳ của một quy trình sẽ được tính bằng tổng thời gian
            thực hiện các tác vụ bao gồm bốn nhóm chính:
          </div>
          <table
            style={{
              width: "100%",
              margin: "30px",
            }}
          >
            <thead>
              <tr>
                <td className="headTD">Loại quan hệ</td>
                <td className="headTD">Minh họa</td>
                <td className="headTD">Thời gian chu kỳ (CT)</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">Tuần tự</td>
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
                <td className="bodyTD">Cổng XOR</td>
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
                <td className="bodyTD">Cổng AND</td>
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
                <td className="bodyTD">Lặp</td>
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
            Chi phí
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
            Chi phí đo lường của tác vụ sẽ được tính dựa theo thời gian đơn vị của tác vụ nhân cho chi phí đơn
            vị của quy trình đó. (Chi phí đơn vị là chi phí mà một bộ phận của doanh nghiệp tạo ra sản phẩm cho doanh nghiệp trên một đơn vị thời gian).
            <br></br>
            Ví dụ quy trình công ty X bao gồm hai tác vụ A và B. Với chi phí đơn vị (USD/phút) là 4. Thì chi phí thực hiện cho từng tác vụ là:
          </div>
          <table
            style={{
              width: "100%",
              margin: "30px",
            }}
          >
            <thead>
              <tr>
                <td className="headTD">Tên tác vụ</td>
                <td className="headTD">
                  Thời gian đơn vị <br></br>(phút/giao dịch)
                </td>
                <td className="headTD">
                  Chi phí tác vụ<br></br>(USD/giao dịch)
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">Tác vụ A</td>
                <td className="bodyTD">12</td>
                <td className="bodyTD">12 * 4</td>
              </tr>
              <tr
                style={{
                  marginBottom: "50px",
                }}
              >
                <td className="bodyTD">Tác vụ B</td>
                <td className="bodyTD">15</td>
                <td className="bodyTD">15 * 4</td>
              </tr>
            </tbody>
          </table>
          <div>
            Lưu ý: Chi phí của cả quy trình sẽ được tính khi và chỉ khi chúng ta tính được thời gian thực hiện của cả quy trình.
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
            Chúng tôi
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
            Liên hệ
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
            <div>Đăng nhập</div>
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
            Đăng ký
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
          Với BPRe, chúng tôi sẽ giúp cho quy trình của bạn xử lý nhanh hơn!
        </div>
        <div
          style={{
            width: "100%",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Toàn bộ quy trình sẽ được kiểm tra và tái thiết kế để giảm bớt thời
          gian và chi phí vận hành.
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
            <div>Thử ngay</div>
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
          Hãy để quy trình của bạn được hiệu quả hơn!
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
            BPRe sẽ làm việc trực tiếp trên quy trình của bạn! Thông qua quy
            trình, luật phân lớp và luật nghiệp vụ bạn tải lên, BPRe sẽ tiến
            hành phân tích và kiểm tra toàn bộ quy trình của bạn. Từ đó, sẽ xóa
            các tác vụ không cần thiết hoặc thay đổi vị trí tác vụ để đạt được
            độ hiệu quả cao hơn.
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
              Các phương thức đánh giá
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
