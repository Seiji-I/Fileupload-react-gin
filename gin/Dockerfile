FROM golang:1.16.9-alpine3.14

ENV GOPATH /go
ENV GO111MODULE on

RUN apk update && \
    apk --no-cache add git

WORKDIR /go/src
COPY go.mod go.sum ./
RUN go mod download && go mod verify
RUN go get github.com/cosmtrek/air@v1.29.0
RUN go mod tidy

CMD ["air", "-c", ".air.toml"]