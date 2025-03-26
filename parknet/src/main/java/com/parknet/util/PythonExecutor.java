package com.parknet.util;

public class PythonExecutor {
    public static boolean runPython(String pythonCommand, String scriptPath) {
        try {
            ProcessBuilder pb = new ProcessBuilder(pythonCommand, scriptPath);
            Process process = pb.start();
            int exitCode = process.waitFor();
            return exitCode == 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
