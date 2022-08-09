package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/gin-contrib/cors"
	"log"
	"fmt"
	"time"
)

func main() {
	router := gin.Default()
	
	router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"},
    AllowMethods:     []string{"GET", "POST", "OPTIONS"},
    AllowHeaders:     []string{"Origin"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    MaxAge: 1 * time.Hour,
  }))

	router.MaxMultipartMemory = 8 << 20
	router.POST("/upload", func(c *gin.Context) {
		file, err := c.FormFile("file")
		if err != nil {
			log.Fatal(err)
		}
		log.Println(file.Filename)
		err = c.SaveUploadedFile(file, "/go/src/uploads/"+file.Filename)
		if err != nil {
			log.Fatal(err)
		}
		c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
		c.JSON(
			http.StatusOK,
			gin.H{
				"message": "OK",
			},
		)
	})
	router.Run(":3333")
}
