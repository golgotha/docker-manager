package com.comncon.dockermanager.controller;

import com.comncon.dockermanager.services.DockerClientService;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ImageController {

    @Autowired
    private DockerClientService dockerClientService;

    @GetMapping("/images")
    @ResponseBody
    public List<Image> getImages() {
        return dockerClientService.getImages();
    }
}
