import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

let supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let serviceKey = process.env.SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseURL, serviceKey);

export default supabase;

// console.log(process.env.SUPABASE_SERVICE_KEY);
