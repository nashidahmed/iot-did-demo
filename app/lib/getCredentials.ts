export async function getCredentials() {
  try {
    const response = await fetch("http://localhost:4000/get-credentials", {
      method: "GET",
    });
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
