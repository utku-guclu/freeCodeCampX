# Use the official Go image
FROM golang:latest

# Set the current working directory inside the container
WORKDIR /app

# Copy the Go modules and dependencies
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o main .

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run the executable
CMD ["./main"]
