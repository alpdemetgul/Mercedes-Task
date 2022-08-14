import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Rows from "../Row/row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarTable.css";

const CarTable = () => {
  const [carData, setCarData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const Cardata = async () => {
      const result = await fetch(
        "https://62f6800f612c13062b4fc875.mockapi.io/Task/CarData",
        { method: "GET" }
      );
      let data = await result.json();
      setCarData(data);

      const headers = Object.keys(data[0]);
      headers.pop();
      setHeaders(headers);

      data.map((val) => setColors((prev) => [...prev, val.Color]));

      return data;
    };
    Cardata();
  }, []);

  return (
    carData && (
      <div className="text-center bgColor ">
        <table className="table table-striped table-dark align-middle">
          <thead>
            <tr>
              <th scope="col">{headers.id}</th>
              {headers.map((header) => (
                <th scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {carData.map((car) => (
              <Rows row={car} colors={colors} headers={headers} />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default CarTable;
