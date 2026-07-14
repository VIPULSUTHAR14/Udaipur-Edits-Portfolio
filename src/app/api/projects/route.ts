import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const database = process.env.MONGO_DATABASE;
const collectionName = "MainProject";

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db(database);
    const dataCollection = db.collection(collectionName);

    // Fetch projects sorted by date descending (newest first)
    const data = await dataCollection.find({}).sort({ date: -1 }).toArray();

    if (!data) {
      return NextResponse.json(
        { projects: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { projects: data },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error("Error fetching projects from MainProject:", err);
    return NextResponse.json(
      { message: "An Internal Server Error Occurred." },
      { status: 500 }
    );
  }
}
