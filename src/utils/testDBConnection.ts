import supabase from "../config/supabase";

export const testDBConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("application_statuses")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error connecting to Supabase:", error);
      return false;
    }

    console.log("Successfully connected to Supabase");
    console.log("Sample data:", data);
    return true;
  } catch (err) {
    console.error("Exception while connecting to Supabase:", err);
    return false;
  }
};

// Uncomment to test connection
// testDbConnection();
