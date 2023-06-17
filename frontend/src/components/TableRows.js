function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { Name, Age, Gender } = data;

    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={Name}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Name"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={Age}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Age"
            className="form-control"
          />
        </td>

        <td>
          <input
            type="text"
            value={Gender}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Gender"
            className="form-control"
          />
        </td>
        <td>
          {/* <select
            value={Gender}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select> */}
        </td>

        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRows;
