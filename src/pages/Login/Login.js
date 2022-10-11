import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import DropdownButton from "../../components/DropdownButton";
import google from "../../resources/icons/google.svg";
import facebook from "../../resources/icons/facebook.svg";
import loginGif from "../../resources/icons/loginGif.gif";
import axios from "axios";
import { baseApi } from "utils/api";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    const endPoint = `${baseApi}/auth/signin`;

    try {
        const result = await axios.post(endPoint, {
          email: account,
          password: password,
        });
    
        if (result.status === 201) {
          localStorage.setItem('access_token', result.data.access_token)
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
          width: "40%",
          backgroundColor: "rgba(78,205,196,0.5)",
          borderTopRightRadius: "15px",
          borderBottomRightRadius: "15px",
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
          Đăng nhập
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
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Tài khoản Email"
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
          onClick={handleSignIn}
        >
          Đăng nhập
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
            backgroundColor: "#FFFFFF",
            width: "70%",
            display: "flex",
            alignItems: "center",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderRadius: "5px",
            marginTop: "25px",
            cursor: "pointer",
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
          <div style={{}}>Đăng nhập bằng Google</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
          }}
        >
          <p>Bạn chưa có tài khoản?</p>
          <p
            style={{
              marginLeft: "5px",
              color: "#0093FE",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/signup");
            }}
          >
            Đăng ký ngay
          </p>
        </div>
      </div>
      <div
        style={{
          width: "60%",
          backgroundColor: "#F6F7F7",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            justifyContent: "flex-end",
            display: "flex",
            marginRight: "50px",
          }}
        >
          Logo
        </div>
        <img
          src={loginGif}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        ></img>
      </div>
    </div>
  );
}
