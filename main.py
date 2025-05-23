import os
from dotenv import load_dotenv

import signal

from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation, ClientTools
from elevenlabs.conversational_ai.default_audio_interface \
    import DefaultAudioInterface


def log_message(parameters):
    message = parameters.get("message")
    print(message)


def main():
    load_dotenv()

    AGENT_ID = os.getenv("AGENT_ID")
    API_KEY = os.getenv("XI_API_KEY")

    elevenlabs = ElevenLabs(api_key=API_KEY)

    client_tools = ClientTools()
    client_tools.register("logMessage", log_message)

    conversation = Conversation(
        elevenlabs,
        AGENT_ID,
        client_tools=client_tools,
        requires_auth=False,
        audio_interface=DefaultAudioInterface(),
        callback_agent_response=lambda response: print(f"Agent: {response}"),
        callback_agent_response_correction=lambda original, corrected: print(
            f"Agent: {original} -> {corrected}"),
        callback_user_transcript=lambda transcript: print(
            f"User: {transcript}"),
        callback_latency_measurement=lambda latency: print(
            f"Latency: {latency}ms"),
    )

    conversation.start_session()
    signal.signal(signal.SIGINT, lambda sig, frame: conversation.end_session())
    conversation_id = conversation.wait_for_session_end()
    print(f"Conversation ID: {conversation_id}")


if __name__ == "__main__":
    main()
