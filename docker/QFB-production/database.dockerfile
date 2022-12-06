FROM mongo:latest
ARG MONGO_INITDB_ROOT_USERNAME
ARG MONGO_INITDB_ROOT_PASSWORD
RUN test -n "${MONGO_INITDB_ROOT_USERNAME}"
RUN test -n "${MONGO_INITDB_ROOT_PASSWORD}"
ENV MONGO_INITDB_ROOT_USERNAME={MONGO_INITDB_ROOT_USERNAME}
ENV MONGO_INITDB_ROOT_PASSWORD={MONGO_INITDB_ROOT_PASSWORD}
EXPOSE 27020