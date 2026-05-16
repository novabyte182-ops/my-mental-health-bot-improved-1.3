/**
 * localStorage utilities for user profiles, conversations, and memories
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'serenity_user_profile',
  CONVERSATIONS: 'serenity_conversations',
  CURRENT_CONVERSATION: 'serenity_current_conversation',
  MOOD_HISTORY: 'serenity_mood_history',
  JOURNAL_ENTRIES: 'serenity_journal_entries',
}

export const storage = {
  // User Profile Management
  getUserProfile: () => {
    try {
      const data = localStorage?.getItem(STORAGE_KEYS.USER_PROFILE)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  setUserProfile: (profile) => {
    try {
      localStorage?.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
      return true
    } catch {
      return false
    }
  },

  createUserProfile: (name) => {
    const profile = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    storage.setUserProfile(profile)
    return profile
  },

  // Conversation Management
  getConversations: () => {
    try {
      const data = localStorage?.getItem(STORAGE_KEYS.CONVERSATIONS)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveConversation: (conversationId, messages) => {
    try {
      const conversations = storage.getConversations()
      const existing = conversations.findIndex(c => c.id === conversationId)

      const conversation = {
        id: conversationId || Date.now().toString(),
        messages: messages || [],
        createdAt: existing >= 0 ? conversations[existing].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: messages?.[messages.length - 1]?.text?.slice(0, 50) || 'New Conversation',
      }

      if (existing >= 0) {
        conversations[existing] = conversation
      } else {
        conversations.push(conversation)
      }

      localStorage?.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
      localStorage?.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, conversationId || conversation.id)
      return conversation
    } catch {
      return null
    }
  },

  getConversation: (conversationId) => {
    try {
      const conversations = storage.getConversations()
      return conversations.find(c => c.id === conversationId) || null
    } catch {
      return null
    }
  },

  getCurrentConversationId: () => {
    try {
      return localStorage?.getItem(STORAGE_KEYS.CURRENT_CONVERSATION) || null
    } catch {
      return null
    }
  },

  deleteConversation: (conversationId) => {
    try {
      const conversations = storage.getConversations()
      const filtered = conversations.filter(c => c.id !== conversationId)
      localStorage?.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(filtered))
      return true
    } catch {
      return false
    }
  },

  // Mood History
  getMoodHistory: () => {
    try {
      const data = localStorage?.getItem(STORAGE_KEYS.MOOD_HISTORY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveMood: (mood) => {
    try {
      const history = storage.getMoodHistory()
      history.push({
        ...mood,
        timestamp: new Date().toISOString(),
      })
      localStorage?.setItem(STORAGE_KEYS.MOOD_HISTORY, JSON.stringify(history))
      return true
    } catch {
      return false
    }
  },

  // Journal Entries
  getJournalEntries: () => {
    try {
      const data = localStorage?.getItem(STORAGE_KEYS.JOURNAL_ENTRIES)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveJournalEntry: (text) => {
    try {
      const entries = storage.getJournalEntries()
      entries.push({
        id: Date.now().toString(),
        text: text.trim(),
        date: new Date().toISOString(),
      })
      localStorage?.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries))
      return true
    } catch {
      return false
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage?.removeItem(key))
      return true
    } catch {
      return false
    }
  },
}
