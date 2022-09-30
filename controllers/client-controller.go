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
	db.Find(&clients)

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

	result := db.First(&client, idParse)

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

	var client models.Client

	err := c.ShouldBindJSON(&client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fails on parse json",
		})
		return
	}

	err = db.First(&client, client.ID).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot find client by id",
		})
		return
	}

	if len(client.Name) <= 0 {
		c.JSON(400, gin.H{
			"error": "missing fields",
		})
		return
	}

	client.UserId = uint(c.MustGet("UserId").(int))

	err = db.Save(&client).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot update client",
		})
		return
	}

	c.Status(http.StatusOK)
}
