export async function issueCredential(): Promise<{ id: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LAPTOP_SERVER_BASE_URL}/issue-credential`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const credentialId = await response.json();
      console.log(credentialId);
      return credentialId;
    } else {
      throw new Error("Failed to connect");
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
