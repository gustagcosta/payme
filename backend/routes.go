package main

import (
	"net/http"
	"payme/controllers"
	"payme/middlewares"

	"github.com/gin-gonic/gin"
)

func LoadRoutes(router *gin.Engine) *gin.Engine {
	main := router.Group("api/v1")
	{
		main.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"ok": "cool",
			})
		})

		main.GET("/home", middlewares.Auth(), func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"ok": "auth",
			})
		})

		// cors is to blame for this ugly thing below

		main.GET("/clients", middlewares.Auth(), controllers.GetAllClients)
		main.POST("/clients", middlewares.Auth(), controllers.CreateClient)
		main.PUT("/clients", middlewares.Auth(), controllers.UpdateClient)
		main.DELETE("/clients/:id", middlewares.Auth(), controllers.DeleteClient)
		main.GET("/clients/:id", middlewares.Auth(), controllers.ShowClient)

		main.GET("/charges", middlewares.Auth(), controllers.GetAllCharges)
		main.POST("/charges", middlewares.Auth(), controllers.CreateCharge)
		main.PUT("/charges", middlewares.Auth(), controllers.UpdateCharge)
		main.DELETE("/charges/:id", middlewares.Auth(), controllers.DeleteCharge)
		main.GET("/charges/:id", middlewares.Auth(), controllers.ShowCharge)
		main.GET("/charges/qrcode/:id", middlewares.Auth(), controllers.GetQrCode)

		main.POST("/login", controllers.HandleLogin)
		main.POST("/register", controllers.CreateUser)
	}

	return router
}
