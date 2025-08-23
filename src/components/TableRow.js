import React from "react"

const TableRow = ({ id, userId, title, body }) => {
    return (
        <tr>
            <th>
                {id}
            </th>
            <th>
                {userId}
            </th>
            <th>
                {title}
            </th>
            <th>
                {body}
            </th>
        </tr>
    )
}

export default TableRow;