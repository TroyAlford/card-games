import { match } from 'basis/libraries/utilities/functions/match'
import type { BuildArtifact } from 'bun'
import { join } from 'node:path'
import { URL } from 'node:url'
import { Builder } from '../Builder'

interface BuildOutput {
  name: string,
  output: BuildArtifact,
}

interface BuildAsset {
  content: string,
  lastModified: number,
  type: string,
}

export class AssetsController {
  static #singleton: AssetsController
  static singleton(): AssetsController {
    if (!this.#singleton) this.#singleton = new AssetsController()
    return this.#singleton
  }

  private builder: Builder = new Builder({
    onRebuild: outputs => this.onRebuild(outputs),
  })
  private builds = new Map<string, BuildAsset>()

  async initialize(): Promise<void> {
    this.builder.add('client.js', join(__dirname, '../../../client/source/index.tsx'))
    await this.builder.build()
  }

  private assets(): Response {
    return new Response(
      JSON.stringify(
        Array.from(this.builds.entries()).map(([name, asset]) => ({
          lastModified: asset.lastModified,
          name,
          size: new TextEncoder().encode(asset.content).length,
          type: asset.type,
        })),
        null,
        2,
      ),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  private asset(url: URL): Response {
    const path = url.pathname.replace(/^\/assets\//, '')
    const version = url.searchParams.get('v')
    const asset = this.builds.get(path)

    if (!asset) return new Response('Not Found', { status: 404 })

    // If version matches, serve the asset
    if (version === asset.lastModified.toString()) {
      return new Response(asset.content, {
        headers: {
          'Content-Type': asset.type,
          'ETag': version,
        },
      })
    }

    // Otherwise redirect to versioned URL
    url.searchParams.set('v', asset.lastModified.toString())
    return new Response(null, {
      headers: { Location: url.toString() },
      status: 307,
    })
  }

  async request(request: Request): Promise<Response> {
    const url = new URL(request.url)

    return match(url.pathname)
      .when('/assets').then(() => this.assets())
      .when(/^[/]assets[/].+/).then(() => this.asset(url))
      .else(new Response('Not Found', { status: 404 }))
  }

  private async onRebuild(outputs: BuildOutput[]): Promise<void> {
    for (const { name, output } of outputs) {
      this.builds.set(name, {
        content: await output.text(),
        lastModified: Date.now(),
        type: this.getContentType(name),
      })
    }
  }

  private getContentType(filename: string): string {
    if (filename.endsWith('.js')) return 'application/javascript'
    if (filename.endsWith('.css')) return 'text/css'
    if (filename.endsWith('.html')) return 'text/html'
    return 'application/octet-stream'
  }

  public dispose(): void {
    this.builder.stop()
    this.builder.dispose()
  }
}
