import React, {useEffect, useState, useCallback} from 'react';
import PT from 'prop-types';
import DockerImageService from '../../api/services/DockerImageService';
import Image from './Image';
import ModalWindow from "../../widgets/ModalWindow";

const ImagesList = ({filter}) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState({hasError: false});
    useEffect(() => {
        DockerImageService.getImages()
            .then(result => {
                setImages(result);
            });

    }, []);

    const onRemove = useCallback(id => {
        DockerImageService.removeImage(id)
            .then(() => {
                const candidates = images.filter(image => image.Id !== id);
                setImages(candidates);
            })
            .catch(error => {
                setError({hasError: true, message: error.response.text, imageId: id});
            });
    });

    const onRemoveForce = useCallback(() => {
        const imageId = error.imageId;
        DockerImageService.removeImage(imageId, true)
            .then(() => {
                const candidates = images.filter(image => image.Id !== id);
                setImages(candidates);
                setError({hasError: false});
            })
            .catch(error => {
                setError({hasError: true, message: error.response.text, imageId});
            });
    });

    const onClose = useCallback(() => {
        setError({hasError: false});
    });

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
                    <th/>
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
                                       onRemove={onRemove}
                        />);
                    })
                }
                </tbody>
            </table>

            {
                error.hasError &&
                <ModalWindow>
                    <div className="modal active" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Error</h5>
                                    <button type="button" className="btn-close fui-cross" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}/>
                                </div>
                                <div className="modal-body">
                                    <p>{error.message}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={onRemoveForce}>Try Remove force</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalWindow>
            }
        </div>
    )
}

ImagesList.propTypes = {
    filter: PT.string
}

export default ImagesList;

