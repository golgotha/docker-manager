FROM openjdk:8u275-jre
MAINTAINER Valery Kantor

#ENV JAVA_OPTS="-Xms64m -Xmx256m -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
ENV JAVA_OPTS="-Xms64m -Xmx256m"
ADD target/dockermanager.jar dockermanager.jar
VOLUME /tmp
ENTRYPOINT java ${JAVA_OPTS} -Djava.security.egd="file:/dev/./urandom" -Djava.awt.headless=true -XX:-OmitStackTraceInFastThrow -jar "/dockermanager.jar"
