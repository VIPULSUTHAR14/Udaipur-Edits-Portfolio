import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const database = process.env.MONGO_DATABASE;
const collectionName = "PROJECTS";

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db(database);
    const dataCollection = db.collection(collectionName);
    
    // Convert cursor to array to get actual data
    const data = await dataCollection.find({}).toArray();
    
    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No projects found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { projects: data },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error("Error fetching project data:", err);
    return NextResponse.json(
      { message: "An Internal Server Error Occurred." },
      { status: 500 }
    );
  }
}