package com.comncon.dockermanager.controller;

import com.comncon.dockermanager.contracts.RemoveImageRequestDto;
import com.comncon.dockermanager.services.DockerClientService;
import com.github.dockerjava.api.exception.DockerException;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class ImageController {

    @Autowired
    private DockerClientService dockerClientService;

    @GetMapping("/images")
    @ResponseBody
    public List<Image> getImages() {
        return dockerClientService.getImages();
    }

    @PostMapping("/image/remove")
    public void remove(@RequestBody RemoveImageRequestDto request) {
        dockerClientService.removeImage(request.getId(), request.isForce());
    }

    @ExceptionHandler({DockerException.class})
    @ResponseBody
    public ResponseEntity<String> handleError(DockerException e) {
        return new ResponseEntity<>(e.getMessage(), Objects.requireNonNull(HttpStatus.resolve(e.getHttpStatus())));
    }

    public static class ErrorResponseDto {
        private final String message;

        public ErrorResponseDto(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
