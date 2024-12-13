export async function deleteCredential(credentialId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RASPBERRY_PI_SERVER_BASE_URL}/delete-credential/${credentialId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Credential deleted successfully!");
    } else {
      throw new Error("Failed to delete credential");
    }
  } catch (error) {
    throw new Error(`Error deleting credential: ${error}`);
  }
}
