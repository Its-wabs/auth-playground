import LogoutButton from "@/app/components/logout";

export default async function PrivatePage(
    {params}: {params: Promise<{ userId: string }>
}) {
    // Await the params
    const { userId } = await params;

    return ( 
        <div>
            <h1>Private Page</h1>
            <p>Welcome, User ID: {userId}</p>
            <LogoutButton />
        </div>
    );
}