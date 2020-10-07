import React from 'react'

const Arguments = ({ selectedArg, onChange }) => {
    console.log('selectedArg', selectedArg);
    return (
        <div>
            <h1>Arguments</h1>
            <ul>
                {Object.entries(selectedArg).map(([argName, argValue], index) => (
                    <li key={index}>
                        {argName} :
                        <input
                            name={argName}
                            value={argValue || ''}
                            onChange={onChange}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Arguments