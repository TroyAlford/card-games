interface ServerConfig {
	port: number;
	hostname: string;
}

export class Server {
	public readonly port: number;
	public readonly hostname: string;
	private server: any;

	constructor(config: ServerConfig) {
		this.port = config.port;
		this.hostname = config.hostname;
		this.initialize();
	}

	private initialize() {
		this.server = Bun.serve({
			port: this.port,
			hostname: this.hostname,
			fetch: this.handleRequest.bind(this)
		});
	}

	private async handleRequest(request: Request): Promise<Response> {
		return new Response("Game Server Running", { status: 200 });
	}
} 