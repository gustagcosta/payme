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

		user := main.Group("users")
		{
			user.POST("/", controllers.CreateUser)
		}

		main.POST("login", controllers.HandleLogin)
	}

	return router
}
