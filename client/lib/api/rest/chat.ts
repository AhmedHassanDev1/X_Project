import { ChatType } from "@/types/chat";
import api from ".";

export async function createOrFindChat(participants: string[], type: string | undefined) {
    return await api.post("/chat/init", { participants, type })
}

export async function getChatById(chatId: string) {
    return await api.get("/chat/" + chatId)
}

export async function getMesages(chatId: string, cursor?: string, limit?: number) {
    limit = limit || 20
    return (await api.get("/chat/" + chatId + "/messages", {
        params: { cursor, limit }
    })).data
}

export async function getconversations( cursor?: string | null, limit?: number) {
    limit = limit || 20
    return (await api.get("/chat" + "/conversations", {
        params: { cursor, limit }
    })).data
}