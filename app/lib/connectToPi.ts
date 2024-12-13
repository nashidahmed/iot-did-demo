export async function connectToRaspberryPi(): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LAPTOP_SERVER_BASE_URL}/setup-connection`,
      {
        method: "POST",
      }
    );
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
