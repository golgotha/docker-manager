import React from 'react';
import PT from 'prop-types';
const bytesToMegaBytes = (value) => (value / Math.pow(1024, 2)).toFixed(2);

const Image = ({id, repository, tag, created, size, onRemove}) => {
    const idStartIndex = id.indexOf(":") + 1;
    return (
        <tr>
            <td>{repository}</td>
            <td>{tag}</td>
            <td>{id.slice(idStartIndex, idStartIndex + 12)}</td>
            <td>{created}</td>
            <td>{bytesToMegaBytes(size)} MB</td>
            <td><a className="fui-cross" onClick={() => onRemove(id)}/></td>
        </tr>
    )
}

Image.propTypes =  {
    id: PT.string.isRequired,
    repository: PT.string.isRequired,
    tag: PT.string.isRequired,
    onRemove: PT.func
}
export default Image;