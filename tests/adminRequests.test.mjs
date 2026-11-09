import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { API_BASE_URL } from "../lib/consts.ts";
import { fetchAccountPulseEmails } from "../lib/recoup/fetchAccountPulseEmails.ts";
import { fetchAccountTaskRuns } from "../lib/recoup/fetchAccountTaskRuns.ts";
import { fetchAdminSandboxOrgs } from "../lib/recoup/fetchAdminSandboxOrgs.ts";
import { fetchAdminSandboxes } from "../lib/recoup/fetchAdminSandboxes.ts";
import { fetchCodingPrStatus } from "../lib/recoup/fetchCodingPrStatus.ts";
import { fetchContentSlackTags } from "../lib/recoup/fetchContentSlackTags.ts";
import { fetchCreditsEvents } from "../lib/recoup/fetchCreditsEvents.ts";
import { fetchCreditsRollup } from "../lib/recoup/fetchCreditsRollup.ts";
import { fetchPrivyLogins } from "../lib/recoup/fetchPrivyLogins.ts";
import { fetchPulseEmailById } from "../lib/recoup/fetchPulseEmailById.ts";
import { fetchSlackTags } from "../lib/recoup/fetchSlackTags.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const token = "test-admin-token";
const record = { id: "record-1" };
const response = { status: "success", total_count: 1, rows: [record] };
const prs = [
  "https://github.com/recoupable/api/pull/1",
  "https://github.com/recoupable/chat/pull/2",
];
const cases = [
  [
    "account emails",
    () => fetchAccountPulseEmails(token, "account 1"),
    "/api/admins/emails",
    [["account_id", "account 1"]],
    { emails: [record] },
    [record],
  ],
  [
    "task runs",
    () => fetchAccountTaskRuns(token, "account 1", 7),
    "/api/tasks/runs",
    [
      ["account_id", "account 1"],
      ["limit", "7"],
    ],
    { runs: [record] },
    [record],
  ],
  [
    "sandbox organizations",
    () => fetchAdminSandboxOrgs(token),
    "/api/admins/sandboxes/orgs",
    [],
    { repos: [record] },
    [record],
  ],
  [
    "sandboxes",
    () => fetchAdminSandboxes(token),
    "/api/admins/sandboxes",
    [],
    { accounts: [record] },
    [record],
  ],
  [
    "PR status",
    () => fetchCodingPrStatus(token, prs),
    "/api/admins/coding/pr",
    prs.map((pr) => ["pull_requests", pr]),
    response,
    response,
  ],
  [
    "content tags",
    () => fetchContentSlackTags(token, "weekly"),
    "/api/admins/content/slack",
    [["period", "weekly"]],
    response,
    response,
  ],
  [
    "credits events",
    () =>
      fetchCreditsEvents({
        accessToken: token,
        accountId: "account 1",
        period: "daily",
        page: 2,
        limit: 20,
      }),
    "/api/admins/credits/events",
    [
      ["account_id", "account 1"],
      ["period", "daily"],
      ["page", "2"],
      ["limit", "20"],
    ],
    response,
    response,
  ],
  [
    "credits rollup",
    () => fetchCreditsRollup({ accessToken: token, period: "monthly" }),
    "/api/admins/credits/rollup",
    [
      ["period", "monthly"],
      ["page", "1"],
      ["limit", "500"],
    ],
    response,
    response,
  ],
  [
    "Privy logins",
    () => fetchPrivyLogins(token, "all"),
    "/api/admins/privy",
    [["period", "all"]],
    response,
    response,
  ],
  [
    "one email",
    () => fetchPulseEmailById(token, "email 1"),
    "/api/admins/emails",
    [["email_id", "email 1"]],
    { emails: [record, { id: "second" }] },
    record,
  ],
  [
    "coding tags",
    () => fetchSlackTags(token, "daily"),
    "/api/admins/coding/slack",
    [["period", "daily"]],
    response,
    response,
  ],
];

