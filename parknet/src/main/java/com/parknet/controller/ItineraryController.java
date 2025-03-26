package com.parknet.controller;

import com.parknet.dto.ItineraryResponse;
import com.parknet.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @PostMapping("/generateBasicItinerary")
    public ItineraryResponse generateBasic(@RequestBody String requestBody) {
        return itineraryService.generateBasicItinerary(requestBody);
    }

    @PostMapping("/generateComplexItinerary")
    public ItineraryResponse generateComplex(@RequestBody String requestBody) {
        return itineraryService.generateComplexItinerary(requestBody);
    }

    @PostMapping("/choicesSelection")
    public ItineraryResponse choicesSelection(@RequestBody String destination) {
        return itineraryService.choicesSelection(destination);
    }

    @PostMapping("/quickUpdates")
    public ItineraryResponse quickUpdates() {
        return itineraryService.quickUpdates();
    }
}
