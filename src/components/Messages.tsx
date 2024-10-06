import Message from "./Message";

export type EncryptedMessage = {
    id: number;
    title: string;
    message: string;
    created_at: string;
}

export default function Messages({ messages, trash, update }: { messages: EncryptedMessage[], trash: (id: number) => void, update: (msg: EncryptedMessage) => void }) {
    return (
        <div class="messages">{messages.map(message => <Message message={message} trash={() => trash(message.id)} update={update} />)}</div>
    )
}
