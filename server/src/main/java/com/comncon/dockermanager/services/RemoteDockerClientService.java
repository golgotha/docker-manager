package com.comncon.dockermanager.services;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RemoteDockerClientService implements DockerClientService {
    @Autowired
    private DockerClient client;

    @Override
    public List<Image> getImages() {
        return client.listImagesCmd().exec();
    }

    @Override
    public List<Container> getContainers() {
        return client.listContainersCmd().exec();
    }

    @Override
    public void removeImage(String imageId, Boolean force) {
        client.removeImageCmd(imageId)
                .withImageId(imageId)
                .withForce(force)
                .exec();
    }
}
 