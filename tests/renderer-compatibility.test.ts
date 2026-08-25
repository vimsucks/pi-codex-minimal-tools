import assert from "node:assert/strict";
import test from "node:test";
import { createApplyPatchToolDefinition } from "../src/tools/apply-patch.js";

test("apply_patch definition is compatible with pi-tool-renderer assumptions", () => {
	const tool = createApplyPatchToolDefinition({ deferRendering: true }) as Record<string, any>;
	assert.equal(tool.name, "apply_patch");
	assert.ok(tool.parameters.properties.input);
	assert.deepEqual(tool.parameters.required, ["input"]);
	assert.equal(tool.renderShell, "self");
	assert.equal("renderCall" in tool, false);
	assert.equal("renderResult" in tool, false);
});

test("fallback output remains readable without a custom renderer", async () => {
	const tool = createApplyPatchToolDefinition({ cwd: process.cwd(), deferRendering: true }) as Record<string, any>;
	assert.equal(typeof tool.execute, "function");
	assert.match(tool.description, /Codex-style patch/);
	assert.match(tool.promptSnippet, /input/);
});

test("apply_patch can use bundled diff renderers without loading the full renderer extension", () => {
  const tool = createApplyPatchToolDefinition({ deferRendering: false }) as Record<string, any>;
  assert.equal(typeof tool.renderCall, "function");
  assert.equal(typeof tool.renderResult, "function");
});

test("bundled renderer shows apply_patch additions and removals", () => {
	const tool = createApplyPatchToolDefinition({ deferRendering: false }) as Record<string, any>;
	const input = [
		"*** Begin Patch",
		"*** Update File: example.txt",
		"@@",
		"-BEFORE",
		"+AFTER",
		"*** End Patch",
	].join("\n");
	const theme = {
		bg: (_token: string, text: string) => text,
		bold: (text: string) => text,
		fg: (_token: string, text: string) => text,
	};
	const component = tool.renderResult(
		{ content: [{ type: "text", text: "Applied patch: update example.txt" }] },
		{ expanded: true, isPartial: false },
		theme,
		{ args: { input }, cwd: process.cwd(), isError: false, state: {} },
	);
	const rendered = component.render(120).join("\n");
	assert.match(rendered, /BEFORE/);
	assert.match(rendered, /AFTER/);
	assert.match(rendered, /\+1/);
	assert.match(rendered, /-1/);
});
