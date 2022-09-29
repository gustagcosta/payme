package database

import (
	"fmt"
	"log"
	"payme/models"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func StartDB() {
	str := "root:docker@/payme?parseTime=true"

	database, err := gorm.Open(mysql.Open(str), &gorm.Config{})

	if err != nil {
		fmt.Println("Could not connect to the database")
		log.Fatal("Error: ", err)
	}

	db = database
	config, _ := db.DB()
	config.SetMaxIdleConns(10)
	config.SetMaxOpenConns(100)
	config.SetConnMaxLifetime(time.Hour)

	RunMigrations(db)
}

func CloseConn() error {
	config, err := db.DB()
	if err != nil {
		return err
	}

	err = config.Close()
	if err != nil {
		return err
	}

	return nil
}

func GetDatabase() *gorm.DB {
	return db
}

func RunMigrations(db *gorm.DB) {
	db.AutoMigrate(models.User{})
}
