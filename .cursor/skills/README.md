# Project skills

These are copies of upstream agent skills, committed so every Cursor agent working in this repository can load them, including Cloud Agents. They do not auto-update when upstream changes. Refresh them by copying a newer upstream commit and recording that SHA here.

Cursor loads project skills from `.cursor/skills/<name>/SKILL.md`. That behavior is documented in [Agent Skills](https://cursor.com/docs/context/skills):

- Cursor discovers skill directories at startup and makes them available to Agent. `.cursor/skills/` is a project-level location, so it travels with the repo to Cloud Agents, Agents Window remote SSH sessions, and self-hosted workers. Personal skills in `~/.cursor/skills/` do not, unless that user turns on Sync Skills for Cloud Agents, and automation runs do not load synced personal skills.
- Each skill is the folder that contains `SKILL.md`. The frontmatter `name` must match that folder name.
- `disable-model-invocation: true` keeps a skill out of automatic context. It is included only when someone invokes `/skill-name`. `poteto-mode` sets this, so it runs only as `/poteto-mode`.

## ub-mode

- Source: https://github.com/unclebob/ub-mode
- File: `SKILL.md` on branch `master`
- Commit: `57a8bdd28e45ed41900ace0bafa2ff76dd9ed70f` (2026-10-25)
- License: the upstream repository publishes no license file
- Local copy: `.cursor/skills/ub-mode/SKILL.md`, byte-for-byte

Upstream does not set `disable-model-invocation`. Invoke it with `/ub-mode`. Cursor may also apply it when the request matches its description.

Uncle Bob's companion tools are separate repositories and are not installed:

- https://github.com/unclebob/crapper
- https://github.com/unclebob/dryer
- https://github.com/unclebob/mutator
- https://github.com/unclebob/uml-viewer (listed in the upstream README, also not installed)

## pstack

`poteto-mode` and the other skills below come from the official Cursor plugin `pstack` by Lauren Tan.

- Source: https://github.com/cursor/plugins/tree/main/pstack
- Tree at this copy: https://github.com/cursor/plugins/tree/99b609a72323b70204eab407c622f436e858e112/pstack
- Branch: `main`
- Commit: `99b609a72323b70204eab407c622f436e858e112` (2026-10-24)
- Plugin version at that commit: 0.15.32
- License: MIT, Copyright (c) 2026 Lauren Tan. The full notice is [`LICENSE`](LICENSE) in this directory. It applies to the pstack copies only, not to `ub-mode`.

`poteto-mode` is copied with its playbooks, references, and scripts. The other folders are the pstack skills its `SKILL.md` tells the agent to read or run:

- Skills named in `SKILL.md`: `how`, `why`, `architect`, `swarm`, `arena`, `interrogate`, `reflect`, `unslop`, `technical-writing`, `no-comments`, `benchmark-checklist`, `show-me-your-work`, `figure-it-out`.
- Every `principle-*` leaf named by the Principles section of `SKILL.md`. That section says to read the leaf skill before applying the principle. Bundled skills are addressed as `../<name>/SKILL.md` from `poteto-mode/SKILL.md`, which resolves when these folders sit next to each other.
- `tdd` and `ketchup`, because playbooks that `SKILL.md` says to open name those skills (`playbooks/bug-fix.md`, `playbooks/autopilot-full.md`, `playbooks/autopilot-stack.md`).
- `bro`, because `ketchup` links to `../bro/SKILL.md` for its voice.

Each of these folders is a byte-for-byte copy of the upstream skill folder, including helper files. `disable-model-invocation: true` is unchanged on every pstack skill copied here, including `poteto-mode`.

### Not included

These are needed, or named, by the copied skills, and were left out on purpose:

- The `poteto-agent` subagent (`pstack/agents/poteto-agent.md`). `poteto-mode` tells playbook delegates to spawn `subagent_type: "poteto-agent"`. That file is a plugin agent, not a skill. It is not in this directory. Without the pstack plugin installed in the client, that subagent type is unavailable. The skill text was not rewritten.
- `/setup-pstack` (`pstack/skills/setup-pstack/`) and the always-applied model rule it writes (`~/.cursor/rules/pstack-models.mdc`). `poteto-mode` still states its default models. No model rule is committed in this repo.
- `typescript-best-practices`, mentioned only as a see-also from `principle-type-system-discipline`.
- The rest of pstack, including `poteto-help`, `statechart`, `recall`, `sharpen`, `teach`, `blast-radius`, `automate-me`, `correct`, `in-your-own-words`, `make-bot-ui`, `ketchup-video`, the verification-skill authoring skills, Benny automations, and the guide.
- Skills `poteto-mode` names that live outside pstack: `deslop`, `control-cli`, and `control-ui` from the `cursor-team-kit` plugin, and Cursor built-ins such as `create-skill` and `/loop`.

Some playbook lines still say `pstack/skills/...`, which is the path inside the plugins repository. Those lines were left as upstream wrote them.
