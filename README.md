# @vimsucks/pi-codex-minimal-tools

Minimal Codex/OpenAI tools for [Pi](https://github.com/badlogic/pi-mono), with a bundled rich `apply_patch` diff renderer.

This package is a fork of [`@vanillagreen/pi-codex-minimal-tools`](https://www.npmjs.com/package/@vanillagreen/pi-codex-minimal-tools). It reuses the `apply_patch` renderer from [`@vanillagreen/pi-tool-renderer`](https://www.npmjs.com/package/@vanillagreen/pi-tool-renderer) without loading that package as a Pi extension.

The result is intentionally narrow:

- `apply_patch` gets a structured, colorized diff preview.
- `pi-hashline-edit-pro` can continue to own `read`, `replace`, and `undo_last_replace`.
- Pi's native `bash`, `edit`, and `write` tools remain available.
- The full `pi-tool-renderer` extension is not loaded, so it cannot conflict over `read` or other tool names.

## Features

- `image_generation` for supported OpenAI/Codex image-capable models.
- `view_image` for local image content, disabled by default.
- `apply_patch` with Codex patch syntax and bundled rich diff rendering.
- `/image-gen` background image generation through Codex OAuth.
- Model-aware activation for OpenAI/Codex-like providers, including compatible custom providers.
- Optional strict patch mode and absolute-path controls.

## Install

After the package is published to npm:

```bash
pi install npm:@vimsucks/pi-codex-minimal-tools
```

For local development:

```bash
pnpm install
pnpm check
pi install /absolute/path/to/pi-codex-minimal-tools
```

The repository pins the public npm registry in `.npmrc`:

```ini
registry=https://registry.npmjs.org/
```

Restart Pi or run `/reload` after installation.

## Configuration

Open `/extensions:settings` and select **Codex Minimal Tools**.

Important patch settings:

| Setting | Default | Behavior |
| --- | --- | --- |
| Enable apply_patch | On | Registers the structured `apply_patch` tool. |
| Strict patch mode | Off | Removes native `edit` and `write` from the active tool set. |
| Allow absolute patch paths | Off | Allows patch targets outside the current workspace. |
| Defer apply_patch rendering | Off | Omits the bundled renderer so another renderer can own display. |

The bundled renderer reads its visual settings from the `@vanillagreen/pi-tool-renderer` configuration namespace. The renderer dependency is imported as a library only; its Pi extension entry point is never registered by this package.

## Development

Requirements:

- Node.js 22.19 or newer
- pnpm 11
- Bun for the test runner

Commands:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm check
pnpm pack --dry-run
```

## Publishing

The package name is scoped to `@vimsucks` and the repository uses the public npm registry. Publishing remains an explicit maintainer action:

```bash
pnpm publish --access public --registry=https://registry.npmjs.org/
```

## License and attribution

MIT. The original implementation is Copyright (c) 2026 vanillagreen.

This fork adds the standalone renderer integration, package scope changes, and compatibility coverage while preserving the upstream license and attribution.
