package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id        uint           `json:"id" gorm:"primaryKey"`
	Name      string         `json:"name"`
	Email     string         `gorm:"unique" json:"email"`
	Password  string         `json:"password"`
	PixKey    string         `json:"pix_key"`
	CreatedAt time.Time      `json:"created"`
	UpdatedAt time.Time      `json:"updated"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted"`
}
