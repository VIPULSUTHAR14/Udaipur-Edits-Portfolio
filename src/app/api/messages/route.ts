import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import type { Db, Collection, MongoClient } from "mongodb";

const database = process.env.MONGO_DATABASE;
const collectionName = "Message";

interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as MessageInput;
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const client: MongoClient = await clientPromise;
    const db: Db = client.db(database);
    const collection: Collection = db.collection(collectionName);

    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message saved successfully",
        data: {
          id: result.insertedId,
          name,
          email,
          message,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error saving message:", err);
    return NextResponse.json(
      { error: "An Internal Server Error Occurred." },
      { status: 500 }
    );
  }
}
