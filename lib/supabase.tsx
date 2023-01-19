import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

let supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let serviceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseURL, serviceKey);

export default supabase;