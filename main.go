package main

import (
	"payme/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	database.StartDB()
	godotenv.Load()

	server := gin.Default()

	LoadRoutes(server)

	server.Run()
}
