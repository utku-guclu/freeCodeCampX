package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

type WeatherResponse struct {
	Coord struct {
		Lon float64 `json:"lon"`
		Lat float64 `json:"lat"`
	} `json:"coord"`
	Weather []struct {
		Icon string `json:"icon"`
	} `json:"weather"`
	Main struct {
		Temp float64 `json:"temp"`
	} `json:"main"`
	Name string `json:"name"`
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/current", getCurrentWeather).Methods("GET")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	log.Printf("Server started on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func getCurrentWeather(w http.ResponseWriter, r *http.Request) {
	lat, err := strconv.ParseFloat(r.URL.Query().Get("lat"), 64)
	if err != nil {
		http.Error(w, "Invalid latitude", http.StatusBadRequest)
		return
	}

	lon, err := strconv.ParseFloat(r.URL.Query().Get("lon"), 64)
	if err != nil {
		http.Error(w, "Invalid longitude", http.StatusBadRequest)
		return
	}

	weatherResp, err := fetchWeather(lat, lon)
	if err != nil {
		http.Error(w, "Failed to fetch weather data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weatherResp)
}

func fetchWeather(lat, lon float64) (*WeatherResponse, error) {
	resp, err := http.Get("https://weather-proxy.freecodecamp.rocks/api/current?lat=" + strconv.FormatFloat(lat, 'f', -1, 64) + "&lon=" + strconv.FormatFloat(lon, 'f', -1, 64))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var weatherResp WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return nil, err
	}

	return &weatherResp, nil
}
