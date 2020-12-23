import React, {useEffect, useState} from 'react';
import PT from 'prop-types';
import DockerImageService from '../../api/services/DockerImageService';
import Image from './Image';

const ImagesList = ({filter}) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        DockerImageService.getImages()
            .then(result => {
                setImages(result);
            });

    }, []);

    const filterPredicate = (id, filter) => {
        if (filter) {
            return id.indexOf(filter) !== -1;
        }
        return true;
    }

    return (
        <div className="image-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>REPOSITORY</th>
                        <th>TAG</th>
                        <th>IMAGE ID</th>
                        <th>CREATED</th>
                        <th>SIZE</th>
                    </tr>
                </thead>

                <tbody>
                {
                    images.filter(image => filterPredicate(image.RepoTags[0], filter)).map(image => {
                        const repoTags = image.RepoTags[0].split(":");
                        return (<Image id={image.Id}
                                       key={image.Id}
                                       repository={repoTags[0]}
                                       tag={repoTags[1]}
                                       created={image.Created}
                                       size={image.Size}
                        />);
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

ImagesList.propTypes = {
    filter: PT.string
}

export default ImagesList;

