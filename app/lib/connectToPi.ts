export async function connectToRaspberryPi(): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/setup-connection", {
      method: "POST",
    });
    if (response.ok) {
      const connectionId = await response.text();
      return connectionId;
    } else {
      alert("Failed to connect");
      return "";
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
}
