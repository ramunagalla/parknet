package com.parknet.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.parknet.dto.ItineraryResponse;
import com.parknet.util.PythonExecutor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ItineraryService {

    private final String basePath = "/Users/ramunagalla/desktop/mscs";

    public ItineraryResponse generateBasicItinerary(String json) {
        saveJson(json, "file.json");
        boolean executed = PythonExecutor.runPython("/opt/anaconda3/bin/python", basePath + "/simple_itinerary.py");
        return executed ? readResponse("itinerary.txt") : new ItineraryResponse("Error executing basic itinerary.");
    }

    public ItineraryResponse generateComplexItinerary(String json) {
        saveJson(json, "file.json");
        boolean executed = PythonExecutor.runPython("/opt/anaconda3/bin/python", basePath + "/advanced_itinerary.py");
        return executed ? readResponse("destination_options.txt") : new ItineraryResponse("Error executing complex itinerary.");
    }

    public ItineraryResponse choicesSelection(String destination) {
        try {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("destination", destination);
            try (FileWriter writer = new FileWriter(basePath + "/file.json")) {
                gson.toJson(jsonObject, writer);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        boolean executed = PythonExecutor.runPython("/opt/anaconda3/bin/python", basePath + "/simple_itinerary.py");
        return executed ? readResponse("itinerary.txt") : new ItineraryResponse("Error in choices selection.");
    }

    public ItineraryResponse quickUpdates() {
        boolean executed = PythonExecutor.runPython("/opt/anaconda3/bin/python", basePath + "/quick_update.py");
        return executed ? readResponse("quick_update.txt") : new ItineraryResponse("Error in quick updates.");
    }

    private void saveJson(String json, String filename) {
        try (FileWriter writer = new FileWriter(basePath + "/" + filename)) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private ItineraryResponse readResponse(String fileName) {
        try {
            String content = Files.readString(Paths.get(fileName));
            return new ItineraryResponse(content);
        } catch (IOException e) {
            return new ItineraryResponse("Failed to read " + fileName);
        }
    }
}
