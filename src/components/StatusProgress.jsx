import React, { useState } from 'react';

const StatusProgress = ({data}) => {
    const arr = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
    return (
        <div className="progressContainer">
            <div className="content">
                <div className="progressbar">
                    {arr.map((e, i) => (
                        <div
                            key={i}
                            className={`progress-step`}
                            style={{ backgroundColor: e === data ? '#3498db' : '#dcddcd' }}
                            data-title={e}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default StatusProgress