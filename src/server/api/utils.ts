import { supabase } from "~/utils/supabase-client";

export const uploadAvatar = async (userId: string, content: File) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${userId}`, content, { upsert: true });

  if (error) return { error };

  const { data: signedURLData, error: signedURLError } = await supabase.storage
    .from("avatars")
    .createSignedUrl(data.path, 999_999_999);

  if (signedURLError) return { error: signedURLError };

  return { url: signedURLData.signedUrl };
};

export const uploadMealImage = async (userId: string, content: File) => {
  console.log("before upload", content)
  const { data, error } = await supabase.storage
    .from("meal_images")
    .upload(`${userId}`, content, { upsert: true });
    console.log(" after upload", content)

  if (error) return { error };

  const { data: signedURLData, error: signedURLError } = await supabase.storage
    .from("meal_images")
    .createSignedUrl(data.path, 999_999_999);

  if (signedURLError) return { error: signedURLError };

  return { url: signedURLData.signedUrl };
};
