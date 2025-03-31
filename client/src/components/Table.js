import React from "react";

const Table = (props) => {
    return (
        <table>
                <thead>
                    <tr>
                        {props.columns.map((el, ind) => {
                            return(<td key={ind}>{el[0]}</td>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data !== null && (props.data.map((el, ind) => {
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