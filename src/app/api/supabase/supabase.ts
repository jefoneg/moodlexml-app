import { CommonConstant } from "@/constants/common.constant";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!supabaseUrl || !key) {
  throw new Error(CommonConstant.ERROR.DOTENV_ERROR);
}

export const supabase = createClient(supabaseUrl, key);