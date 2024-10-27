"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidate = (path: string) => {
    revalidatePath(path);
}

export const redirectTo = (path: string) => {
    redirect(path);
}