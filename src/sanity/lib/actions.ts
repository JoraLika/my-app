"use server";

import { writeClient } from "./write-client";

export async function incrementViews(id: string, totalViews: number) {
  setTimeout(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  }, 0); // Runs after response is sent

  return totalViews + 1; // Return the new view count
}
