import React, {useEffect, useState} from 'react';
import PT from 'prop-types';
import Container from './Container';
import DockerContainerService from "../../api/services/DockerContainerService";

const ContainersList = ({filter}) => {
    const [containers, setContainers] = useState([]);
    useEffect(() => {
        DockerContainerService.getContainers()
            .then(result => {
                setContainers(result);
            });

    }, []);

    const filterPredicate = (id, filter) => {
        if (filter) {
            return id.indexOf(filter) !== -1;
        }
        return true;
    }

    return (
        <div className="container-list">
            <table className="table">
                <thead>
                <tr>
                    <th>CONTAINER ID</th>
                    <th>IMAGE</th>
                    <th>CREATED</th>
                    <th>STATUS</th>
                    <th>PORTS</th>
                    <th>NAMES</th>
                </tr>
                </thead>

                <tbody>
                {
                    containers.filter(container => filterPredicate(container.Names[0], filter)).map(container => {
                        // const repoTags = container.RepoTags[0].split(":");
                        return (<Container id={container.Id}
                                           key={container.Id}
                                           image={container.Image}
                                           created={container.Created}
                                           status={container.Status}
                                           ports={container.Ports}
                                           names={container.Names}
                        />);
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

ContainersList.propTypes = {
    filter: PT.string
}

export default ContainersList;

