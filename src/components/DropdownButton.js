import React from "react";
import { Dropdown } from "react-bootstrap";

export default function DropdownButton(props) {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className="btn"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  ));

  return (
    <Dropdown
      style={{
        backgroundColor: "white",
        boxShadow: '1px 1px 0.5px #9E9E9E'
      }}
    >
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <div className="row m-auto m-0 p-0" style={{ padding: 10 }}>
          <div className="col-1 m-auto m-0 p-0">
            <img src={props.itemStart} height="20px" width="20px" />
          </div>
          <div className="col-11 m-auto  m-0 p-0">
            <div className="ms-3">User Name</div>
          </div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.items.map((item, index) => {
          return (
            <div>
              <Dropdown.Item
                eventKey={index}
                onClick={() => {
                  props.onClick(item, index);
                }}
              >
                {
                  <div className="row">
                    <div className="col-3 text-center">
                      <img
                        src={props.icons_list[index]}
                        width="20px"
                        height="20px"
                      />
                    </div>
                    <div className="col-9" style={{ fontSize: "20px" }}>
                      {item}
                    </div>
                  </div>
                }
              </Dropdown.Item>
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
