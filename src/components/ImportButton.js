import React from "react";
import "./ImportButton.css";

export default function ImportButton(props) {
  return (
    <button
      className="btn import_button"
      style={{
        minWidth: "230px",
        minHeight: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
      }}
      onClick={() => {
        props.onClick();
      }}
    >
      <div className="row">
        <div className="col-4" style={{
          marginTop:"10px"
        }}>
          <img src={props.image} />
        </div>
        <div className="col-8 m-auto text-start" style={{ fontSize: 18 }}>
          {props.text}
        </div>
      </div>
    </button>
  );
}
