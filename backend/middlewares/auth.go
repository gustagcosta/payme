package middlewares

import (
	"log"
	"payme/services"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		const Bearer_schema = "Bearer "
		header := c.GetHeader("Authorization")
		if header == "" {
			c.AbortWithStatus(401)
		}

		token := header[len(Bearer_schema):]

		if !services.NewJWTService().ValidateToken(token) {
			c.AbortWithStatus(401)
		}

		id, err := services.NewJWTService().GetIDFromToken(token)
		if err != nil {
			log.Println(err)
			c.AbortWithStatus(401)
		}

		c.Set("UserId", id)
	}
}
