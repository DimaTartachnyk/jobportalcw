"use server"
import connectToDB from "@/database";
import Profile from "@/models/profile";
import {revalidatePath} from "next/cache";
import Job from "@/models/job";

//create profile action


export async function createProfileAction(formData, pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}


export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId : id});

    return JSON.parse(JSON.stringify(result));
}


// create job action
export async function postNewJobAction(formData, pathToRevalidate){
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

// fetch job action
//recruiter
export async function fetchJobsForRecruiterAction(id){
    await connectToDB();
    const result = await Job.find({recruiterId : id});

    return JSON.parse(JSON.stringify(result));
}
//candidate