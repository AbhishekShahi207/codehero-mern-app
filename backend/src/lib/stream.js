import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream apikey or apiSecret is missing");
}
export const streamClient = new StreamClient(apiKey, apiSecret); //this is for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is for chat messaging

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted Successfully:", userData);
  } catch (error) {
    console.log("error in upserting stream error");
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted Successfully:", userId);
  } catch (error) {
    console.log("error in deleteing stream user error");
  }
};
