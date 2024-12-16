export async function sendProofRequest(): Promise<{ id: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LAPTOP_SERVER_BASE_URL}/send-proof`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const res = await response.json();
      return { id: res.proof.proofRecord.id };
    } else {
      alert("Proof Abandoned. Not all presentations are valid");
      throw new Error("Failed to send proof");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
}
