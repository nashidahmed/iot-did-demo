export async function issueCredential() {
  try {
    const response = await fetch("http://localhost:5000/issue-credential", {
      method: "POST",
    });
    if (response.ok) {
      alert("Issued a credential to Raspberry Pi agent successfully!");
    } else {
      alert("Failed to connect");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
