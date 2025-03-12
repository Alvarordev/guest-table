import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xsevosiavgyjwzmeqoqm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZXZvc2lhdmd5and6bWVxb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzU1MjUsImV4cCI6MjA1NzIxMTUyNX0.9FWEAnf6V7-oK2xpdf8oteGbfVsASTZ4W1Vi9gMtPxc";

export const supabase = createClient(supabaseUrl, supabaseKey);