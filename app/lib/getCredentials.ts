export async function getCredentials() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LAPTOP_SERVER_BASE_URL}/get-credentials`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const credentials = await response.json();
      console.log(credentials);
      return credentials;
    } else {
      alert("Failed to retrieve credentials");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
