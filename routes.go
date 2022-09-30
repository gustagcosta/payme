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

		main.POST("login", controllers.HandleLogin)

		user := main.Group("users")
		{
			user.POST("/", controllers.CreateUser)
		}

		charge := main.Group("charges", middlewares.Auth())
		{
			charge.GET("/", controllers.GetAllCharges)
			charge.POST("/", controllers.CreateCharge)
			charge.PUT("/", controllers.UpdateCharge)
			charge.DELETE("/:id", controllers.DeleteCharge)
			charge.GET("/:id", controllers.ShowCharge)
		}

		client := main.Group("clients", middlewares.Auth())
		{
			client.GET("/", controllers.GetAllClients)
			client.POST("/", controllers.CreateClient)
			client.PUT("/", controllers.UpdateClient)
			client.DELETE("/:id", controllers.DeleteClient)
			client.GET("/:id", controllers.ShowClient)
		}
	}

	return router
}
