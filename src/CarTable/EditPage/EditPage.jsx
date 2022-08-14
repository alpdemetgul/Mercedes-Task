import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPage.css";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state.row;
  const headers = [...location.state.headers];

  const [stock, setStock] = useState(data.InStock);
  const [hp, setHp] = useState(data.Hp);
  const [price, setPrice] = useState(data.Price);
  const [color, setColor] = useState(data.Color);

  const editedData = {
    CarId: data.CarId,
    InStock: stock,
    Hp: parseInt(hp),
    Price: parseInt(price),
    Color: color,
    id: data.id,
  };

  const checkHp = (horsePower) => {
    if (horsePower < 100 || horsePower > 550) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(
      `https://62f6800f612c13062b4fc875.mockapi.io/Task/CarData/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      }
    );
    navigate("/");
  };

  const disabled = () => {
    const disabled = JSON.stringify(data) === JSON.stringify(editedData);
    if (!disabled) {
      if (checkHp(hp)) return false;
    }
    return true;
  };

  console.log(disabled());

  return (
    <form className="centerForm bgColor" onSubmit={(e) => handleSubmit(e)}>
      <div className="card" style={{ width: "35rem", textAlign: "center" }}>
        <div className="card-header">{`Edit Car : ${data.id}`}</div>
        <div className="card-body">
          <div className="row g-3 align-items-center mb-3">
            <label for="stock" className="form-label pr-3">
              {`${headers[0]} :`}
            </label>
            <p>{data.CarId}</p>
          </div>

          <div className="row g-3 align-items-center mb-3">
            <label for="stock" className="form-label pr-3">
              {`${headers[1]} :`}
            </label>
            <input
              id="stock"
              type="checkbox"
              checked={stock}
              onChange={() => setStock(!stock)}
            />
          </div>
          <div className="row g-3 align-items-center mb-3">
            <label>{`${headers[2]} :`}</label>
            <input
              type="number"
              defaultValue={hp}
              onChange={(e) => setHp(e.target.value)}
              style={{ borderColor: checkHp(hp) || "red" }}
            />
            {!checkHp(hp) && (
              <p style={{ fontSize: "0.7em", color: "red" }}>
                Value must be between 100 and 550
              </p>
            )}
          </div>
          <div className="row g-3 align-items-center mb-3">
            <label>{`${headers[3]} :`}</label>

            <div
              className="input-group input-group-sm mb-3"
              style={{ justifyContent: "center" }}
            >
              <input
                type="number"
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="input-group-text">€</span>
            </div>
          </div>
          <div className="row g-3 align-items-center mb-3">
            <label>{`${headers[4]} :`}</label>
            <div className="displayFlex  justify-content-around">
              <select
                onChange={(e) => setColor(e.target.value)}
                className="text-center"
                defaultValue={data.Color}
              >
                {location.state.colors.map((color) => (
                  <option style={{ backgroundColor: color }}>{color}</option>
                ))}
              </select>
              <div className="flex" style={{ backgroundColor: color }} />
            </div>
          </div>
          <div>
            <button className="btn btn-primary mr20">Cancel</button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabled()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPage;
