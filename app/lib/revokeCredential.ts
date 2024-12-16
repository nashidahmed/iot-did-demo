import { Credential } from "../page";

export async function revokeCredential(credential: Credential) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LAPTOP_SERVER_BASE_URL}/revoke-credential`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      }
    );

    if (response.ok) {
      alert("Credential revoked successfully!");
    } else {
      throw new Error("Failed to revoking credential");
    }
  } catch (error) {
    throw new Error(`Error revoking credential: ${error}`);
  }
}
