import db from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Store name needs to be entered.", {
        status: 400,
      });
    }

    const store = await db.store.create({
      data: { name, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
