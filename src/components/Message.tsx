import TextField from "@suid/material/TextField";
import { EncryptedMessage } from "./Messages";
import { FaRegularTrashCan } from 'solid-icons/fa'
import { createSignal } from "solid-js";

export default function Message({ message, trash, update }: { message: EncryptedMessage, trash: () => void, update: (msg: EncryptedMessage) => void }) {
    const [msg, setMessage] = createSignal<EncryptedMessage>(message);

    return (
        <div class="item">
            <div class="item-header">
                <TextField onBlur={() => update(msg())} label="Title" id="em_title" placeholder="Enter Title" type="text" value={msg().title} onChange={e => setMessage({ ...msg(), title: e.target.value })} />
                <div>
                    <FaRegularTrashCan size={25} onClick={trash} class="deleteIcon" />
                </div>
            </div>
            <div>
                <TextField onBlur={() => update(msg())} sx={{ width: 400 }} label="Message" id="em_message" placeholder="Enter Message" type="text" value={msg().message} onChange={e => setMessage({ ...msg(), message: e.target.value })} multiline={true}
                    rows={5}
                    maxRows={100} />
            </div>
        </div>
    )
}
