package controllers

import (
	"net/http"
	"payme/database"
	"payme/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllCharges(c *gin.Context) {
	db := database.GetDatabase()

	var charges []models.Charge
	db.Find(&charges)

	c.JSON(http.StatusOK, charges)
}

func ShowCharge(c *gin.Context) {
	id := c.Param("id")

	idParse, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "id has to be integer",
		})
		return
	}

	db := database.GetDatabase()

	var charge models.Charge

	result := db.First(&charge, idParse)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message": "charge not found",
		})
		return
	}

	c.JSON(http.StatusOK, charge)
}

func CreateCharge(c *gin.Context) {
	db := database.GetDatabase()

	var p models.Charge

	err := c.ShouldBindJSON(&p)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fails on parse json",
		})
		return
	}

	if p.ClientId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "a charge must have a client",
		})
		return
	}

	if p.Value < 100 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "value must be bigger than 100",
		})
		return
	}

	p.UserId = uint(c.MustGet("UserId").(int))

	err = db.Create(&p).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot create charge",
		})
		return
	}

	c.Status(http.StatusNoContent)
}

func DeleteCharge(c *gin.Context) {
	id := c.Param("id")
	idParsed, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "id has to be integer",
		})
		return
	}

	db := database.GetDatabase()

	err = db.Delete(&models.Charge{}, idParsed).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot delete charge",
		})
		return
	}

	c.Status(http.StatusNoContent)
}

func UpdateCharge(c *gin.Context) {
	db := database.GetDatabase()

	var p models.Charge

	err := c.ShouldBindJSON(&p)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fails on parse json",
		})
		return
	}

	err = db.First(&p, p.ID).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot find charge by id",
		})
		return
	}

	if p.ClientId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "a charge must have a client",
		})
		return
	}

	if p.Value < 100 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "value must be bigger than 100",
		})
		return
	}

	p.UserId = uint(c.MustGet("UserId").(int))

	err = db.Save(&p).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot update charge",
		})
		return
	}

	c.Status(http.StatusOK)
}
