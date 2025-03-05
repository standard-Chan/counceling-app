
const combineConversationByRoles = (userConversation, assistantConversation) => {
  let combinedConversation = [];
  let maxLength = Math.max(userConversation.length, assistantConversation.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < userConversation.length) {
      combinedConversation.push({ content: userConversation[i], role: "user" });
    }
    if (i < assistantConversation.length) {
      combinedConversation.push({ content: assistantConversation[i], role: "assistant" });
    }
  }

  return combinedConversation;
}

export default combineConversationByRoles;