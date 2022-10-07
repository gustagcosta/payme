package controllers

import (
	"log"
	"payme/database"
	"payme/models"
	"payme/services"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	db := database.GetDatabase()

	var user models.User

	err := c.ShouldBindJSON(&user)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"error": "fails on parse json: " + err.Error(),
		})
		return
	}

	result := db.Where("email = ?", user.Email).First(&user)

	if result.RowsAffected != 0 {
		c.JSON(400, gin.H{
			"error": "email already registred",
		})
		return
	}

	if len(user.Email) <= 0 || len(user.Password) <= 0 || len(user.Name) <= 0 {
		c.JSON(400, gin.H{
			"error": "missing fields",
		})
		return
	}

	user.Password = services.SHA256Encoder(user.Password)

	log.Println(user)

	err = db.Create(&user).Error
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"error": "cannot create user",
		})
		return
	}

	c.Status(204)
}
