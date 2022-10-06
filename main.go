package main

import (
	"payme/database"
	"payme/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	database.StartDB()

	server := gin.Default()
	server.Use(middlewares.Cors())

	LoadRoutes(server)

	server.Run()
}
