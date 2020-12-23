package com.comncon.dockermanager.config;

import com.comncon.dockermanager.services.RemoteDockerClientFactory;
import com.github.dockerjava.api.DockerClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    @Bean(destroyMethod = "close")
    public DockerClient dockerClient() {
        return RemoteDockerClientFactory.create();
    }
}
