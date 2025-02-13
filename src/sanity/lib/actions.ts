"use server";

import { parseServerActionResponse } from "lib/utils";
import { auth } from "../../../auth";
import { writeClient } from "./write-client";
import slugify  from "slugify";

export async function incrementViews(id: string, totalViews: number) {
  setTimeout(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  }, 0); // Runs after response is sent

  return totalViews + 1; // Return the new view count
}


export const createPitch = async(state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if(!session) return parseServerActionResponse({error: "Not signed in", status: "ERROR"});

  const { title, description, category, link} = Object.fromEntries(
    Array.from(form).filter(([key]) => key != pitch)
  );

  const slug = slugify(title as string, { lower:true, strict: true });
  try{
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch
    }

    const result = await writeClient.create({_type: 'startup', ...startup});
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS"
    })
  } catch(error) {
      console.log(error);

      return parseServerActionResponse({
        error: JSON.stringify(error),
        status: "ERROR",
      })
  }
}

// export const deleteStartup = () => {
  
// }