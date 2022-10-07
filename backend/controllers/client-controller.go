package controllers

import (
	"net/http"
	"payme/database"
	"payme/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllClients(c *gin.Context) {
	db := database.GetDatabase()

	var clients []models.Client
	db.Where("user_id = ?", c.MustGet("UserId")).Find(&clients)

	c.JSON(http.StatusOK, clients)
}

func ShowClient(c *gin.Context) {
	id := c.Param("id")

	idParse, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "id has to be integer",
		})
		return
	}

	db := database.GetDatabase()

	var client models.Client

	result := db.Where("user_id = ? and id = ?", c.MustGet("UserId"), idParse).First(&client)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message": "Client not found",
		})
		return
	}

	c.JSON(http.StatusOK, client)
}

func CreateClient(c *gin.Context) {
	db := database.GetDatabase()

	var client models.Client

	err := c.ShouldBindJSON(&client)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fails on parse json",
		})
		return
	}

	client.UserId = uint(c.MustGet("UserId").(int))

	err = db.Create(&client).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot create client",
		})
		return
	}

	c.Status(http.StatusNoContent)
}

func DeleteClient(c *gin.Context) {
	id := c.Param("id")
	idParsed, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "id has to be integer",
		})
		return
	}

	db := database.GetDatabase()

	err = db.Delete(&models.Client{}, idParsed).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot delete client",
		})
		return
	}

	c.Status(http.StatusNoContent)
}

func UpdateClient(c *gin.Context) {
	db := database.GetDatabase()

	type UpdateClientDTO struct {
		ID    uint   `json:"id"`
		Name  string `json:"name"`
		Email string `gorm:"unique" json:"email"`
	}

	var oldClient models.Client
	var newClient UpdateClientDTO

	err := c.ShouldBindJSON(&newClient)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fails on parse json",
		})
		return
	}

	err = db.First(&oldClient, newClient.ID).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot find client by id",
		})
		return
	}

	if len(newClient.Name) <= 0 {
		c.JSON(400, gin.H{
			"error": "missing fields",
		})
		return
	}

	oldClient.Email = newClient.Email
	oldClient.Name = newClient.Name

	err = db.Save(&oldClient).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot update client",
		})
		return
	}

	c.Status(http.StatusOK)
}