for (const [name, request, pathname, query, body, expected] of cases) {
  test(`${name}: preserves the authenticated request and response shape`, async () => {
    const calls = [];
    globalThis.fetch = async (...args) => {
      calls.push(args);
      return Response.json(body);
    };
    assert.deepEqual(await request(), expected);
    assert.equal(calls.length, 1);
    const [url, options] = calls[0];
    const parsed = new URL(url);
    assert.equal(parsed.origin, API_BASE_URL);
    assert.equal(parsed.pathname, pathname);
    assert.deepEqual([...parsed.searchParams], query);
    assert.deepEqual(options, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
  test(`${name}: preserves error selection and malformed-response fallback`, async () => {
    const messageOnly =
      name === "sandboxes" || name === "sandbox organizations";
    globalThis.fetch = async () =>
      Response.json({ error: "detail", message: "summary" }, { status: 403 });
    await assert.rejects(request(), {
      message: messageOnly ? "summary" : "detail",
    });
    globalThis.fetch = async () =>
      Response.json({ message: "summary" }, { status: 403 });
    await assert.rejects(request(), { message: "summary" });
    globalThis.fetch = async () =>
      Response.json({ error: "detail" }, { status: 403 });
    await assert.rejects(request(), {
      message: messageOnly ? "HTTP 403" : "detail",
    });
    globalThis.fetch = async () => new Response("not JSON", { status: 502 });
    await assert.rejects(request(), { message: "HTTP 502" });
    globalThis.fetch = async () => {
      throw new TypeError("offline");
    };
    await assert.rejects(request(), { message: "offline" });
  });
}

test("empty PR list does not send a request", async () => {
  globalThis.fetch = () => {
    throw new Error("unexpected network request");
  };
  assert.deepEqual(await fetchCodingPrStatus(token, []), {
    status: "success",
    pull_requests: [],
  });
});

test("optional collections keep empty defaults and single email keeps null", async () => {
  globalThis.fetch = async () => Response.json({});
  for (const read of [
    () => fetchAccountPulseEmails(token, "a"),
    () => fetchAccountTaskRuns(token, "a"),
    () => fetchAdminSandboxOrgs(token),
    () => fetchAdminSandboxes(token),
  ]) {
    assert.deepEqual(await read(), []);
  }
  assert.equal(await fetchPulseEmailById(token, "missing"), null);
});

test("successful malformed JSON remains a rejected read", async () => {
  globalThis.fetch = async () => new Response("not JSON");
  await assert.rejects(
    fetchCreditsRollup({ accessToken: token, period: "daily" }),
    SyntaxError,
  );
});

test("malformed-shaped error JSON keeps the HTTP status for every adapter", async () => {
  for (const [, request] of cases) {
    for (const body of [null, 0, false, "upstream error", ["upstream error"]]) {
      globalThis.fetch = async () => Response.json(body, { status: 503 });
      await assert.rejects(request(), { message: "HTTP 503" });
    }
  }
});

test("error fields retain nullish priority and JavaScript string conversion", async () => {
  const values = [
    [0, "0"],
    [false, "false"],
    ["", ""],
    [42, "42"],
    [{ code: "upstream" }, "[object Object]"],
    [["first", "second"], "first,second"],
  ];
  for (const [name, request] of cases) {
    const messageOnly =
      name === "sandboxes" || name === "sandbox organizations";
    for (const [value, expected] of values) {
      const body = messageOnly
        ? { error: "ignored", message: value }
        : { error: value, message: "lower-priority" };
      globalThis.fetch = async () => Response.json(body, { status: 403 });
      await assert.rejects(request(), { message: expected });
      globalThis.fetch = async () =>
        Response.json({ error: null, message: value }, { status: 403 });
      await assert.rejects(request(), { message: expected });
    }
    globalThis.fetch = async () =>
      Response.json({ error: null, message: null }, { status: 403 });
    await assert.rejects(request(), { message: "HTTP 403" });
  }
});
