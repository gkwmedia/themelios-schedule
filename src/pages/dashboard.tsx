import { sidebar } from "../components/layout/sidebar";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

const Dashboard = () => {
	const user = useUser();
	const router = useRouter();

	console.log(user);

	return <div></div>;
};

Dashboard.getLayout = sidebar;

export default Dashboard;
