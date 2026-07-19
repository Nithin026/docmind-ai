from collections import deque


class MemoryService:

    def __init__(self):

        # Stores the last 10 messages
        self.chat_history = deque(maxlen=10)

    def add_user_message(
        self,
        message: str,
    ):

        self.chat_history.append(
            {
                "role": "user",
                "content": message,
            }
        )

    def add_assistant_message(
        self,
        message: str,
    ):

        self.chat_history.append(
            {
                "role": "assistant",
                "content": message,
            }
        )

    def get_history(self):

        return list(self.chat_history)

    def clear(self):

        self.chat_history.clear()


memory_service = MemoryService()