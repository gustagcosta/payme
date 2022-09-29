package controllers

import (
	"payme/database"
	"payme/models"
	"payme/services"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	db := database.GetDatabase()

	// Parseando JSON
	var user models.User

	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "fails on parse json: " + err.Error(),
		})
		return
	}

	// Ver se usuário com o mesmo email já existe
	result := db.Where("email = ?", user.Email).First(&user)

	if result.RowsAffected != 0 {
		c.JSON(400, gin.H{
			"error": "email already registred",
		})
		return
	}

	// Verificar campos nulos
	if len(user.Email) <= 0 || len(user.Password) <= 0 || len(user.Name) <= 0 {
		c.JSON(400, gin.H{
			"error": "missing fields",
		})
		return
	}

	// Encriptando senha
	user.Password = services.SHA256Encoder(user.Password)

	// Criando usuário
	err = db.Create(&user).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "cannot create user",
		})
		return
	}

	// Retorno de sucesso
	c.Status(204)
}
