import React from "react";
import { Link } from "react-router-dom";
import currencyFormatter from "../../currencyFormatter";
import "./row.css";

const Rows = ({ row, colors, headers }) => {
  return (
    <tr>
      <th scope="row" className="thBorder">
        {row.id}
      </th>
      <td>{row.CarId}</td>
      <td>
        <input type="checkbox" checked={row.InStock} readOnly />
      </td>
      <td>{row.Hp}</td>
      <td>{currencyFormatter("EUR", row.Price)}</td>
      <td>
        <div>
          <p>{row.Color}</p>
          <div
            className="colorDiv"
            style={{ backgroundColor: `${row.Color}` }}
          />
        </div>
      </td>
      <td>
        <Link to={`Car/${row.id}`} state={{ row, colors, headers }}>
          <button className="btn btn-light">Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default Rows;
