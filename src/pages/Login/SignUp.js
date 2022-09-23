import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import DropdownButton from "../../components/DropdownButton";
import google from "../../resources/icons/google.svg";
import facebook from "../../resources/icons/facebook.svg";
import signup from "../../resources/icons/signup.svg";
import axios from "axios";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const baseApi = "http://localhost:3333";

  const handleSignUp = async () => {
    if (password !== confirmPassword)
      return window.alert("Password not matched");

    const endPoint = `${baseApi}/auth/signup`;

    try {
      const result = await axios.post(endPoint, {
        email: account,
        password: password,
      });
  
      if (result.status === 201) {
        nav("/dashboardUser");
      } else {
        alert("Lỗi đăng nhập")
      }
    } catch (error) {
      alert("Lỗi đăng nhập")
    }
  };

  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            justifyContent: "flex-start",
            display: "flex",
            marginLeft: "50px",
          }}
        >
          Logo
        </div>
        <img
          src={signup}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        ></img>
      </div>
      <div
        style={{
          width: "50%",
          backgroundColor: "rgba(78,205,196,0.5)",
          borderTopLeftRadius: "15px",
          borderBottomLeftRadius: "15px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          Đăng ký tài khoản
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              width: "70%",
              display: "flex",
              alignItems: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "25px",
              cursor: "pointer",
              width: "40%",
              marginRight: "20px",
            }}
          >
            <img
              src={google}
              style={{
                height: "30px",
                marginLeft: "5px",
                marginRight: "20px",
              }}
            ></img>
            <div style={{}}>Đăng ký bằng Google</div>
          </div>
          {/* <div
            style={{
              backgroundColor: "#FFFFFF",
              width: "70%",
              display: "flex",
              alignItems: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "25px",
              cursor: "pointer",
              width:"40%"
            }}
          >
            <img
              src={facebook}
              style={{
                height: "27px",
                marginLeft: "5px",
                marginRight: "20px",
              }}
            ></img>
            <div>Đăng ký bằng Facebook</div>
          </div> */}
        </div>
        <div
          style={{
            fontWeight: 600,
            color: "rgba(0,0,0,0.6)",
            marginTop: "25px",
          }}
        >
          -OR-
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "70%",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="Tài khoản Email"
            onChange={(e) => setAccount(e.target.value)}
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
          ></input>
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "70%",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="Mật khẩu"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
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
          ></input>
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "70%",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="Xác nhận mật khẩu"
            type={"password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          ></input>
        </div>
        <div
          onClick={handleSignUp}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#395185",
            color: "#FFFFFF",
            width: "70%",
            cursor: "pointer",
            textAlign: "center",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Đăng ký
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
          }}
        >
          <p>Bạn đã có tài khoản?</p>
          <p
            style={{
              marginLeft: "5px",
              color: "#0093FE",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/login");
            }}
          >
            Đăng nhập ngay
          </p>
        </div>
      </div>
    </div>
  );
}
