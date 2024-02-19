import { signal } from "@preact/signals";
import { render } from "preact";

const isServer = typeof window === "undefined";

const msgs = signal<
	{ content: string; uuid: string; status: "success" | "error" }[]
>([]);

class Message {
	constructor() {
		if (isServer) return;
		const container = document.createElement("div");
		container.className = "message-container";

		document.body.appendChild(container);

		render(<MessageComponent />, container);
	}
	success(content: string) {
		if (isServer) return;
		this.insert(content, "success");
	}
	error(content: string) {
		if (isServer) return;
		this.insert(content, "error");
	}

	private insert(content: string, status: "success" | "error") {
		const uuid = getUuid();
		msgs.value = [...msgs.value, { content, status, uuid }];

		setTimeout(() => {
			msgs.value = msgs.value.filter((msg) => msg.uuid !== uuid);
		}, 3000);
	}
}

const message = new Message();

const dotReg = /,/g;
function getUuid() {
	return crypto
		.getRandomValues(new Uint8Array(8))
		.toString()
		.replace(dotReg, "");
}

function MessageComponent() {
	return (
		<>
			{msgs.value.map((msg) => (
				<div
					key={msg.uuid}
					class="px-4 py-1 bg-slate-100 dark:bg-stone-700 rounded flex items-center gap-2"
				>
					{msg.status === "success" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 36 36"
						>
							<path
								fill="#40be1e"
								d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z"
								class="clr-i-solid clr-i-solid-path-1"
							></path>
							<path fill="none" d="M0 0h36v36H0z"></path>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="#f04747"
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"
							></path>
						</svg>
					)}
					<span>{msg.content}</span>
				</div>
			))}
		</>
	);
}

export default message;
