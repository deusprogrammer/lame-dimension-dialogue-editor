import React from 'react';

const component = ({onChange}) => {
    return (
        <div className="options">
            <h2>Options</h2>
            <table>
                <tr>
                    <td><input type='checkbox' /></td>
                    <td>Smaller Portraits</td>
                </tr>
                <tr>
                    <td><input type='checkbox' /></td>
                    <td>Disable Portraits</td>
                </tr>
                <tr>
                    <td><input type='checkbox' /></td>
                    <td>Keep Black Bars</td>
                </tr>
            </table>
        </div>
    )
}

export default component;