package com.comncon.dockermanager.services;


import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;

import java.util.List;

public interface DockerClientService {

    List<Image> getImages();

    List<Container> getContainers();

    void removeImage(String imageId);
}
