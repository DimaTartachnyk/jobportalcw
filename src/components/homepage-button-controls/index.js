'use client';

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";

function HomepageButtonControls({user, profileInfo}) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <div className="flex space-x-4">


            <Button
                className="flex h-11 dark:bg-zinc-400 dark:hover:bg-zinc-300 items-center justify-center px-5"
                onClick={() => router.push("/jobs")}
            >
                {user ? profileInfo?.role === "candidate" ? "Browse Jobs" : "Jobs Dashboard" : "Find Jobs"}
            </Button>
            <Button
                className="flex h-11 dark:bg-zinc-400 dark:hover:bg-zinc-300 items-center justify-center px-5"
                onClick={() => router.push(user ? profileInfo?.role === "candidate"
                    ? "/activity" : "/jobs" : "/jobs")}
            >
                {user ? profileInfo?.role === "candidate" ? "Your Activity" : "Post New Job" : "Post New Job"}
            </Button>
        </div>
    );
}

export default HomepageButtonControls;