const avatarApiDocsUrl = "https://avatar.aspekt.systems/docs.json?aspekt=docs";
const maxAvatarApiDocsBytes = 20_000;

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(avatarApiDocsUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!response.ok) {
      return Response.json(
        { error: "Unable to load Avatar API docs." },
        { status: 502 },
      );
    }

    const text = await response.text();

    if (text.length > maxAvatarApiDocsBytes) {
      return Response.json(
        { error: "Avatar API docs response is too large." },
        { status: 502 },
      );
    }

    const docs: unknown = JSON.parse(text);

    if (typeof docs !== "object" || docs === null || Array.isArray(docs)) {
      return Response.json(
        { error: "Avatar API docs response is invalid." },
        { status: 502 },
      );
    }

    return Response.json(docs, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch {
    return Response.json(
      { error: "Unable to load Avatar API docs." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
