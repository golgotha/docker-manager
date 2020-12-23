import React from 'react';
import PT from 'prop-types';

const Container = ({id, image, created, status, ports, names}) => {
    const compiledPorts = ports.flatMap(port => {
        if (port.IP) {
            return `${port.IP}:${port.PublicPort}->${port.PrivatePort}/${port.Type}`;
        }

        return `${port.PrivatePort}/${port.Type}`;
    }).join(", ");

    const compiledNames = names.flatMap(name => {
        return name.replace("/", "");
    }).join(", ");
    return (
        <tr>
            <td>{id.slice(0, 12)}</td>
            <td>{image}</td>
            <td>{created}</td>
            <td>{status}</td>
            <td>{compiledPorts}</td>
            <td>{compiledNames}</td>
            {/*<td><a className="btn btn-block btn-lg btn-primary">Remove</a></td>*/}
        </tr>
    )
}

Container.propTypes =  {
    id: PT.string.isRequired,
    image: PT.string.isRequired,
    status: PT.string.isRequired,
    ports: PT.array,
    names: PT.array
}
export default Container;