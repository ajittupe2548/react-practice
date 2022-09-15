import React from "react";
import Columns from "./Columns";

// Motivation - <Columns /> would need to return multiple <td> elements in order for the rendered HTML to be valid. If a parent div was used inside the render() of <Columns />, then the resulting HTML will be invalid.
// Fragments solve this problem.

class Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
