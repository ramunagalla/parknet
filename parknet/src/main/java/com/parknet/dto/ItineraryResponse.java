package com.parknet.dto;

public class ItineraryResponse {
    private String itinerary;

    public ItineraryResponse(String itinerary) {
        this.itinerary = itinerary;
    }

    public String getItinerary() {
        return itinerary;
    }

    public void setItinerary(String itinerary) {
        this.itinerary = itinerary;
    }
}
