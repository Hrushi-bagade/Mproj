import React from 'react'

const TableCompAvoidHead = ({data,avoidlist,tableClass,HeaderBackgroud}) => {
    return (
        <div>
            <table style={{ width: "auto", minWidth: "60%", maxHeight: "55rem" }} className='table table-striped ms-2'>

                <thead style={{ position: "sticky", top: 0, background: "white", zIndex: 1,backgroundColor:"lightblue" }}>

                    <tr>
                        {/* Render table headers, excluding keys in the avoidlist */}
                        {data &&
                            data?.length > 0 &&
                            Object.keys(data[0])
                                .filter((key) => !avoidlist?.includes(key)) // Exclude keys in avoidlist
                                .map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                    </tr>
                </thead>

                <tbody>
                    {/* Render table rows */}
                    {data?.map((item, index) => {
                        console.log("dataCom ", item)
                        return (

                            <tr key={index}>
                                {/* Render table cells, excluding keys in the avoidlist */}
                                {Object?.keys(item)?.filter((key) => !avoidlist?.includes(key)) // Exclude keys in avoidlist
                                    .map((key) => (
                                        <td key={key}>
                                        {item[key]}
                                        </td>
                                    ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableCompAvoidHead