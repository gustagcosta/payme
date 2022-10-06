package services

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"payme/models"
	"strings"
)

type AuthResponse struct {
	Access_token string
}

type QrCodeResponse struct {
	Qrcode       string
	ImagemQrcode string
}

type ChargeRequest struct {
	Calendario         Calendario `json:"calendario"`
	Valor              Valor      `json:"valor"`
	Chave              string     `json:"chave"`
	SolicitacaoPagador string     `json:"solicitacaoPagador"`
}

type Calendario struct {
	Expiracao int `json:"expiracao"`
}

type Valor struct {
	Original string `json:"original"`
}

func GnGetQrCode(charge *models.Charge, pixKey string) (*QrCodeResponse, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}

	cert, err := tls.LoadX509KeyPair(path.Join(pwd, "config", "homolog.crt.pem"), path.Join(pwd, "config", "homolog.key.pem"))
	if err != nil {
		return nil, err
	}

	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				Certificates: []tls.Certificate{cert},
			},
		},
	}

	token, err := GnAuthRequest(client)
	if err != nil {
		return nil, err
	}

	locationId, err := GnChargeRequest(client, token, charge, pixKey)
	if err != nil {
		return nil, err
	}

	qrcode, err := GnQrCodeRequest(client, locationId, token)
	if err != nil {
		return nil, err
	}

	return qrcode, nil
}

func GnQrCodeRequest(client *http.Client, locationId string, token string) (*QrCodeResponse, error) {
	request, err := http.NewRequest("GET", os.Getenv("GN_URL")+"/v2/loc/"+locationId+"/qrcode", strings.NewReader(""))
	if err != nil {
		return nil, err
	}

	request.Header.Add("Authorization", "Bearer "+token)

	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var qrcode QrCodeResponse
	json.Unmarshal([]byte(string(data)), &qrcode)

	return &qrcode, nil
}

func GnChargeRequest(client *http.Client, token string, charge *models.Charge, pixKey string) (string, error) {

	calendario := Calendario{Expiracao: 86400}
	valor := Valor{Original: fmt.Sprintf("%v.00", charge.Value)}
	chargeRequest := ChargeRequest{Calendario: calendario, Valor: valor, Chave: pixKey, SolicitacaoPagador: charge.Description}
	chargeRequestJson, err := json.Marshal(chargeRequest)
	if err != nil {
		return "", err
	}

	url := os.Getenv("GN_URL") + "/v2/cob"
	body := strings.NewReader(string(chargeRequestJson))

	request, err := http.NewRequest("POST", url, body)
	if err != nil {
		return "", err
	}

	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Authorization", "Bearer "+token)

	response, err := client.Do(request)
	if err != nil {
		return "", err
	}

	defer response.Body.Close()

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	var locationId = string(data)

	locationId = strings.Split(locationId, `"id":`)[1]
	locationId = strings.Split(locationId, `,`)[0]

	return locationId, nil
}

func GnAuthRequest(client *http.Client) (string, error) {
	url := os.Getenv("GN_URL") + "/oauth/token"
	method := "POST"
	body := strings.NewReader(`{"grant_type": "client_credentials"}`)

	request, err := http.NewRequest(method, url, body)
	if err != nil {
		return "", err
	}

	request.SetBasicAuth(os.Getenv("GN_CLIENT_ID"), os.Getenv("GN_CLIENT_SECRET"))
	request.Header.Add("Content-Type", "application/json")

	response, err := client.Do(request)
	if err != nil {
		return "", err
	}

	defer response.Body.Close()

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	var authResponse AuthResponse
	json.Unmarshal([]byte(string(data)), &authResponse)

	return authResponse.Access_token, nil
}
