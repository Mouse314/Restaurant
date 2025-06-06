import React, { useEffect, useState } from "react";

const Table = (props) => {

    const [data, setData] = useState(null);

    const sortBy = (field) => {
        setData([...data].sort((a, b) => a[field] - b[field]));
    }

    useEffect(() => {
        setData(props.data);
    } ,[]);

    return (
        <table>
                <thead>
                    <tr>
                        {props.columns.map((el, ind) => {
                            return(<td onClick={e => sortBy(el[1])} key={ind}>{el[0]}</td>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data !== null && (data.map((el, ind) => {
                        return(<React.Fragment key={el.id}>
                            <tr key={ind}>
                                {props.columns.map((prop, ind) => {
                                    const key = prop[1];
                                    return(<td key={ind} onClick={() => props.handleRowClick(el.id)}>{el[key]}</td>)
                                })}
                            </tr>
                        </React.Fragment>)
                    }))}
                </tbody>
            </table>
    );
};

export default Table;