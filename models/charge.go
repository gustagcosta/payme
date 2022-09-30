package models

import (
	"time"
)

type Charge struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Value       uint      `json:"value"`
	Description string    `json:"description"`
	ClientId    uint      `json:"client_id"`
	Payed       bool      `json:"payed"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	UserId      uint      `json:"user_id"`
}
