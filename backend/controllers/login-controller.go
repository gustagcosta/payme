package controllers

import (
	"log"
	"payme/database"
	"payme/models"
	"payme/services"

	"github.com/gin-gonic/gin"
)

func HandleLogin(c *gin.Context) {
	db := database.GetDatabase()

	var p models.User
	err := c.ShouldBindJSON(&p)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"error": "fails on parse json: " + err.Error(),
		})
		return
	}

	var user models.User
	dbError := db.Where("email = ?", p.Email).First(&user).Error
	if dbError != nil {
		c.JSON(400, gin.H{
			"error": "cannot find user",
		})
		return
	}

	if user.Password != services.SHA256Encoder(p.Password) {
		c.JSON(401, gin.H{
			"error": "invalid credentials",
		})
		return
	}

	token, err := services.NewJWTService().GenerateToken(user.ID)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"token": token,
	})
}
