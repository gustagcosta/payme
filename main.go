package main

import (
	"payme/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	database.StartDB()

	server := gin.Default()

	LoadRoutes(server)

	server.Run()
}
