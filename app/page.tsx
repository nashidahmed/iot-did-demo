"use client";
import { useState } from "react";
import { connectToRaspberryPi } from "./lib/connectToPi";
import { issueCredential } from "./lib/issueCredential";
import { getCredentials } from "./lib/getCredentials";
import { deleteCredential } from "./lib/deleteCredential";

interface Credential {
  id: string;
  deviceId: string;
  deviceType: string;
  timestamp: string;
  revoked?: boolean;
  credentialAttributes: any;
  state: string;
}

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("Not Connected");
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [connectionId, setConnectionId] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [connectLoading, setConnectLoading] = useState(false);
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [deleteIdLoading, setDeleteIdLoading] = useState<string>("");

  const handleConnect = async () => {
    setConnectLoading(true);
    // Simulate connection establishment
    try {
      const id = await connectToRaspberryPi();
      await getCreds();
      setConnectionStatus(`Connected to ${id}`);
      setConnectionId(id);
      setConnectLoading(false);
    } catch (error) {
      setConnectionStatus(error as string);
      setConnectLoading(false);
    }
  };

  const handleIssueCredential = async () => {
    setCredentialLoading(true);
    try {
      const credential = await issueCredential();
      setCredentialId(credential.id);
      getCreds();
      setCredentialLoading(false);
    } catch (error) {
      setConnectionStatus(error as string);
      setCredentialLoading(false);
    }
  };

  const getCreds = async () => {
    try {
      const credentials = await getCredentials();
      console.log(credentials);
      setCredentials(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCredential = async (credentialId: string) => {
    setDeleteIdLoading(credentialId);
    if (confirm("Are you sure you want to delete this credential?")) {
      try {
        await deleteCredential(credentialId);
        setCredentials((prevCredentials) =>
          prevCredentials.filter((credential) => credential.id !== credentialId)
        );
      } catch (error) {
        alert(error as string);
      }
      // Add logic to revoke credential here
    }
    setDeleteIdLoading("");
  };

  const handleRevokeCredential = (index: number) => {
    if (confirm("Are you sure you want to revoke this credential?")) {
      setCredentials((prevCredentials) => {
        const updatedCredentials = [...prevCredentials];
        updatedCredentials[index].revoked = true;
        return updatedCredentials;
      });
      alert("Credential revoked successfully!");
      // Add logic to revoke credential here
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Decentralized Identity for IoT Devices
        </h1>
        <p className="text-lg mt-4">Focus: Credential Revocation</p>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Connection Establishment
          </h2>
          <button
            onClick={handleConnect}
            disabled={connectLoading}
            className={`px-4 py-2 rounded ${
              connectLoading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {connectLoading
              ? "Connecting to Raspberry Pi..."
              : "Connect to Raspberry Pi"}
          </button>
          <p className="text-gray-700 mt-4">Status: {connectionStatus}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Issue Credential</h2>
          <button
            onClick={handleIssueCredential}
            disabled={credentialLoading || !connectionId}
            className={`px-4 py-2 rounded ${
              credentialLoading || !connectionId
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {credentialLoading ? "Issuing Credential" : "Issue Credential"}
          </button>
          <p className="text-gray-700 mt-4">
            Credential ID: {credentialId ? credentialId : "None"}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Credentials</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Device ID</th>
                <th className="border border-gray-300 p-2">Device Type</th>
                <th className="border border-gray-300 p-2">Timestamp</th>
                <th className="border border-gray-300 p-2">State</th>
                <th className="border border-gray-300 p-2">Revoke</th>
                <th className="border border-gray-300 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {credentials
                .sort(
                  (a, b) =>
                    new Date(b.credentialAttributes[2].value).getTime() -
                    new Date(a.credentialAttributes[2].value).getTime()
                )
                .map((credential, index) => (
                  <tr key={credential.id} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {credential.credentialAttributes[0].value}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {credential.credentialAttributes[1].value}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(
                        credential.credentialAttributes[2].value
                      ).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {credential.state}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {credential.revoked ? (
                        "Revoked"
                      ) : (
                        <button
                          onClick={() => handleRevokeCredential(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleDeleteCredential(credential.id)}
                        disabled={deleteIdLoading === credential.id}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        {deleteIdLoading === credential.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="text-center mt-8">
        <p>
          Built for demonstrating decentralized identity management for IoT
          devices
        </p>
      </footer>
    </div>
  );
}
