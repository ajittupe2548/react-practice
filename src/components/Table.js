import React from 'react'
import TableRow from './TableRow'

function Table({ data }) {
    return (
        <table>
            <thead>
                <TableRow id="Id" userId="User Id" title="Title" body="Body" />
            </thead>
            <tbody>
                {
                    data.map(item => {
                        return (
                            <TableRow key={item.id} id={item.id} userId={item.userId} title={item.title} body={item.body} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table